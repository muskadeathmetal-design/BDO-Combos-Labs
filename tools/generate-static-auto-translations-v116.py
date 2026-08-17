import html
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

SOURCE = Path('en/index.html')
OUTPUT = Path('bcl-static-auto-translations-v116.json')
LOCALES = ['en', 'de', 'es', 'it', 'pt']

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
    value = re.sub(r'\s+', ' ', value).strip()
    return value


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

    # Human-visible HTML text nodes (script/style contents are removed first).
    html_only = re.sub(r'<script\b[\s\S]*?</script>', ' ', source, flags=re.I)
    html_only = re.sub(r'<style\b[\s\S]*?</style>', ' ', html_only, flags=re.I)
    for match in re.finditer(r'>([^<>]+)<', html_only):
        value = normalize(match.group(1))
        if looks_human(value, protected):
            candidates.add(value)

    # User-facing JS strings. Restrict to reasonably simple quoted/template literals.
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
        'Down Smash', 'Air Smash', 'Super Armor', 'Forward Guard', 'Knockdown', 'Knockback',
        'Stiffness', 'Invincible', 'Iframe', 'Freeze', 'Stun', 'Bound', 'Float', 'Grab',
        'Shift', 'Space', 'LMB', 'RMB', 'W+F', 'S+F', 'Shift+Q', 'Shift+F', 'W+RMB', 'S+RMB'
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


def translate_one(translator, source: str, retries=3):
    protected, values = protect_text(source)
    last = None
    for attempt in range(retries):
        try:
            result = translator.translate(protected)
            if not result:
                raise RuntimeError('empty translation')
            return restore_text(result, values)
        except Exception as exc:
            last = exc
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f'translation failed: {last}')


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

    for locale in LOCALES:
        translator = GoogleTranslator(source='fr', target=locale)
        pending = [s for s in candidates if not cache[locale].get(s)]
        print(f'{locale}: {len(pending)} pending')
        failures = 0
        for idx, source_text in enumerate(pending, 1):
            try:
                translated = translate_one(translator, source_text)
                if translated and translated != source_text:
                    cache[locale][source_text] = translated
            except Exception as exc:
                failures += 1
                print(f'WARN {locale} {idx}/{len(pending)}: {exc} :: {source_text[:100]}')
                if failures >= 25:
                    print(f'{locale}: stopping after 25 failures')
                    break
            if idx % 40 == 0:
                OUTPUT.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding='utf-8')
                print(f'{locale}: {idx}/{len(pending)}')
            time.sleep(0.08)

    OUTPUT.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding='utf-8')
    print('Saved', OUTPUT)
    for locale in LOCALES:
        print(locale, len(cache.get(locale, {})))


if __name__ == '__main__':
    main()
