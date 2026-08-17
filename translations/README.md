# BDO Combos Labs — patches de traduction

Les traductions sont appliquées uniquement au build. Aucun moteur de traduction ne s'exécute dans le navigateur.

Structure :
- `fr.json` : référence française / exceptions.
- `en.json`, `de.json`, `es.json`, `it.json`, `pt.json` : correspondances exactes `texte français -> texte traduit`.

Règles :
- ne jamais traduire les noms de skills ;
- ne jamais traduire les inputs/touches ;
- ne jamais traduire les CC ;
- les pages finales restent statiques dans `/fr/`, `/en/`, `/de/`, `/es/`, `/it/`, `/pt/`.

Le build fusionne ces patches avec le cache de traduction existant. Une correction future consiste simplement à ajouter/modifier une entrée JSON puis à reconstruire les pages.