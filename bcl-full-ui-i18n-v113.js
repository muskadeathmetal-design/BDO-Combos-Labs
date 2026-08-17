(function(){
  'use strict';
  const SUPPORTED=['fr','en','de','es','it','pt'];
  const sourceText=new WeakMap();
  const applying=new WeakSet();

  const exact={
    en:{
      'Profil de classe':'Class profile','Configuration de classe':'Class configuration',
      'Choisis la classe et la spécialisation qui pilotent les Skills, Combos, Transitions et imports.':'Choose the class and specialization used for Skills, Combos, Transitions and imports.',
      'Classe active':'Active class','Spécialisation':'Specialization','Compétences':'Skills','Transitions / Cancels':'Transitions / Cancels',
      'Import & détection':'Import & detection','Sources de données':'Data sources',
      'Le contenu importé est associé au contexte sélectionné ci-dessus.':'Imported content is linked to the context selected above.',
      'Import manuel Google Docs':'Manual Google Docs import',
      'Tu peux coller le lien d’un Google Doc/Sheet public ou charger un fichier exporté depuis Google Docs. Le document est d’abord analysé indépendamment de la Skill Library : les noms présents dans les chaînes explicites sont extraits, puis ajoutés aux Skills de la classe active s’ils n’existent pas encore. Les combos et transitions sont importés ensuite.':'Paste a public Google Doc/Sheet link or upload a file exported from Google Docs. The document is first analyzed independently from the Skill Library: names found in explicit chains are extracted and added to the active class Skills if they do not already exist. Combos and transitions are imported afterwards.',
      'Lien Google Docs / Sheets':'Google Docs / Sheets link','Charger ce Google Doc':'Load this Google Doc',
      'Fichier exporté Google Docs':'Google Docs exported file','Aucun fichier choisi':'No file selected',
      'Qualité de détection':'Detection quality','Confiance minimum':'Minimum confidence','Équilibrée':'Balanced',
      'Aucune donnée de combat n’est encore enregistrée pour':'No combat data has been recorded yet for',
      'L’application a été remise à zéro. Aucun dataset ni mécanisme de restauration automatique n’est présent.':'The application has been reset. No dataset or automatic restore mechanism is present.',
      'Contexte actif':'Active context','Classe':'Class','Actives':'Active','Avec input':'With input','Avec données combat':'With combat data',
      'Référentiel actif':'Active reference','Recherche':'Search','Filtre':'Filter','Tri':'Sort','Toutes':'All','Actives uniquement':'Active only',
      'Nom A → Z':'Name A → Z','Recherche auto des compétences':'Automatic skill search',
      'Ajouter une compétence manuellement':'Add a skill manually','Aucune compétence enregistrée pour':'No skill registered for',
      'Préparation du build':'Build preparation','Consommables':'Consumables','Cristaux':'Crystals','Set joueur PvE':'Player PvE set',
      'Set joueur PvP':'Player PvP set','Aucun cristal':'No crystal','Aucun preset actif.':'No active preset.',
      'Aucun consommable actif.':'No active consumable.','Rechercher un consommable...':'Search consumables...',
      'Toutes les données':'All data','Exporter toutes les données':'Export all data','Importer une sauvegarde':'Import a backup',
      'Remplacer les données locales BDO Combos Labs lors de la restauration':'Replace local BDO Combos Labs data during restore',
      'Optimisation':'Optimization','Ressources':'Resources','Structure du combo':'Combo structure','Réglage':'Setting','Valeur':'Value','Utilisation':'Usage',
      'Coût ressource max.':'Max resource cost','Coût stamina max.':'Max stamina cost','Préserver la ressource':'Preserve resource',
      'Phase':'Phase','État':'State','Maximum de compétences':'Maximum skills','Option':'Option','Activé':'Enabled','Désactivé':'Disabled',
      'Engage':'Engage','Setup':'Setup','Burst':'Burst','Finisher':'Finisher',
      'Historique Builder':'Builder history','Derniers builds construits':'Latest builds','Aucun build enregistré.':'No saved build.',
      'Liens utiles':'Useful links','Ressources de la classe':'Class resources','Ressources générales':'General resources',
      'Diagnostic':'Diagnostics','État du contexte actif':'Active context status','Qualité des données':'Data quality',
      'Espace utilisateur':'User area','Compte local & données personnelles':'Local account & personal data','Gérer mon compte':'Manage my account',
      'Orientation du combo':'Combo orientation','Mixte':'Mixed','Pré-Awakening':'Pre-Awakening',
      'Player-Priority Suggestions':'Player-Priority Suggestions','Ajouter la compétence suggérée':'Add suggested skill',
      'Premier skill':'First skill','Aucun CC comptabilisé':'No counted CC',
      'Paramètres':'Settings','Données & sauvegarde':'Data & backup','Mode de combat':'Combat mode',
      'Oui':'Yes','Non':'No','Aucun':'None','Aucune':'None','Ajouter':'Add','Supprimer':'Delete','Modifier':'Edit','Enregistrer':'Save',
      'Annuler':'Cancel','Actualiser':'Refresh','Fermer':'Close','Ouvrir':'Open','Valider':'Confirm','Vider':'Clear','Retour':'Back',
      'J’aime':'Like','Vérifié':'Verified','Partager':'Share','Masquer pour moi':'Hide for me'
    },
    de:{
      'Profil de classe':'Klassenprofil','Configuration de classe':'Klassenkonfiguration','Classe active':'Aktive Klasse','Spécialisation':'Spezialisierung',
      'Compétences':'Skills','Import & détection':'Import & Erkennung','Sources de données':'Datenquellen','Import manuel Google Docs':'Manueller Google-Docs-Import',
      'Lien Google Docs / Sheets':'Google Docs / Sheets-Link','Charger ce Google Doc':'Google Doc laden','Fichier exporté Google Docs':'Exportierte Google-Docs-Datei',
      'Aucun fichier choisi':'Keine Datei ausgewählt','Qualité de détection':'Erkennungsqualität','Confiance minimum':'Mindestvertrauen','Équilibrée':'Ausgewogen',
      'Contexte actif':'Aktiver Kontext','Classe':'Klasse','Référentiel actif':'Aktive Referenz','Recherche':'Suche','Filtre':'Filter','Tri':'Sortierung','Toutes':'Alle',
      'Actives uniquement':'Nur aktive','Nom A → Z':'Name A → Z','Ajouter une compétence manuellement':'Skill manuell hinzufügen',
      'Préparation du build':'Build-Vorbereitung','Consommables':'Verbrauchsgegenstände','Cristaux':'Kristalle','Aucun cristal':'Kein Kristall',
      'Exporter toutes les données':'Alle Daten exportieren','Importer une sauvegarde':'Backup importieren','Optimisation':'Optimierung','Ressources':'Ressourcen',
      'Structure du combo':'Combo-Struktur','Réglage':'Einstellung','Valeur':'Wert','Utilisation':'Verwendung','Phase':'Phase','État':'Status',
      'Maximum de compétences':'Maximale Skills','Option':'Option','Activé':'Aktiviert','Désactivé':'Deaktiviert','Historique Builder':'Builder-Verlauf',
      'Liens utiles':'Nützliche Links','Ressources de la classe':'Klassenressourcen','Ressources générales':'Allgemeine Ressourcen','Diagnostic':'Diagnose',
      'Espace utilisateur':'Benutzerbereich','Orientation du combo':'Combo-Ausrichtung','Mixte':'Gemischt','Ajouter':'Hinzufügen','Supprimer':'Löschen',
      'Modifier':'Bearbeiten','Enregistrer':'Speichern','Annuler':'Abbrechen','Actualiser':'Aktualisieren','Fermer':'Schließen','Ouvrir':'Öffnen',
      'Valider':'Bestätigen','Vider':'Leeren','Retour':'Zurück','Oui':'Ja','Non':'Nein','Aucun':'Keine','Aucune':'Keine'
    },
    es:{
      'Profil de classe':'Perfil de clase','Configuration de classe':'Configuración de clase','Classe active':'Clase activa','Spécialisation':'Especialización',
      'Compétences':'Habilidades','Import & détection':'Importación y detección','Sources de données':'Fuentes de datos','Import manuel Google Docs':'Importación manual de Google Docs',
      'Lien Google Docs / Sheets':'Enlace de Google Docs / Sheets','Charger ce Google Doc':'Cargar este Google Doc','Fichier exporté Google Docs':'Archivo exportado de Google Docs',
      'Aucun fichier choisi':'Ningún archivo seleccionado','Qualité de détection':'Calidad de detección','Confiance minimum':'Confianza mínima','Équilibrée':'Equilibrada',
      'Contexte actif':'Contexto activo','Classe':'Clase','Référentiel actif':'Referencia activa','Recherche':'Buscar','Filtre':'Filtro','Tri':'Orden','Toutes':'Todas',
      'Actives uniquement':'Solo activas','Nom A → Z':'Nombre A → Z','Ajouter une compétence manuellement':'Añadir habilidad manualmente',
      'Préparation du build':'Preparación de build','Consommables':'Consumibles','Cristaux':'Cristales','Aucun cristal':'Sin cristal',
      'Exporter toutes les données':'Exportar todos los datos','Importer une sauvegarde':'Importar copia de seguridad','Optimisation':'Optimización','Ressources':'Recursos',
      'Structure du combo':'Estructura del combo','Réglage':'Ajuste','Valeur':'Valor','Utilisation':'Uso','Phase':'Fase','État':'Estado',
      'Maximum de compétences':'Máximo de habilidades','Option':'Opción','Activé':'Activado','Désactivé':'Desactivado','Historique Builder':'Historial del Builder',
      'Liens utiles':'Enlaces útiles','Ressources de la classe':'Recursos de clase','Ressources générales':'Recursos generales','Diagnostic':'Diagnóstico',
      'Espace utilisateur':'Área de usuario','Orientation du combo':'Orientación del combo','Mixte':'Mixto','Ajouter':'Añadir','Supprimer':'Eliminar',
      'Modifier':'Editar','Enregistrer':'Guardar','Annuler':'Cancelar','Actualiser':'Actualizar','Fermer':'Cerrar','Ouvrir':'Abrir','Valider':'Confirmar',
      'Vider':'Vaciar','Retour':'Volver','Oui':'Sí','Non':'No','Aucun':'Ninguno','Aucune':'Ninguna'
    },
    it:{
      'Profil de classe':'Profilo classe','Configuration de classe':'Configurazione classe','Classe active':'Classe attiva','Spécialisation':'Specializzazione',
      'Compétences':'Abilità','Import & détection':'Importazione e rilevamento','Sources de données':'Fonti dati','Import manuel Google Docs':'Importazione manuale Google Docs',
      'Lien Google Docs / Sheets':'Link Google Docs / Sheets','Charger ce Google Doc':'Carica questo Google Doc','Fichier exporté Google Docs':'File esportato Google Docs',
      'Aucun fichier choisi':'Nessun file selezionato','Qualité de détection':'Qualità rilevamento','Confiance minimum':'Confidenza minima','Équilibrée':'Bilanciata',
      'Contexte actif':'Contesto attivo','Classe':'Classe','Référentiel actif':'Riferimento attivo','Recherche':'Ricerca','Filtre':'Filtro','Tri':'Ordina','Toutes':'Tutte',
      'Actives uniquement':'Solo attive','Nom A → Z':'Nome A → Z','Ajouter une compétence manuellement':'Aggiungi abilità manualmente',
      'Préparation du build':'Preparazione build','Consommables':'Consumabili','Cristaux':'Cristalli','Aucun cristal':'Nessun cristallo',
      'Exporter toutes les données':'Esporta tutti i dati','Importer une sauvegarde':'Importa backup','Optimisation':'Ottimizzazione','Ressources':'Risorse',
      'Structure du combo':'Struttura combo','Réglage':'Impostazione','Valeur':'Valore','Utilisation':'Utilizzo','Phase':'Fase','État':'Stato',
      'Maximum de compétences':'Massimo abilità','Option':'Opzione','Activé':'Attivato','Désactivé':'Disattivato','Historique Builder':'Cronologia Builder',
      'Liens utiles':'Link utili','Ressources de la classe':'Risorse classe','Ressources générales':'Risorse generali','Diagnostic':'Diagnostica',
      'Espace utilisateur':'Area utente','Orientation du combo':'Orientamento combo','Mixte':'Misto','Ajouter':'Aggiungi','Supprimer':'Elimina',
      'Modifier':'Modifica','Enregistrer':'Salva','Annuler':'Annulla','Actualiser':'Aggiorna','Fermer':'Chiudi','Ouvrir':'Apri','Valider':'Conferma',
      'Vider':'Svuota','Retour':'Indietro','Oui':'Sì','Non':'No','Aucun':'Nessuno','Aucune':'Nessuna'
    },
    pt:{
      'Profil de classe':'Perfil da classe','Configuration de classe':'Configuração da classe','Classe active':'Classe ativa','Spécialisation':'Especialização',
      'Compétences':'Habilidades','Import & détection':'Importação e deteção','Sources de données':'Fontes de dados','Import manuel Google Docs':'Importação manual Google Docs',
      'Lien Google Docs / Sheets':'Link Google Docs / Sheets','Charger ce Google Doc':'Carregar este Google Doc','Fichier exporté Google Docs':'Ficheiro exportado Google Docs',
      'Aucun fichier choisi':'Nenhum ficheiro selecionado','Qualité de détection':'Qualidade da deteção','Confiance minimum':'Confiança mínima','Équilibrée':'Equilibrada',
      'Contexte actif':'Contexto ativo','Classe':'Classe','Référentiel actif':'Referência ativa','Recherche':'Pesquisa','Filtre':'Filtro','Tri':'Ordenar','Toutes':'Todas',
      'Actives uniquement':'Apenas ativas','Nom A → Z':'Nome A → Z','Ajouter une compétence manuellement':'Adicionar habilidade manualmente',
      'Préparation du build':'Preparação da build','Consommables':'Consumíveis','Cristaux':'Cristais','Aucun cristal':'Sem cristal',
      'Exporter toutes les données':'Exportar todos os dados','Importer une sauvegarde':'Importar cópia de segurança','Optimisation':'Otimização','Ressources':'Recursos',
      'Structure du combo':'Estrutura do combo','Réglage':'Definição','Valeur':'Valor','Utilisation':'Utilização','Phase':'Fase','État':'Estado',
      'Maximum de compétences':'Máximo de habilidades','Option':'Opção','Activé':'Ativado','Désactivé':'Desativado','Historique Builder':'Histórico do Builder',
      'Liens utiles':'Links úteis','Ressources de la classe':'Recursos da classe','Ressources générales':'Recursos gerais','Diagnostic':'Diagnóstico',
      'Espace utilisateur':'Área do utilizador','Orientation du combo':'Orientação do combo','Mixte':'Misto','Ajouter':'Adicionar','Supprimer':'Eliminar',
      'Modifier':'Editar','Enregistrer':'Guardar','Annuler':'Cancelar','Actualiser':'Atualizar','Fermer':'Fechar','Ouvrir':'Abrir','Valider':'Confirmar',
      'Vider':'Limpar','Retour':'Voltar','Oui':'Sim','Non':'Não','Aucun':'Nenhum','Aucune':'Nenhuma'
    }
  };

  // V113_EXTRA_UI_TRANSLATIONS: broad UI coverage while preserving skill names, combat inputs and CC values.
  Object.assign(exact.en,{
    'Accueil':'Home','Class':'Class','Skills':'Skills','Class Combos':'Class Combos','Player Combos':'Player Combos','Video Analyzer':'Video Analyzer','Skill Add-ons':'Skill Add-ons','Combo Builder':'Combo Builder','Settings':'Settings',
    'Mesure, construis et optimise tes combos BDO':'Measure, build and optimize your BDO combos',
    'BDO Combos Labs relie désormais le référentiel de skills, les mesures vidéo, les transitions/cancels, le système CC PvP officiel et le Combo Builder. Les suggestions du Builder se recalculent selon l’orientation Awakening / Mixte / Pré-Awakening, la séquence actuelle et les timings réellement enregistrés.':'BDO Combos Labs now connects the skill reference, video measurements, transitions/cancels, the official PvP CC system and the Combo Builder. Builder suggestions are recalculated according to the Awakening / Mixed / Pre-Awakening orientation, the current sequence and the timings actually recorded.',
    'Ouvrir Skills':'Open Skills','Ouvrir Combo Builder':'Open Combo Builder','Référentiel : aucun pour ce contexte':'Reference: none for this context','Skills chargés':'Loaded skills','Référentiel':'Reference','Combos':'Combos','Transitions':'Transitions','Complétude':'Completeness',
    '0 activé':'0 active','aucune entrée':'no entries','pour ce contexte':'for this context','0 avec timing':'0 with timing','données de combat':'combat data',
    'ÉTAT DES DONNÉES':'DATA STATUS','Couverture du build':'Build coverage','Skills vs référentiel':'Skills vs reference','Métadonnées Skills':'Skill metadata','Transitions avec timing':'Transitions with timing',
    'Le contexte est prêt, mais aucune compétence n’est chargée. Commence par la recherche automatique depuis le dictionnaire.':'The context is ready, but no skill is loaded. Start with the automatic search from the dictionary.',
    'PROCHAINES ACTIONS':'NEXT ACTIONS','Priorités recommandées':'Recommended priorities','Créer un premier combo':'Create a first combo','Aucun combo enregistré pour ce contexte':'No combo saved for this context','Builder':'Builder','Ajouter des transitions':'Add transitions','Aucun cancel/transition validé':'No validated cancel/transition',
    'WORKFLOW':'WORKFLOW','De la donnée brute au combo optimisé':'From raw data to an optimized combo','Clique sur une étape pour ouvrir l’outil correspondant':'Click a step to open the corresponding tool',
    'Classe & spécialisation':'Class & specialization','Importer les données':'Import data','Vérifier les Skills':'Review Skills','Mesurer les transitions':'Measure transitions','Construire un combo':'Build a combo','Optimiser':'Optimize',
    'Aucune donnée':'No data','Aucune donnée disponible':'No data available','Aucune entrée':'No entries','Aucun résultat':'No results','Aucun résultat trouvé':'No results found','Non disponible':'Unavailable','À enrichir':'Needs enrichment',
    'Compétences actives':'Active skills','Combos enregistrés':'Saved combos','Transitions mesurées':'Measured transitions','Qualité des données':'Data quality',
    'Derniers builds construits':'Latest builds','0 build enregistré':'0 saved builds','Aucun build enregistré. Construis un combo puis utilise « Enregistrer ce build ».':'No saved build. Build a combo, then use “Save this build”.',
    'DATE':'DATE','CONTEXTE':'CONTEXT','TYPE':'TYPE','SÉQUENCE':'SEQUENCE','VALIDATION':'VALIDATION','ACTIONS':'ACTIONS','LIENS UTILES':'USEFUL LINKS','Ressources de la classe':'Class resources','Ressources générales':'General resources','DIAGNOSTIC':'DIAGNOSTICS','État du contexte actif':'Active context status',
    'Classe / spec':'Class / spec','Skills actifs':'Active skills','ESPACE UTILISATEUR':'USER AREA','Compte local & données personnelles':'Local account & personal data','Gérer mon compte':'Manage my account',
    'CONFIGURATION':'CONFIGURATION','Données BDO Combos Labs':'BDO Combos Labs data','Copie de sécurité recommandée : exporte dans un fichier JSON les Skills, durées CC, combos, transitions/cancels, mesures vidéo, validations, add-ons, loadout, état du Builder et réglages. Conserve ce fichier pour pouvoir tout restaurer sans ressaisie.':'Recommended backup: export Skills, CC durations, combos, transitions/cancels, video measurements, validations, add-ons, loadout, Builder state and settings to a JSON file. Keep this file so everything can be restored without re-entering data.',
    'Poids mobilité':'Mobility weight','Poids cancels / transitions':'Cancels / transitions weight','Seuil re-CC PvP':'PvP re-CC threshold','En dessous, le prochain skill doit appliquer un CC.':'Below this threshold, the next skill must apply a CC.',
    'Entrée / prise d’initiative':'Entry / initiative','Préparation du combo':'Combo setup','Contrôle / re-CC PvP':'Control / PvP re-CC','Dégâts principaux':'Main damage','Fin de chaîne / sortie':'End of chain / exit',
    'Optimizer respectera l’ordre : Engage → Setup → CC → Burst → Finisher et tiendra compte des durées mesurées des transitions. Une phase désactivée est ignorée.':'The optimizer will follow the order Engage → Setup → CC → Burst → Finisher and account for measured transition durations. A disabled phase is ignored.',
    '0 compétence(s) de référence disponible(s) pour':'0 reference skill(s) available for','Clique pour ajouter les manquantes.':'Click to add missing ones.',
    'Gère les consommables, les cristaux et les Skill Add-ons pour la classe / spécialisation sélectionnée.':'Manage consumables, crystals and Skill Add-ons for the selected class / specialization.',
    'Consommables officiels':'Official consumables','Sets de cristaux joueurs':'Player crystal sets','Aucun set de cristaux appliqué.':'No crystal set applied.','Aucun preset actif.':'No active preset.','Aucun consommable actif':'No active consumable',
    'Connexion':'Sign in','Déconnexion':'Sign out','Langue':'Language','Local Lab':'Local Lab'
  });
  Object.assign(exact.de,{
    'Accueil':'Startseite','Mesure, construis et optimise tes combos BDO':'Messe, baue und optimiere deine BDO-Combos','ÉTAT DES DONNÉES':'DATENSTATUS','Couverture du build':'Build-Abdeckung','PROCHAINES ACTIONS':'NÄCHSTE AKTIONEN','Priorités recommandées':'Empfohlene Prioritäten','Créer un premier combo':'Erste Combo erstellen','Ajouter des transitions':'Übergänge hinzufügen','WORKFLOW':'WORKFLOW','De la donnée brute au combo optimisé':'Von Rohdaten zur optimierten Combo','Référentiel : aucun pour ce contexte':'Referenz: keine für diesen Kontext','Skills chargés':'Geladene Skills','Complétude':'Vollständigkeit','Langue':'Sprache','Connexion':'Anmelden','Déconnexion':'Abmelden'
  });
  Object.assign(exact.es,{
    'Accueil':'Inicio','Mesure, construis et optimise tes combos BDO':'Mide, construye y optimiza tus combos de BDO','ÉTAT DES DONNÉES':'ESTADO DE DATOS','Couverture du build':'Cobertura del build','PROCHAINES ACTIONS':'PRÓXIMAS ACCIONES','Priorités recommandées':'Prioridades recomendadas','Créer un premier combo':'Crear un primer combo','Ajouter des transitions':'Añadir transiciones','WORKFLOW':'FLUJO DE TRABAJO','De la donnée brute au combo optimisé':'De datos sin procesar al combo optimizado','Référentiel : aucun pour ce contexte':'Referencia: ninguna para este contexto','Skills chargés':'Skills cargadas','Complétude':'Completitud','Langue':'Idioma','Connexion':'Iniciar sesión','Déconnexion':'Cerrar sesión'
  });
  Object.assign(exact.it,{
    'Accueil':'Home','Mesure, construis et optimise tes combos BDO':'Misura, costruisci e ottimizza le tue combo BDO','ÉTAT DES DONNÉES':'STATO DATI','Couverture du build':'Copertura build','PROCHAINES ACTIONS':'PROSSIME AZIONI','Priorités recommandées':'Priorità consigliate','Créer un premier combo':'Crea una prima combo','Ajouter des transitions':'Aggiungi transizioni','WORKFLOW':'FLUSSO DI LAVORO','De la donnée brute au combo optimisé':'Dai dati grezzi alla combo ottimizzata','Référentiel : aucun pour ce contexte':'Riferimento: nessuno per questo contesto','Skills chargés':'Skill caricate','Complétude':'Completezza','Langue':'Lingua','Connexion':'Accedi','Déconnexion':'Esci'
  });
  Object.assign(exact.pt,{
    'Accueil':'Início','Mesure, construis et optimise tes combos BDO':'Mede, constrói e otimiza os teus combos BDO','ÉTAT DES DONNÉES':'ESTADO DOS DADOS','Couverture du build':'Cobertura da build','PROCHAINES ACTIONS':'PRÓXIMAS AÇÕES','Priorités recommandées':'Prioridades recomendadas','Créer un premier combo':'Criar um primeiro combo','Ajouter des transitions':'Adicionar transições','WORKFLOW':'FLUXO DE TRABALHO','De la donnée brute au combo optimisé':'Dos dados brutos ao combo otimizado','Référentiel : aucun pour ce contexte':'Referência: nenhuma para este contexto','Skills chargés':'Skills carregadas','Complétude':'Completude','Langue':'Idioma','Connexion':'Entrar','Déconnexion':'Sair'
  });

  const fallbackWords={
    en:[
      ['Aucune donnée','No data'],['Aucun donnée','No data'],['Aucun','No'],['Aucune','No'],['Données','Data'],['données','data'],
      ['compétences','skills'],['Compétences','Skills'],['compétence','skill'],['Compétence','Skill'],['classe','class'],['Classe','Class'],
      ['spécialisation','specialization'],['Spécialisation','Specialization'],['recherche','search'],['Recherche','Search'],
      ['ajouter','add'],['Ajouter','Add'],['supprimer','delete'],['Supprimer','Delete'],['enregistrer','save'],['Enregistrer','Save'],
      ['modifier','edit'],['Modifier','Edit'],['actif','active'],['active','active'],['Actif','Active'],['Active','Active'],
      ['joueur','player'],['joueurs','players'],['Joueur','Player'],['Joueurs','Players'],['partagé','shared'],['partagés','shared'],
      ['vérifié','verified'],['Vérifié','Verified'],['source','source'],['Sources','Sources'],['ressource','resource'],['Ressources','Resources'],
      ['maximum','maximum'],['minimum','minimum'],['durée','duration'],['Durée','Duration'],['priorité','priority'],['Priorité','Priority'],
      ['protection','protection'],['mobilité','mobility'],['poids','weight'],['coût','cost'],['Coût','Cost'],['stamina','stamina'],
      ['préserver','preserve'],['Préserver','Preserve'],['phase','phase'],['Phase','Phase'],['état','status'],['État','Status'],
      ['option','option'],['Option','Option'],['nombre','number'],['Nombre','Number'],['ordre','order'],['Ordre','Order'],
      ['qualité','quality'],['Qualité','Quality'],['détection','detection'],['Détection','Detection'],['confiance','confidence'],['Confiance','Confidence'],
      ['sélectionné','selected'],['sélectionnée','selected'],['sélection','selection'],['Sélection','Selection'],['contexte','context'],['Contexte','Context'],
      ['importé','imported'],['importée','imported'],['import','import'],['export','export'],['sauvegarde','backup'],['Sauvegarde','Backup'],
      ['restauration','restore'],['automatique','automatic'],['Automatique','Automatic'],['manuel','manual'],['Manuel','Manual'],
      ['général','general'],['générales','general'],['utilisateur','user'],['Utilisateur','User'],['historique','history'],['Historique','History'],
      ['derniers','latest'],['Derniers','Latest'],['ouvrir','open'],['Ouvrir','Open'],['fermer','close'],['Fermer','Close'],
      ['aucun','no'],['encore','yet'],['pour','for'],['avec','with'],['sans','without'],['et','and'],['ou','or'],['de','of'],['des','of'],['du','of the'],['la','the'],['le','the'],['les','the']
    ],
    de:[['Données','Daten'],['données','Daten'],['Compétences','Skills'],['compétences','Skills'],['Classe','Klasse'],['classe','Klasse'],['Ajouter','Hinzufügen'],['ajouter','hinzufügen'],['Supprimer','Löschen'],['Enregistrer','Speichern'],['Recherche','Suche'],['Ressources','Ressourcen'],['utilisateur','Benutzer'],['joueurs','Spieler'],['Aucun','Kein'],['Aucune','Keine']],
    es:[['Données','Datos'],['données','datos'],['Compétences','Habilidades'],['compétences','habilidades'],['Classe','Clase'],['classe','clase'],['Ajouter','Añadir'],['Supprimer','Eliminar'],['Enregistrer','Guardar'],['Recherche','Buscar'],['Ressources','Recursos'],['utilisateur','usuario'],['joueurs','jugadores'],['Aucun','Ningún'],['Aucune','Ninguna']],
    it:[['Données','Dati'],['données','dati'],['Compétences','Abilità'],['compétences','abilità'],['Classe','Classe'],['classe','classe'],['Ajouter','Aggiungi'],['Supprimer','Elimina'],['Enregistrer','Salva'],['Recherche','Ricerca'],['Ressources','Risorse'],['utilisateur','utente'],['joueurs','giocatori'],['Aucun','Nessun'],['Aucune','Nessuna']],
    pt:[['Données','Dados'],['données','dados'],['Compétences','Habilidades'],['compétences','habilidades'],['Classe','Classe'],['classe','classe'],['Ajouter','Adicionar'],['Supprimer','Eliminar'],['Enregistrer','Guardar'],['Recherche','Pesquisa'],['Ressources','Recursos'],['utilisateur','utilizador'],['joueurs','jogadores'],['Aucun','Nenhum'],['Aucune','Nenhuma']]
  };

  const ccTerms=new Set(['CC','Stiffness','Stun','Knockdown','Bound','Float','Knockback','Grapple','Air Smash','Down Smash','Super Armor','Forward Guard','Invincible','Invincibility','I-frame','Iframe']);
  const inputPattern=/^(?:(?:SHIFT|CTRL|ALT|SPACE|LMB|RMB|MMB|W|A|S|D|Q|E|F|C|X|Z|R|T|G|V|1|2|3|4|5|6|7|8|9|0)(?:\s*\+\s*|\s*\/\s*|\s*→\s*|\s*,\s*|\s+)?)+$/i;

  function lang(){
    try{
      if(typeof window.bclCurrentLanguageV112==='function') return window.bclCurrentLanguageV112();
      const s=document.getElementById('bclLanguageSelect');
      return SUPPORTED.includes(s?.value)?s.value:'fr';
    }catch(e){ return 'fr'; }
  }

  function collectSkillNames(){
    const out=new Set();
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i)||'';
        if(!/skill/i.test(k)) continue;
        const raw=localStorage.getItem(k);
        if(!raw || raw.length>3000000) continue;
        let obj; try{obj=JSON.parse(raw)}catch(e){continue}
        const stack=[obj], seen=new Set();
        while(stack.length){
          const v=stack.pop();
          if(!v || typeof v!=='object' || seen.has(v)) continue;
          seen.add(v);
          if(Array.isArray(v)){ for(const x of v) stack.push(x); continue; }
          for(const [key,val] of Object.entries(v)){
            if(typeof val==='string' && /^(name|skillName|skill_name|skill)$/i.test(key) && val.length<120) out.add(val.trim());
            else if(val && typeof val==='object') stack.push(val);
          }
        }
      }
    }catch(e){}
    return out;
  }
  let skillNames=collectSkillNames();
  window.addEventListener('storage',()=>{skillNames=collectSkillNames();});

  function shouldSkip(el,text){
    if(!el || !text || !text.trim()) return true;
    if(el.closest('script,style,noscript,code,pre,input,textarea,select,option,[contenteditable="true"],[data-no-i18n],[data-i18n]')) return true;
    const sig=((el.id||'')+' '+(typeof el.className==='string'?el.className:'')).toLowerCase();
    if(/skill[-_ ]?(name|title)|name[-_ ]?skill|combat[-_ ]?input|skill[-_ ]?input|input[-_ ]?combo|cc[-_ ]?(type|name|value|label)/.test(sig)) return true;
    const t=text.trim();
    if(skillNames.has(t) || ccTerms.has(t) || inputPattern.test(t)) return true;
    if(/^https?:\/\//i.test(t) || /^[\w.+-]+@[\w.-]+\.\w+$/.test(t)) return true;
    return false;
  }

  function replaceWords(text,l){
    let out=text;
    const list=fallbackWords[l]||[];
    for(const [a,b] of list){
      const esc=a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      out=out.replace(new RegExp('(^|[^\\p{L}])('+esc+')(?=$|[^\\p{L}])','gu'),(m,p)=>p+b);
    }
    return out;
  }

  function translateCore(core,l){
    if(l==='fr') return core;
    const map=exact[l]||{};
    if(map[core]) return map[core];
    for(const [src,dst] of Object.entries(map)){
      if(core.startsWith(src+' ')) return dst+core.slice(src.length);
    }
    return replaceWords(core,l);
  }

  function translateText(text,l){
    const m=text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const lead=m?m[1]:'', core=m?m[2]:text, tail=m?m[3]:'';
    if(!core) return text;
    return lead+translateCore(core,l)+tail;
  }

  function processNode(node,l){
    if(node.nodeType!==Node.TEXT_NODE) return;
    const el=node.parentElement;
    if(!sourceText.has(node)) sourceText.set(node,node.nodeValue);
    const src=sourceText.get(node);
    if(shouldSkip(el,src)) return;
    const next=translateText(src,l);
    if(node.nodeValue!==next){
      applying.add(node);
      node.nodeValue=next;
      queueMicrotask(()=>applying.delete(node));
    }
  }

  function apply(root){
    const l=lang();
    if(root?.nodeType===Node.TEXT_NODE){ processNode(root,l); return; }
    const base=root?.nodeType===Node.ELEMENT_NODE?root:document.body;
    if(!base) return;
    const w=document.createTreeWalker(base,NodeFilter.SHOW_TEXT);
    let n; while((n=w.nextNode())) processNode(n,l);
  }

  let queued=false;
  function schedule(root){
    if(queued) return;
    queued=true;
    setTimeout(()=>{queued=false; skillNames=collectSkillNames(); apply(root||document.body);},60);
  }

  const observer=new MutationObserver(ms=>{
    for(const m of ms){
      if(m.type==='characterData' && !applying.has(m.target)){
        sourceText.set(m.target,m.target.nodeValue);
        schedule(m.target);
      }else if(m.type==='childList'){
        for(const n of m.addedNodes) schedule(n);
      }
    }
  });

  function init(){
    apply(document.body);
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    const sel=document.getElementById('bclLanguageSelect');
    if(sel) sel.addEventListener('change',()=>setTimeout(()=>apply(document.body),0));
    window.addEventListener('bcl-language-changed',()=>setTimeout(()=>apply(document.body),0));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
