import html
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from deep_translator import GoogleTranslator

SOURCE = Path('en/index.html')
OUTPUT = Path('bcl-static-auto-translations-v116.json')
LOCALES = ['en', 'de', 'es', 'it', 'pt']
BATCH_SIZE = 24

FRENCH_WORDS = re.compile(
    r"\b(?:le|la|les|un|une|des|du|de|dans|avec|sans|pour|sur|est|sont|tu|vous|peux|peut|aucun|aucune|"
    r"ajouter|ajoute|supprimer|enregistrer|choisir|sélectionner|sélectionne|analyse|analyser|vidéo|données|"
    r"compétence|compétences|mesure|mesures|détection|durée|début|fin|actuel|actuelle|chargé|chargée|guide|"
    r"renommer|vérifie|contrôle|lecture|recommandé|seconde|secondes|classe|combos?|transition|transitions|"
    r"annuler|fermer|ouvrir|valider|vider|retour|restaurer|sauvegarde|sauvegarder|fichier|document|référence|"
    r"référentiel|source|utilise|utiliser|permet|permettent|doit|doivent|avant|après|pendant|depuis|jusqu|"
    r"valide|validée|validées|détecté|détectée|détectées|ajouté|ajoutée|ajoutées|enregistré|enregistrée|"
    r"paramètres|profil|préparation|ressources|état|qualité|recherche|filtre|tri|toutes|actives|historique|"
    r"connexion|déconnexion|compte|utilisateur|communauté|partagé|partagée|vérifié|vérifiée|priorité|"
    r"actions|action|prochaines|workflow|donnée|brute|optimisé|optimisée|créer|premier|première|"
    r"aucuns?|aucunes?|activer|désactiver|modifier|enregistre|actualiser|effacer|afficher|affichage|"
    r"résolu|résolue|résolues|inconnu|inconnue|inconnues|possible|impossible|erreur|attention|avertissement)\b",
    re.I,
)
DIACRITIC = re.compile(r'[àâçéèêëîïôùûüÿœæ]', re.I)
CODE_HEAVY = re.compile(
    r'(?:\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b|document\.|window\.|localStorage|querySelector|'
    r'innerHTML|textContent|addEventListener|Math\.|JSON\.|Object\.|Array\.|\.map\(|\.filter\(|\.forEach\(|'
    r'=>|<\/?(?:div|span|button|input|select|option|script|style|table|thead|tbody|tr|td|th)\b|class=|style=)',
    re.I,
)
INPUT_EXACT = re.compile(r'^(?:(?:Shift|Ctrl|Alt)\s*\+\s*)?(?:[WASDQEFCZXT]|LMB|RMB|Space|Tab)(?:\s*\+\s*(?:[WASDQEFCZXT]|LMB|RMB|Space|Tab))*$', re.I)
CC_EXACT = re.compile(r'^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe)$', re.I)
PLACEHOLDER = re.compile(r'(\$\{[^{}]{1,200}\}|\{\{[^{}]{1,200}\}\}|%\w|\b\d+(?:\.\d+)?%|https?://\S+)')


def normalize(value: str) -> str:
    value = html.unescape(value or '')
    return re.sub(r'\s+', ' ', value).strip()


def protected_names(source: str):
    names = set()
    for pattern in [
        r'\bname\s*:\s*["\'`]([^"\'`\n]{2,120})["\'`]',
        r'\bskillName\s*:\s*["\'`]([^"\'`\n]{2,120})["\'`]',
        r'\bskill\s*:\s*["\'`]([^"\'`\n]{2,120})["\'`]',
    ]:
        for match in re.finditer(pattern, source):
            names.add(normalize(match.group(1)))
    return names


def looks_human(text: str, protected: set) -> bool:
    t = normalize(text)
    if len(t) < 3 or len(t) > 380:
        return False
    if t in protected or INPUT_EXACT.fullmatch(t) or CC_EXACT.fullmatch(t):
        return False
    if t.startswith(('http://', 'https://', 'data:', '#', '.', '--')):
        return False
    if CODE_HEAVY.search(t):
        return False
    if t.count('${') > 3 or t.count('{') > 5 or t.count('}') > 5:
        return False
    letters = len(re.findall(r'[A-Za-zÀ-ÖØ-öø-ÿ]', t))
    if letters < 2:
        return False
    noisy = len(re.findall(r'[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:!?()\-–—→/+%’\'"«»…]', t))
    if noisy / max(1, len(t)) > 0.08:
        return False
    return bool(FRENCH_WORDS.search(t) or DIACRITIC.search(t))


def extract_candidates(source: str):
    protected = protected_names(source)
    candidates = set()
    html_only = re.sub(r'<script\b[\s\S]*?</script>', ' ', source, flags=re.I)
    html_only = re.sub(r'<style\b[\s\S]*?</style>', ' ', html_only, flags=re.I)
    for match in re.finditer(r'>([^<>]+)<', html_only):
        value = normalize(match.group(1))
        if looks_human(value, protected):
            candidates.add(value)
    string_re = re.compile(r'''(?s)(["'`])((?:\\.|(?!\1).){3,380})\1''')
    for match in string_re.finditer(source):
        value = normalize(match.group(2))
        if looks_human(value, protected):
            candidates.add(value)
    return sorted(candidates, key=lambda s: (-len(s), s.lower()))


def protect_text(text: str):
    values = []
    def token(match):
        idx = len(values)
        values.append(match.group(0))
        return f'ZZZBCLTOKEN{idx}ZZZ'
    protected = PLACEHOLDER.sub(token, text)
    protected_terms = [
        'Down Smash','Air Smash','Super Armor','Forward Guard','Knockdown','Knockback',
        'Stiffness','Invincible','Iframe','Freeze','Stun','Bound','Float','Grab',
        'Shift','Space','LMB','RMB','W+F','S+F','Shift+Q','Shift+F','W+RMB','S+RMB'
    ]
    for term in protected_terms:
        if term in protected:
            idx = len(values)
            values.append(term)
            protected = protected.replace(term, f'ZZZBCLTOKEN{idx}ZZZ')
    return protected, values


def restore_text(text: str, values):
    out = text
    for idx, value in enumerate(values):
        out = out.replace(f'ZZZBCLTOKEN{idx}ZZZ', value)
        out = out.replace(f'ZZZ BCL TOKEN {idx} ZZZ', value)
    return out


def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i+size]


def translate_locale(locale, pending):
    translator = GoogleTranslator(source='fr', target=locale)
    result = {}
    failures = 0
    total_batches = (len(pending) + BATCH_SIZE - 1) // BATCH_SIZE
    for batch_no, batch in enumerate(chunks(pending, BATCH_SIZE), 1):
        protected_batch = []
        values_batch = []
        for source_text in batch:
            protected, values = protect_text(source_text)
            protected_batch.append(protected)
            values_batch.append(values)
        translated_batch = None
        for attempt in range(3):
            try:
                translated_batch = translator.translate_batch(protected_batch)
                if not translated_batch or len(translated_batch) != len(batch):
                    raise RuntimeError('invalid batch result')
                break
            except Exception as exc:
                if attempt == 2:
                    print(f'WARN {locale} batch {batch_no}: {exc}')
                else:
                    time.sleep(0.8 * (attempt + 1))
        if translated_batch:
            for source_text, translated, values in zip(batch, translated_batch, values_batch):
                translated = restore_text(translated or '', values)
                if translated and translated != source_text:
                    result[source_text] = translated
        else:
            failures += len(batch)
        print(f'{locale}: batch {batch_no}/{total_batches} · {len(result)} translated')
        if failures >= 48:
            print(f'{locale}: stopping after too many failures')
            break
    return locale, result


def main():
    if not SOURCE.exists():
        raise SystemExit('Missing en/index.html')
    source = SOURCE.read_text(encoding='utf-8')
    candidates = extract_candidates(source)
    print(f'Human residual candidates: {len(candidates)}')

    cache = {}
    if OUTPUT.exists():
        try:
            cache = json.loads(OUTPUT.read_text(encoding='utf-8'))
        except Exception:
            cache = {}
    for locale in LOCALES:
        cache.setdefault(locale, {})

    jobs = {}
    with ThreadPoolExecutor(max_workers=len(LOCALES)) as executor:
        for locale in LOCALES:
            pending = [s for s in candidates if not cache[locale].get(s)]
            print(f'{locale}: {len(pending)} pending')
            jobs[executor.submit(translate_locale, locale, pending)] = locale
        for future in as_completed(jobs):
            locale, additions = future.result()
            cache[locale].update(additions)
            OUTPUT.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding='utf-8')
            print(f'{locale}: saved {len(cache[locale])} total')

    OUTPUT.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding='utf-8')
    print('Saved', OUTPUT)
    for locale in LOCALES:
        print(locale, len(cache.get(locale, {})))


if __name__ == '__main__':
    main()
