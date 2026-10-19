/* =====================================================================
   script.js — « site popo » · Livio & Popo
   JavaScript Vanilla pur. Zéro framework, zéro CDN : fonctionne depuis
   une clé USB (protocole file://).
   Les données des recettes sont dans recettes.js (chargé avant ce fichier).

   SOMMAIRE
    1. Configuration
    2. Données éditables (DATA, PLACES, QUIZ, EGGS)
    3. Utilitaires (DOM, stockage, dates, médias avec fallback, focus)
    4. Thèmes
    5. Onglets (SPA)
    6. Compteur en direct
    7. Accueil (âges, cœurs, prochaine étape)
    8. Timeline (polaroids + flip 3D)
    9. BeReal (inversion des deux vues)
   10. Carte SVG (tooltips + modale)
   11. Cinéma (statuts persistés)
   12. Lecteur vinyle (démo ou audio local) + cartes artistes
   13. Confettis canvas
   14. Quiz
   15. Toasts (notifications)
   16. Roue des dates
   17. Livre de recettes (données : recettes.js)
   18. Easter eggs + célébrations (mois, anniversaires, jalons)
   19. Étoiles + initialisation
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     1. CONFIGURATION
     =================================================================== */
  var CONFIG = {
    // Date officielle du couple : 21/09/2026 (mois 0-indexé : 8 = septembre)
    coupleStart: new Date(2026, 8, 21, 0, 0, 0),
    storagePrefix: 'popo.',
    tabs: ['accueil', 'timeline', 'bereal', 'carte', 'culture', 'roue', 'recettes', 'quiz'],
    themes: [
      { id: 'polaroid',   name: 'Polaroid Vintage',  swatch: ['#f1e6cf', '#8f4a14'] },
      { id: 'romantique', name: 'Romantique Pastel', swatch: ['#fde8ea', '#b8436a'] },
      { id: 'midnight',   name: 'Midnight Stars',    swatch: ['#070b1a', '#ffd470'] },
      { id: 'epure',      name: 'Épuré Moderne',     swatch: ['#ffffff', '#111111'] }
    ]
  };


  /* ===================================================================
     2. DONNÉES ÉDITABLES
     Tout le contenu (textes, dates, chemins d'images) est ici.
     Chemins relatifs uniquement. Image absente = fallback CSS automatique.
     =================================================================== */
  var DATA = {

    /* ---- Timeline : photos/timeline/ ---- */
    timeline: [
      {
        date: 'Enfance',
        title: 'On se connaît depuis toujours',
        note: "Nos mères étaient amies, alors elle venait à la maison. Sans le savoir, l'histoire avait déjà commencé.",
        img: 'photos/timeline/01_enfance.jpg'
      },
      {
        date: 'Années collège / lycée',
        title: 'Les regards de loin',
        note: "Elle était la meilleure amie de ma cousine à l'époque, et souvent de passage au restaurant de ma tante. On se croisait, on se regardait de loin.",
        img: 'photos/timeline/02_college_lycee.jpg'
      },
      {
        date: 'Février 2026',
        title: 'Les premiers rapprochements',
        note: "On commence enfin à se calculer. Plus de regards de loin : les premiers vrais rapprochements.",
        img: 'photos/timeline/03_fevrier_2026.jpg'
      },
      {
        date: 'Début mai 2026',
        title: 'Le premier baiser',
        note: "Une soirée au bar, une soirée arrosée et mémorable. Le premier baiser.",
        img: 'photos/timeline/04_premier_baiser.jpg'
      },
      {
        date: 'Août 2026',
        title: 'Les retrouvailles',
        note: "Après quelques mois d'éloignement, le retour des sorties complices.",
        img: 'photos/timeline/05_retrouvailles.jpg'
      },
      {
        date: 'Septembre 2026',
        title: "L'évidence",
        note: "Les choses s'accélèrent naturellement. Tout devient évident.",
        img: 'photos/timeline/06_evidence.jpg'
      },
      {
        date: '21 septembre 2026',
        title: 'Le grand jour',
        note: "L'officialisation de notre couple. Le 21 septembre 2026, c'est nous.",
        img: 'photos/timeline/07_grand_jour.jpg'
      }
    ],

    /* ---- Roadmap « Prochainement » (fin 2026) ---- */
    roadmap: [
      {
        date: '28 octobre 2026', when: new Date(2026, 9, 28),
        title: 'Escapade à Paris',
        note: "Une journée rien que pour nous deux, à Paris.",
        img: 'photos/timeline/08_paris_28_octobre.jpg'
      },
      {
        date: 'Novembre 2026', when: new Date(2026, 10, 1), monthOnly: true, badge: 'Novembre',
        title: 'Week-end à Lyon',
        note: "Un week-end en amoureux à Lyon.",
        img: 'photos/timeline/09_lyon_novembre.jpg'
      },
      {
        date: '31 décembre 2026', when: new Date(2026, 11, 31),
        title: 'Nouvel An ensemble',
        note: "Fêter ensemble cette année charnière.",
        img: 'photos/timeline/10_nouvel_an.jpg'
      }
    ],

    /* ---- BeReal : photos/bereal/bereal_NN_recto.jpg (grande photo)
                      photos/bereal/bereal_NN_verso.jpg (vignette caméra frontale)
         Les légendes et commentaires sont des PLACEHOLDERS à remplacer. ---- */
    bereal: [
      { id: 1, author: 'Livio', date: '2026-09-11', time: '15:42', place: 'Saint-André', late: '',
        caption: "La piscine congelée", reactions: 2,
        comment: { by: 'Popo', text: "Au moins il faisait beau" } },
      { id: 2, author: 'Popo', date: '2026-09-18', time: '01:08', place: 'Troyes', late: '+4 min',
        caption: "Au moulin, c'était trop bien !", reactions: 3,
        comment: { by: 'Livio', text: "On valide la masterclasse" } },
      { id: 3, author: 'Livio', date: '2026-09-19', time: '21:15', place: 'Saint-André', late: '',
        caption: "Balade du dimanche, version complices", reactions: 2,
        comment: { by: 'Popo', text: "Meilleure équipe de balade" } },
      { id: 4, author: 'Popo', date: '2026-10-01', time: '21:30', place: 'Troyes', late: '+1 h',
        caption: "Before et MyBeers", reactions: 4,
        comment: { by: 'Livio', text: "" } },
		{ id: 5, author: 'Livio', date: '2026-10-14', time: '18:47', place: 'Saint-André', late: '',
        caption: "City avec Popo et Clément", reactions: 2,
        comment: { by: 'Popo', text: "T'es trop nul au foot" } },
      { id: 6, author: 'Popo', date: '2026-10-15', time: '21:30', place: 'Saint-André', late: '+3 h',
        caption: "Préparation pour aller en soirée", reactions: 4,
        comment: { by: 'Livio', text: "Déjà KO avec 3 verres" } },
		{ id: 7, author: 'Popo', date: '2026-10-15', time: '23:05', place: 'Troyes', late: '+5 h',
        caption: "Cc Adèle et Robin", reactions: 4,
        comment: { by: 'Livio', text: "le fasciste" } },
		{ id: 8, author: 'Livio', date: '2026-10-16', time: '22:12', place: 'Troyes', late: '+7 min',
        caption: "Verity au ciné", reactions: 2,
		comment: { by: 'Popo', text: "Sympa les gens derrière" } },
      { id: 9, author: 'Popo', date: '2026-10-17', time: '19:52', place: 'Troyes', late: '',
        caption: "Match de l'Estac", reactions: 6,
        comment: { by: 'Livio', text: "3-1 contre Lens RIP" } }
    ],

    /* ---- Cinéma & séries ----
       img = chemin LOCAL (prioritaire si le fichier existe : mode 100 % hors ligne).
       art = étapes de résolution EN LIGNE, essayées dans l'ordre si le fichier local
             est absent (voir ArtResolver) :
               { tv: 'Nom' }                      → TVMaze (séries)
               { movie: 'Titre', minYear: 2026 }  → iTunes Search (films)
               { wiki: 'Titre de page' }          → Wikipédia (image de l'infobox)
               { url: 'https://…' }               → URL directe de ton choix
       Aucune image trouvée = dégradé de secours. */
    cinema: [
      { id: 'ahs', type: 'Série', title: 'American Horror Story', blurb: "L'anthologie d'horreur. Déjà vue.",
        img: 'photos/cinema/american_horror_story.jpg', status: 'seen',
        art: [{ tv: 'American Horror Story' }] },
      { id: 'lcdp', type: 'Série', title: 'La Casa de Papel', blurb: "Le casse du siècle, à vivre sous un plaid.",
        img: 'photos/cinema/la_casa_de_papel.jpg', status: 'todo',
        art: [{ tv: 'Money Heist' }, { tv: 'La Casa de Papel' }] },
      { id: 'got', type: 'Série', title: 'Game of Thrones', blurb: "Les Sept Couronnes, le plan marathon.",
        img: 'photos/cinema/game_of_thrones.jpg', status: 'todo',
        art: [{ tv: 'Game of Thrones' }] },
      { id: 'clayface', type: 'Film · sortie ciné', title: 'Clayface', blurb: "Une sortie ciné à caler ensemble.",
        img: 'photos/cinema/clayface.jpg', status: 'todo',
        art: [{ movie: 'Clayface', minYear: 2026 }, { wiki: 'Clayface (film)' }] }
    ],

    /* ---- Artistes & lecteur : photos/music/ et audio/ (optionnel) ----
       Si un fichier audio existe à l'emplacement indiqué, il est lu.
       Sinon le lecteur passe automatiquement en mode démo (durée factice).
       Remplace le champ `spotify` par l'URL exacte d'un profil/une playlist. */
    /* `art` : pochette d'album résolue en ligne (iTunes Search) si le fichier local est absent.
       L'album choisi est celui qui contient le morceau du lecteur. */
    artists: [
      { id: 'macdemarco', name: 'Mac DeMarco', vibe: 'Slacker pop, guitares chaloupées',
        img: 'photos/music/mac_demarco.jpg', track: 'Chamber of Reflection', dur: 231, audio: 'audio/mac_demarco.mp3',
        art: [{ album: 'Salad Days', artist: 'Mac DeMarco' }],
        spotify: 'https://open.spotify.com/search/Mac%20DeMarco' },
      { id: 'lana', name: 'Lana Del Rey', vibe: 'Pop cinématographique, nostalgie américaine',
        img: 'photos/music/lana_del_rey.jpg', track: 'Summertime Sadness', dur: 265, audio: 'audio/lana_del_rey.mp3',
        art: [{ album: 'Born to Die', artist: 'Lana Del Rey' }],
        spotify: 'https://open.spotify.com/search/Lana%20Del%20Rey' },
      { id: 'jain', name: 'Jain', vibe: 'Pop électro, rythmes du monde',
        img: 'photos/music/jain.jpg', track: 'Makeba', dur: 185, audio: 'audio/jain.mp3',
        art: [{ album: 'Zanaka', artist: 'Jain' }],
        spotify: 'https://open.spotify.com/search/Jain' },
      { id: 'beachhouse', name: 'Beach House', vibe: 'Dream pop, nappes planantes',
        img: 'photos/music/beach_house.jpg', track: 'Space Song', dur: 320, audio: 'audio/beach_house.mp3',
        art: [{ album: 'Depression Cherry', artist: 'Beach House' }],
        spotify: 'https://open.spotify.com/search/Beach%20House' }
    ],

    /* ---- Anniversaires (mois 0-indexé : 0 = janvier, 6 = juillet) ---- */
    birthdays: [
      { name: 'Livio', month: 0, day: 21 },
      { name: 'Popo',  month: 6, day: 30 }
    ],

    /* ---- Roue des dates ----
       cat    : clé de dateCategories
       short  : texte affiché SUR la roue (18 caractères max conseillés)
       budget : 0 = gratuit · 1 = € · 2 = €€ · 3 = €€€
       recipe : (optionnel) ajoute un bouton « Tirer une recette »
                '*' = toutes catégories, sinon 'apero' | 'plat' | 'dessert' | 'brunch' */
    dateCategories: {
      cocooning:  'Cocooning',
      sortie:     'Sortie',
      gourmand:   'Gourmand',
      aventure:   'Aventure',
      creatif:    'Créatif',
      romantique: 'Romantique'
    },
    dateIdeas: [
      /* -- Cocooning -- */
      { cat: 'cocooning', short: 'Marathon série', budget: 0, title: 'Marathon série sous le plaid',
        text: "On pioche une série dans la liste Pop-corn, on prépare les snacks et on enchaîne les épisodes. Téléphones en mode avion." },
      { cat: 'cocooning', short: 'Cabane du salon', budget: 0, title: 'La cabane du salon',
        text: "Couvertures, coussins, chaises et guirlande lumineuse : on construit une vraie cabane et on y regarde un film." },
      { cat: 'cocooning', short: 'Soirée jeux', budget: 0, title: 'Soirée jeux de société',
        text: "Cartes, petits chevaux ou jeu de société : le perdant fait la vaisselle (et n'a pas le droit de râler)." },
      { cat: 'cocooning', short: 'Karaoké maison', budget: 0, title: 'Karaoké à la maison',
        text: "Chacun choisit les chansons que l'autre doit chanter. Interdiction de refuser, même le pire titre des années 2000." },
      { cat: 'cocooning', short: 'Spa maison', budget: 1, title: 'Spa à la maison',
        text: "Masques, bain de pieds, bougies et massage. Ambiance zen obligatoire, playlist douce en fond." },
      { cat: 'cocooning', short: 'Puzzle à deux', budget: 1, title: 'Le puzzle de 1 000 pièces',
        text: "Un grand puzzle à finir ensemble. On ne lâche rien, même s'il faut s'y remettre le lendemain." },
      { cat: 'cocooning', short: 'Cinéma maison', budget: 0, title: 'Une vraie séance de cinéma maison',
        text: "Billets faits main, pop-corn, lumières éteintes et téléphones confisqués. Comme au ciné, en mieux." },
      { cat: 'cocooning', short: 'Photos d\'enfance', budget: 0, title: 'La soirée photos d\'enfance',
        text: "Nos mères étaient amies : il y a forcément des photos de nous petits quelque part. On part à la chasse." },
      { cat: 'cocooning', short: 'Lecture à deux', budget: 0, title: 'Lecture côte à côte',
        text: "Chacun son livre, collés sous le plaid, puis on se raconte ce qu'on a lu autour d'un chocolat chaud.", recipe: 'brunch' },
      { cat: 'cocooning', short: 'Jeu vidéo coop', budget: 0, title: 'Jeu vidéo en coopération',
        text: "Un jeu à deux où il faut vraiment coopérer. Test de couple garanti." },

      /* -- Sortie -- */
      { cat: 'sortie', short: 'Ciné surprise', budget: 2, title: 'Ciné surprise',
        text: "On va au cinéma sans rien prévoir et on choisit le film au dernier moment, devant l'affiche." },
      { cat: 'sortie', short: 'Bowling', budget: 2, title: 'Soirée bowling',
        text: "Deux parties, et le perdant paie les frites. Les chaussures de bowling sont non négociables." },
      { cat: 'sortie', short: 'Le vieux Troyes', budget: 0, title: 'Touristes dans le vieux Troyes',
        text: "Balade dans le centre historique en mode touristes : maisons à pans de bois, ruelle des Chats, photos ridicules." },
      { cat: 'sortie', short: 'Escape game', budget: 3, title: 'Escape game',
        text: "Une heure pour sortir d'une salle à deux. On verra bien qui garde son calme." },
      { cat: 'sortie', short: 'Concert / bar live', budget: 2, title: 'Concert ou bar avec musique live',
        text: "On trouve un petit concert ou un bar avec de la musique live, et on y va sans connaître le groupe." },
      { cat: 'sortie', short: 'Laser game', budget: 2, title: 'Laser game',
        text: "Duel sans pitié. Le classement final sera affiché au frigo." },
      { cat: 'sortie', short: 'Musée / expo', budget: 1, title: 'Musée ou exposition',
        text: "Chacun choisit son œuvre préférée et doit la défendre en deux minutes chrono à la sortie." },
      { cat: 'sortie', short: 'Patinoire', budget: 1, title: 'Patinoire',
        text: "On se tient la main, officiellement pour l'équilibre." },
      { cat: 'sortie', short: 'Shopping budget', budget: 2, title: 'Après-midi shopping à budget fixe',
        text: "Les magasins d'usine de Troyes avec un budget fixé à l'avance : chacun choisit une tenue pour l'autre." },
      { cat: 'sortie', short: 'Parc d\'attractions', budget: 3, title: 'Journée parc d\'attractions',
        text: "Nigloland ou un autre parc pour une journée de manèges (on vérifie les dates d'ouverture avant)." },

      /* -- Gourmand -- */
      { cat: 'gourmand', short: 'Recette au hasard', budget: 1, title: 'Cuisiner une recette du livre',
        text: "On tire une recette au hasard dans notre livre de recettes, on fait les courses ensemble et on cuisine à deux.", recipe: '*' },
      { cat: 'gourmand', short: 'Battle Top Chef', budget: 1, title: 'Battle façon Top Chef',
        text: "Même panier d'ingrédients, une heure chacun, et on se note sans pitié. Le gagnant choisit le prochain date.", recipe: 'plat' },
      { cat: 'gourmand', short: 'Resto inconnu', budget: 2, title: 'Le resto inconnu',
        text: "Un restaurant où on n'est jamais allés, d'une cuisine que l'un de nous n'a jamais goûtée." },
      { cat: 'gourmand', short: 'Brunch au lit', budget: 1, title: 'Brunch au lit',
        text: "Pancakes, jus d'orange, viennoiseries, et interdiction de sortir du lit avant midi.", recipe: 'brunch' },
      { cat: 'gourmand', short: 'Pique-nique', budget: 1, title: 'Pique-nique',
        text: "Dehors s'il fait beau, sur une nappe au milieu du salon s'il pleut. Les deux comptent." },
      { cat: 'gourmand', short: 'Raclette party', budget: 1, title: 'Soirée raclette',
        text: "Le meilleur argument pour aimer l'hiver. Pyjama recommandé." },
      { cat: 'gourmand', short: 'Tour boulangeries', budget: 1, title: 'Le tour des boulangeries',
        text: "On teste les pains au chocolat de trois boulangeries et on élit le meilleur de Troyes." },
      { cat: 'gourmand', short: 'Pâtisserie à deux', budget: 1, title: 'Atelier pâtisserie à deux',
        text: "On choisit un dessert du livre et on le réussit à quatre mains (ou presque).", recipe: 'dessert' },
      { cat: 'gourmand', short: 'Défi andouillette', budget: 1, title: 'Le défi andouillette',
        text: "Spécialité locale oblige : on goûte une andouillette de Troyes. Ou on assume fièrement de refuser." },
      { cat: 'gourmand', short: 'Dîner du monde', budget: 1, title: 'Le dîner du monde',
        text: "On tire un pays au hasard sur une carte et on cuisine un plat typique de là-bas." },

      /* -- Aventure -- */
      { cat: 'aventure', short: 'Lac d\'Orient', budget: 0, title: 'Balade au lac d\'Orient',
        text: "Balade ou vélo au bord du lac, et on reste jusqu'au coucher de soleil." },
      { cat: 'aventure', short: 'Randonnée', budget: 0, title: 'Randonnée en forêt',
        text: "Une rando en forêt avec un pique-nique à la pause. Chaussures confortables exigées." },
      { cat: 'aventure', short: 'Road trip surprise', budget: 1, title: 'Road trip surprise',
        text: "On part en voiture sans destination : chacun son tour choisit la direction à chaque carrefour, pendant une heure." },
      { cat: 'aventure', short: 'Lever de soleil', budget: 0, title: 'Le lever de soleil',
        text: "Réveil très tôt, thermos de chocolat chaud, et on regarde le soleil se lever ensemble.", recipe: 'brunch' },
      { cat: 'aventure', short: 'Accrobranche', budget: 2, title: 'Accrobranche',
        text: "Tyroliennes et ponts de singe. Le premier qui a le vertige paie le goûter." },
      { cat: 'aventure', short: 'Train au hasard', budget: 2, title: 'Le train au hasard',
        text: "On prend un train vers une ville où on n'est jamais allés, et on improvise la journée sur place." },
      { cat: 'aventure', short: 'Chasse au trésor', budget: 0, title: 'Chasse au trésor',
        text: "L'un prépare une chasse au trésor avec des indices pour l'autre. Le trésor est à imaginer." },
      { cat: 'aventure', short: 'Balade à vélo', budget: 0, title: 'Balade à vélo',
        text: "Une après-midi à vélo autour de Troyes, avec une pause goûter à mi-parcours." },
      { cat: 'aventure', short: 'Nuit des étoiles', budget: 0, title: 'Observer les étoiles',
        text: "Loin des lumières de la ville, une couverture, une appli de constellations, et on cherche notre étoile." },
      { cat: 'aventure', short: 'Route du Champagne', budget: 2, title: 'La route du Champagne',
        text: "Les villages de la Côte des Bar, une visite de cave et une dégustation (avec modération, et un conducteur sobre)." },

      /* -- Créatif -- */
      { cat: 'creatif', short: 'Portrait croisé', budget: 1, title: 'Le portrait croisé',
        text: "Chacun peint ou dessine le portrait de l'autre en 20 minutes. Les chefs-d'œuvre seront encadrés." },
      { cat: 'creatif', short: 'Atelier poterie', budget: 2, title: 'Atelier poterie',
        text: "On fabrique nos propres tasses. Elles seront moches, et ce seront nos préférées." },
      { cat: 'creatif', short: 'Bocal à mots', budget: 0, title: 'Le bocal à mots doux',
        text: "On écrit chacun vingt petits mots sur des papiers pliés, à piocher les jours où ça ne va pas." },
      { cat: 'creatif', short: 'Court-métrage', budget: 0, title: 'Tourner un court-métrage',
        text: "Un mini film au téléphone en une soirée : scénario, tournage, montage, avant-première sur le canapé." },
      { cat: 'creatif', short: 'Playlist croisée', budget: 0, title: 'La playlist croisée',
        text: "Chacun crée une playlist de dix titres pour l'autre, et on l'écoute ensemble en expliquant chaque choix." },
      { cat: 'creatif', short: 'Album photo', budget: 1, title: 'Album photo papier',
        text: "On imprime nos meilleures photos et nos BeReal pour faire un vrai album… ou on les ajoute au site." },
      { cat: 'creatif', short: 'Bracelets assortis', budget: 1, title: 'Bracelets assortis',
        text: "Perles, fils et patience : on se fabrique des bracelets assortis." },
      { cat: 'creatif', short: 'Photo challenge', budget: 0, title: 'Le photo challenge',
        text: "Une liste de dix photos à prendre en ville (un truc rouge, un chat, un reflet…). Le plus créatif gagne." },
      { cat: 'creatif', short: 'Lettre pour 2027', budget: 0, title: 'La lettre au futur',
        text: "Chacun écrit une lettre à ouvrir dans un an, à cacheter et à ranger jusqu'au jour J." },
      { cat: 'creatif', short: 'Lego à deux', budget: 2, title: 'Construction Lego à deux',
        text: "Un set à monter ensemble, l'un lit la notice, l'autre construit. On échange à mi-chemin." },

      /* -- Romantique -- */
      { cat: 'romantique', short: 'Dîner aux bougies', budget: 1, title: 'Dîner aux bougies',
        text: "Un vrai dîner à la maison, bougies allumées, tenue correcte exigée.", recipe: 'plat' },
      { cat: 'romantique', short: 'Slow au salon', budget: 0, title: 'Un slow dans le salon',
        text: "Lumière tamisée, une chanson qui compte pour nous, et on danse. Même si on ne sait pas danser." },
      { cat: 'romantique', short: 'Coucher de soleil', budget: 0, title: 'La chasse au coucher de soleil',
        text: "On cherche le meilleur spot pour regarder le coucher de soleil, et on y va avec de quoi grignoter." },
      { cat: 'romantique', short: 'Revivre le 1er bisou', budget: 2, title: 'Revivre le premier baiser',
        text: "Retour au bar de la soirée du premier baiser, pour la revivre en version (un peu) plus sage." },
      { cat: 'romantique', short: 'Les 36 questions', budget: 0, title: 'Les 36 questions',
        text: "La célèbre liste de 36 questions pour apprendre à mieux se connaître. On croyait tout savoir…" },
      { cat: 'romantique', short: 'Soirée massage', budget: 0, title: 'Soirée massage',
        text: "Huile, musique douce et chacun son tour. Le chronomètre est autorisé pour l'équité." },
      { cat: 'romantique', short: 'Petit-déj surprise', budget: 1, title: 'Le petit-déj surprise',
        text: "L'un prépare un petit-déjeuner surprise pendant que l'autre dort encore.", recipe: 'brunch' },
      { cat: 'romantique', short: 'Journée sans tél', budget: 0, title: 'La journée sans téléphone',
        text: "Une journée entière sans écran, juste nous deux. Le premier qui craque paie le resto." },
      { cat: 'romantique', short: 'Week-end surprise', budget: 3, title: 'Le week-end surprise',
        text: "L'un organise tout en secret, l'autre fait juste son sac. Destination révélée au dernier moment." },
      { cat: 'romantique', short: 'Balade nocturne', budget: 0, title: 'Balade nocturne',
        text: "Une balade de nuit dans Troyes illuminée, main dans la main, sans but précis." }
    ]
  };

  /* ---- Carte : points d'intérêt (les coordonnées SVG sont dans index.html) ---- */
  var PLACES = {
    troyes: {
      name: 'Troyes', tag: 'Notre QG',
      short: "Notre QG, là où tout a commencé.",
      text: "Notre QG, là où tout a commencé. La ville de cœur de Livio & Popo.",
      date: 'Depuis toujours', img: 'photos/map/troyes.jpg'
    },
    paris: {
      name: 'Paris', tag: 'Escapade',
      short: "Escapade du 28 octobre.",
      text: "Une escapade d'un jour à Paris, rien que nous deux.",
      date: '28 octobre 2026', img: 'photos/map/paris.jpg'
    },
    lyon: {
      name: 'Lyon', tag: 'Week-end',
      short: "Week-end de novembre.",
      text: "Un week-end en amoureux à Lyon.",
      date: 'Novembre 2026', img: 'photos/map/lyon.jpg'
    }
  };

  /* ---- Quiz : 4 questions (answer = index de la bonne réponse) ---- */
  var QUIZ = [
    { q: "Quelle est la date officielle de notre couple ?",
      options: ['21 janvier 2026', '30 juillet 2026', '21 septembre 2026', '28 octobre 2026'], answer: 2,
      explain: "Le 21 septembre 2026, le grand jour." },
    { q: "Quand a eu lieu notre premier baiser ?",
      options: ["Début mai 2026, lors d'une soirée au bar", 'Février 2026, au cinéma',
                'Août 2026, pendant un week-end à Lyon', "Le jour de l'officialisation, le 21 septembre"], answer: 0,
      explain: "Une soirée au bar, arrosée et mémorable." },
    { q: "Qui étaient amies bien avant nous, ce qui nous a fait nous connaître enfants ?",
      options: ['Nos mères', 'Nos grands-pères', 'Nos voisins', 'Nos professeurs'], answer: 0,
      explain: "Nos mères étaient amies : on se connaît depuis toujours." },
    { q: "Où part-on en escapade le 28 octobre 2026 ?",
      options: ['Paris', 'Lyon', 'Bordeaux', 'Strasbourg'], answer: 0,
      explain: "Direction Paris pour une journée rien que nous deux." }
  ];

  /* ---- Easter eggs : messages À PERSONNALISER ----
     Déclencheurs (voir section 18) :
       popo / livio / jetaime  → taper le mot au clavier (hors champ de saisie)
       konami                  → ↑ ↑ ↓ ↓ ← → ← → B A
       logo                    → 7 clics rapides sur le logo
       titre                   → 10 clics rapides sur le titre de l'accueil
       vinyle                  → 5 clics rapides sur le vinyle
       roue                    → 10 tours de roue des dates dans la même visite */
  var EGGS = [
    { id: 'popo',    name: 'Le surnom',        hint: "Le plus doux des surnoms, tapé au clavier.",
      msg: "Popo, tu es la plus belle étape de toute cette timeline." },
    { id: 'livio',   name: 'Le prénom',        hint: "Et si tu tapais le prénom de l'autre au clavier ?",
      msg: "Livio est officiellement fou de toi. Preuve à l'appui : ce site." },
    { id: 'jetaime', name: 'Les trois mots',   hint: "Trois petits mots, tapés au clavier.",
      msg: "Moi aussi. Depuis bien avant le 21 septembre." },
    { id: 'konami',  name: 'Le code secret',   hint: "Les vieux gamers connaissent un code fait de flèches…",
      msg: "Mode disco activé. Tout le monde sur la piste !" },
    { id: 'logo',    name: 'Le petit cœur',    hint: "Le petit cœur du logo adore qu'on insiste.",
      msg: "Ce petit cœur bat un peu plus fort à chaque clic." },
    { id: 'titre',   name: 'Le grand titre',   hint: "Le grand titre de l'accueil réclame beaucoup, beaucoup de clics.",
      msg: "OK, message reçu : tu l'aimes vraiment." },
    { id: 'vinyle',  name: 'DJ Popo',          hint: "Un vrai DJ ne se contente pas de regarder tourner le vinyle…",
      msg: "Wicka-wicka ! DJ Popo est aux platines." },
    { id: 'roue',    name: 'Les indécis',      hint: "Ceux qui n'arrivent jamais à choisir finissent toujours par trouver.",
      msg: "Dix tours de roue… On fait la prochaine idée tirée, promis ?" }
  ];


  /* ===================================================================
     3. UTILITAIRES
     =================================================================== */
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function pad(n) { return String(n).padStart(2, '0'); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* localStorage protégé (peut être indisponible selon le navigateur / file://) */
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(CONFIG.storagePrefix + k); return v === null ? d : v; }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(CONFIG.storagePrefix + k, v); } catch (e) { /* ignoré */ }
    }
  };

  function readJSON(key, fallback) {
    try { var v = JSON.parse(store.get(key, '')); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }

  function icon(name, cls) {
    return '<svg class="ico ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  function plural(n, one, many) { return n < 2 ? one : many; }

  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function daysUntil(d) { return Math.round((startOfDay(d) - startOfDay(new Date())) / 86400000); }
  function daysLabel(n) {
    if (n < 0) return 'Passé';
    if (n === 0) return "Aujourd'hui";
    if (n === 1) return 'Demain';
    return 'Dans ' + n + ' jours';
  }

  function formatISODate(iso) {
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function ageFrom(birth) {
    var now = new Date();
    var age = now.getFullYear() - birth.getFullYear();
    var m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* Texte normalisé pour la recherche : minuscules, sans accents, œ → oe */
  function normText(s) {
    return String(s || '').toLowerCase().normalize('NFD')
      .replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae');
  }

  /* Garde le focus clavier à l'intérieur d'une modale (Tab / Maj+Tab) */
  function trapFocus(container, e) {
    var items = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    if (!items.length) { e.preventDefault(); return; }
    var first = items[0], last = items[items.length - 1];
    if (!container.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* Plusieurs clics rapides sur un élément → callback (easter eggs) */
  function multiClick(el, count, windowMs, cb) {
    if (!el) return;
    var times = [];
    el.addEventListener('click', function () {
      var now = Date.now();
      times.push(now);
      times = times.filter(function (t) { return now - t < windowMs; });
      if (times.length >= count) { times = []; cb(); }
    });
  }

  /* ---- ArtResolver : affiches / pochettes trouvées en ligne ----
     Appelé UNIQUEMENT si l'image locale (photos/…) est absente. Ordre final :
       1. fichier local relatif   (hors ligne, prioritaire)
       2. image officielle en ligne, résolue via une API publique sans clé
          (TVMaze, iTunes Search, Wikipédia), puis mémorisée dans localStorage
       3. dégradé CSS de secours  (hors ligne et rien en cache)
     Aucune URL n'est codée en dur : les API renvoient l'URL actuelle de l'image. */
  var ArtResolver = (function () {
    var specs = {};
    var cache = {};
    try { cache = JSON.parse(store.get('artCache', '{}')) || {}; } catch (e) { cache = {}; }

    function save() { store.set('artCache', JSON.stringify(cache)); }

    function norm(s) {
      return String(s || '').toLowerCase().normalize('NFD')
        .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
    }

    function getJSON(url) {
      if (!window.fetch) return Promise.reject(new Error('fetch indisponible'));
      var ctl = window.AbortController ? new AbortController() : null;
      var timer = ctl ? setTimeout(function () { ctl.abort(); }, 7000) : null;
      return fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) {
        if (timer) clearTimeout(timer);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }, function (err) {
        if (timer) clearTimeout(timer);
        throw err;
      });
    }

    function bigArtwork(u) {              // iTunes : 100x100bb → 600x600bb
      return u ? u.replace(/\/\d+x\d+bb\.(jpg|png)$/, '/600x600bb.$1') : null;
    }

    function runStep(step) {
      if (step.url) return Promise.resolve(step.url);

      if (step.tv) {                      // séries : TVMaze
        return getJSON('https://api.tvmaze.com/singlesearch/shows?q=' + encodeURIComponent(step.tv))
          .then(function (j) { return (j && j.image && (j.image.original || j.image.medium)) || null; });
      }

      if (step.album) {                   // pochettes : iTunes Search
        var term = step.artist + ' ' + step.album;
        return getJSON('https://itunes.apple.com/search?media=music&entity=album&limit=8&country=fr&term=' + encodeURIComponent(term))
          .then(function (j) {
            var hit = ((j && j.results) || []).filter(function (r) {
              return norm(r.artistName).indexOf(norm(step.artist)) !== -1 &&
                     norm(r.collectionName).indexOf(norm(step.album)) === 0;
            })[0];
            return hit ? bigArtwork(hit.artworkUrl100) : null;
          });
      }

      if (step.movie) {                   // films : iTunes Search
        return getJSON('https://itunes.apple.com/search?media=movie&entity=movie&limit=8&country=fr&term=' + encodeURIComponent(step.movie))
          .then(function (j) {
            var hit = ((j && j.results) || []).filter(function (r) {
              var year = r.releaseDate ? new Date(r.releaseDate).getFullYear() : 0;
              return norm(r.trackName).indexOf(norm(step.movie)) === 0 && year >= (step.minYear || 0);
            })[0];
            return hit ? bigArtwork(hit.artworkUrl100) : null;
          });
      }

      if (step.wiki) {                    // image de l'infobox Wikipédia
        return getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=600' +
          '&redirects=1&format=json&origin=*&titles=' + encodeURIComponent(step.wiki))
          .then(function (j) {
            var pages = j && j.query && j.query.pages;
            var k = pages && Object.keys(pages)[0];
            var p = k && pages[k];
            return (p && p.thumbnail && p.thumbnail.source) || null;
          });
      }
      return Promise.resolve(null);
    }

    return {
      register: function (key, steps) { if (steps && steps.length) specs[key] = steps; },
      has: function (key) { return !!specs[key]; },
      forget: function (key) { delete cache[key]; save(); },
      resolve: function (key) {
        if (cache[key]) return Promise.resolve(cache[key]);
        var steps = specs[key] || [];
        return steps.reduce(function (chain, step) {
          return chain.then(function (found) {
            if (found) return found;
            return runStep(step).catch(function () { return null; });
          });
        }, Promise.resolve(null)).then(function (url) {
          if (url) { cache[key] = url; save(); }
          return url;
        });
      }
    };
  })();

  /* ---- Bloc média avec fallback ----
     Le dégradé + icône + chemin attendu reste visible tant que l'image n'est
     pas chargée (ou si elle est absente). Voir style.css section 6.
     artKey (optionnel) : clé ArtResolver, utilisée si le fichier local est absent. */
  function mediaBox(src, label, iconName, alt, artKey) {
    return '<div class="media"' + (artKey ? ' data-art-key="' + esc(artKey) + '"' : '') + '>' +
      '<div class="media-fallback" aria-hidden="true">' + icon(iconName || 'image') +
      '<span>' + esc(label) + '</span><small>' + esc(src) + '</small></div>' +
      '<img src="' + esc(src) + '" alt="' + esc(alt || label) + '" decoding="async" draggable="false" referrerpolicy="no-referrer">' +
      '</div>';
  }

  function markMissing(m) { m.classList.add('is-missing'); m.classList.remove('is-loaded'); }

  /* Les événements load/error ne remontent pas : on écoute en phase de capture.
     Échec du fichier local + clé ArtResolver → on tente l'image en ligne (une seule fois). */
  function initMediaFallback() {
    document.addEventListener('load', function (e) {
      if (e.target && e.target.tagName === 'IMG') {
        var m = e.target.closest('.media');
        if (m) { m.classList.add('is-loaded'); m.classList.remove('is-missing'); }
      }
    }, true);

    document.addEventListener('error', function (e) {
      var img = e.target;
      if (!img || img.tagName !== 'IMG') return;
      var m = img.closest('.media');
      if (!m) return;
      var key = m.getAttribute('data-art-key');

      if (key && ArtResolver.has(key) && !m.hasAttribute('data-art-tried')) {
        m.setAttribute('data-art-tried', '1');
        ArtResolver.resolve(key).then(function (url) {
          if (url) { m.setAttribute('data-art-remote', '1'); img.src = url; }
          else markMissing(m);
        });
        return;
      }
      if (key && m.hasAttribute('data-art-remote')) ArtResolver.forget(key); // URL périmée : on re-résoudra
      markMissing(m);
    }, true);
  }

  /* Rattrape les images déjà terminées (cache) avant l'écoute des événements */
  function checkImages(root) {
    $$('.media img', root).forEach(function (img) {
      var m = img.closest('.media');
      if (!m || !img.complete) return;
      if (img.naturalWidth > 0) { m.classList.add('is-loaded'); return; }
      // Échec local avec résolution en ligne possible : le gestionnaire d'erreur s'en charge
      if (m.getAttribute('data-art-key') && !m.hasAttribute('data-art-tried')) return;
      m.classList.add('is-missing');
    });
  }


  /* ===================================================================
     4. THÈMES (variables CSS via <html data-theme="...">)
     =================================================================== */
  function initThemes() {
    var root = document.documentElement;
    var toggle = $('#theme-toggle');
    var menu = $('#theme-menu');
    var label = $('#theme-current');
    var wrap = $('#theme-switch');

    menu.innerHTML = CONFIG.themes.map(function (t) {
      return '<li role="none"><button type="button" role="menuitemradio" aria-checked="false" data-theme-id="' + t.id + '">' +
        '<span class="swatch" style="background:linear-gradient(135deg,' + t.swatch[0] + ' 50%,' + t.swatch[1] + ' 50%)"></span>' +
        '<span>' + esc(t.name) + '</span></button></li>';
    }).join('');

    function apply(id) {
      var theme = CONFIG.themes.filter(function (t) { return t.id === id; })[0] || CONFIG.themes[0];
      root.setAttribute('data-theme', theme.id);
      store.set('theme', theme.id);
      label.textContent = theme.name;
      $$('button', menu).forEach(function (b) {
        b.setAttribute('aria-checked', String(b.getAttribute('data-theme-id') === theme.id));
      });
    }

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-theme-id]');
      if (!b) return;
      apply(b.getAttribute('data-theme-id'));
      setOpen(false);
      toggle.focus();
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });

    apply(store.get('theme', root.getAttribute('data-theme') || 'polaroid'));
  }


  /* ===================================================================
     5. ONGLETS (Single Page Application)
     =================================================================== */
  var currentTab = null;

  function initTabs() {
    var tabs = $$('[role="tab"]');
    var panels = $$('.panel');

    function fromHash() {
      var h = location.hash.replace('#', '');
      return CONFIG.tabs.indexOf(h) !== -1 ? h : null;
    }

    function show(id, initial) {
      if (id === currentTab) return;
      currentTab = id;
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && !initial && t.scrollIntoView) {
          try { t.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) { /* ignoré */ }
        }
      });
      panels.forEach(function (p) {
        var on = p.getAttribute('data-panel') === id;
        p.hidden = !on;
        p.classList.toggle('is-active', on);
      });
      store.set('tab', id);
      if (!initial) window.scrollTo(0, 0);
    }

    function go(id) {
      show(id, false);
      if (location.hash !== '#' + id) location.hash = id;
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () { go(t.getAttribute('data-tab')); });
    });

    $('.tabs').addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i === -1) return;
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault();
      tabs[n].focus();
      go(tabs[n].getAttribute('data-tab'));
    });

    /* Liens internes : logo, boutons du hero… */
    document.addEventListener('click', function (e) {
      var l = e.target.closest('[data-tab-link]');
      if (!l) return;
      e.preventDefault();
      go(l.getAttribute('data-tab-link'));
    });

    window.addEventListener('hashchange', function () {
      var id = fromHash();
      if (id) show(id, false);
    });

    var saved = store.get('tab', 'accueil');
    show(fromHash() || (CONFIG.tabs.indexOf(saved) !== -1 ? saved : 'accueil'), true);
  }


  /* ===================================================================
     6. COMPTEUR EN DIRECT (header)
     « X jours, Y heures, Z minutes, S secondes de nous »
     =================================================================== */
  function initCounter() {
    var el = {
      prefix: $('#cd-prefix'), suffix: $('#cd-suffix'),
      d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s'),
      dl: $('#cd-d-l'), hl: $('#cd-h-l'), ml: $('#cd-m-l'), sl: $('#cd-s-l')
    };
    var start = CONFIG.coupleStart.getTime();

    function tick() {
      var diff = Date.now() - start;
      var future = diff < 0;               // avant le 21/09/2026 : compte à rebours
      var total = Math.floor(Math.abs(diff) / 1000);
      var d = Math.floor(total / 86400);
      var h = Math.floor((total % 86400) / 3600);
      var m = Math.floor((total % 3600) / 60);
      var s = total % 60;

      el.d.textContent = d; el.h.textContent = h; el.m.textContent = m; el.s.textContent = s;
      el.dl.textContent = plural(d, 'jour', 'jours');
      el.hl.textContent = plural(h, 'heure', 'heures');
      el.ml.textContent = plural(m, 'minute', 'minutes');
      el.sl.textContent = plural(s, 'seconde', 'secondes');
      el.prefix.textContent = future ? 'Dans' : '';
      el.suffix.textContent = future ? 'avant le grand jour' : 'de nous';
    }

    function loop() {
      tick();
      setTimeout(loop, 1000 - (Date.now() % 1000)); // recalé sur la seconde
    }
    loop();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });
  }


  /* ===================================================================
     7. ACCUEIL : âges, cœurs flottants, prochaine étape
     =================================================================== */
  function spawnHearts(x, y, count) {
    var n = REDUCED ? 3 : (count || 9);
    for (var i = 0; i < n; i++) {
      var h = document.createElement('span');
      h.className = 'float-heart';
      h.innerHTML = icon('heart', 'ico-fill');
      h.style.left = (x - 11 + (Math.random() * 40 - 20)) + 'px';
      h.style.top = (y - 11) + 'px';
      h.style.setProperty('--dx', (Math.random() * 120 - 60).toFixed(0) + 'px');
      h.style.setProperty('--rot', (Math.random() * 60 - 30).toFixed(0) + 'deg');
      h.style.setProperty('--sz', (16 + Math.random() * 18).toFixed(0) + 'px');
      h.style.setProperty('--hd', (Math.random() * 0.35).toFixed(2) + 's');
      h.addEventListener('animationend', function (ev) { ev.target.remove(); });
      document.body.appendChild(h);
    }
  }

  function initHome() {
    $$('[data-age]').forEach(function (n) {
      var p = n.getAttribute('data-age').split('-');
      n.textContent = ageFrom(new Date(+p[0], +p[1] - 1, +p[2]));
    });

    var title = $('#hero-title');
    title.addEventListener('click', function (e) { spawnHearts(e.clientX, e.clientY, 10); });

    // Prochaine étape de la roadmap
    var next = DATA.roadmap
      .filter(function (r) { return daysUntil(r.when) >= 0; })
      .sort(function (a, b) { return a.when - b.when; })[0];
    var box = $('#next-date');
    if (next) {
      box.innerHTML = 'Prochaine étape : <strong>' + esc(next.title) + '</strong> · ' +
        (next.monthOnly ? 'en ' + esc(next.badge.toLowerCase()) : esc(daysLabel(daysUntil(next.when)).toLowerCase()));
      box.hidden = false;
    }
    $('#footer-year').textContent = new Date().getFullYear();
  }


  /* ===================================================================
     8. TIMELINE : polaroids inclinés, redressés au survol, flip 3D au clic
     =================================================================== */
  var TILTS = [-3, 2.2, -1.6, 3, -2.4, 1.8, -2.8, 2.5];

  function polaroidItem(e, i, future) {
    var badge = '';
    if (future) {
      badge = '<span class="badge">' + esc(e.badge || daysLabel(daysUntil(e.when))) + '</span>';
    }
    return '<li class="tl-item' + (future ? ' future' : '') + '" style="--tilt:' + TILTS[i % TILTS.length] + 'deg">' +
      '<span class="tl-dot" aria-hidden="true"></span>' +
      '<div class="polaroid" role="button" tabindex="0" aria-pressed="false" ' +
        'aria-label="' + esc(e.title) + ', ' + esc(e.date) + '. Retourner le polaroid pour lire la note.">' +
        '<div class="polaroid-inner">' +
          '<div class="face face-front">' + badge +
            mediaBox(e.img, future ? 'À venir' : e.title, future ? 'star' : 'image', e.title + ' (' + e.date + ')') +
            '<div class="caption"><span class="cap-date">' + esc(e.date) + '</span>' +
            '<strong class="cap-title">' + esc(e.title) + '</strong></div>' +
          '</div>' +
          '<div class="face face-back">' +
            '<span class="back-date">' + esc(e.date) + '</span>' +
            '<h4 class="back-title">' + esc(e.title) + '</h4>' +
            '<p class="back-note">' + esc(e.note) + '</p>' +
            '<span class="back-hint">' + icon('flip') + ' retourner</span>' +
          '</div>' +
        '</div>' +
      '</div></li>';
  }

  function initTimeline() {
    var list = $('#timeline-list');
    var road = $('#roadmap-list');
    list.innerHTML = DATA.timeline.map(function (e, i) { return polaroidItem(e, i, false); }).join('');
    road.innerHTML = DATA.roadmap.map(function (e, i) { return polaroidItem(e, i + 3, true); }).join('');

    function flip(card) {
      var on = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(on));
    }
    [list, road].forEach(function (ol) {
      ol.addEventListener('click', function (ev) {
        var c = ev.target.closest('.polaroid');
        if (c) flip(c);
      });
      ol.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        var c = ev.target.closest('.polaroid');
        if (!c) return;
        ev.preventDefault();
        flip(c);
      });
    });

    // Apparition au défilement
    var items = $$('.tl-item');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      items.forEach(function (it) { io.observe(it); });
    } else {
      items.forEach(function (it) { it.classList.add('in-view'); });
    }
    checkImages(list); checkImages(road);
  }


  /* ===================================================================
     9. BEREAL : grande photo + vignette (caméra frontale), inversion au clic
     recto = grande photo · verso = vignette en haut à gauche
     =================================================================== */
  function initBereal() {
    var grid = $('#bereal-grid');
    grid.innerHTML = DATA.bereal.map(function (b) {
      var n = pad(b.id);
      var recto = 'photos/bereal/bereal_' + n + '_recto.jpg';
      var verso = 'photos/bereal/bereal_' + n + '_verso.jpg';
      var late = b.late
        ? '<span class="br-late">' + esc(b.late) + '</span>'
        : '<span class="br-late on-time">À l\'heure</span>';
      return '<article class="bereal-card">' +
        '<header class="br-head">' +
          '<div class="br-avatar" aria-hidden="true">' + esc(b.author.charAt(0)) + '</div>' +
          '<div><div class="br-name">' + esc(b.author) + '</div>' +
          '<div class="br-meta">' + esc(b.place) + ' · ' + esc(b.time) + '</div></div>' + late +
        '</header>' +
        '<div class="br-photo" role="button" tabindex="0" aria-pressed="false" data-swapped="false" ' +
          'aria-label="BeReal du ' + esc(formatISODate(b.date)) + ' : inverser la grande photo et la vignette">' +
          '<div class="br-layer layer-recto">' + mediaBox(recto, 'Photo principale', 'camera', 'BeReal ' + n + ', photo principale') + '</div>' +
          '<div class="br-layer layer-verso">' + mediaBox(verso, 'Caméra frontale', 'camera', 'BeReal ' + n + ', caméra frontale') + '</div>' +
          '<span class="br-hint">' + icon('swap') + '<span>Toucher pour inverser</span></span>' +
        '</div>' +
        '<div class="br-foot">' +
          '<p class="br-caption"><strong>' + esc(b.author) + '</strong> ' + esc(b.caption) + '</p>' +
          '<div class="br-meta2"><span class="br-react">' + icon('heart', 'ico-fill') + ' ' + b.reactions + '</span>' +
          '<span>' + esc(formatISODate(b.date)) + '</span></div>' +
          '<p class="br-comment"><strong>' + esc(b.comment.by) + '</strong> ' + esc(b.comment.text) + '</p>' +
        '</div>' +
      '</article>';
    }).join('');

    function swap(photo) {
      var on = photo.getAttribute('data-swapped') !== 'true';
      photo.setAttribute('data-swapped', String(on));
      photo.setAttribute('aria-pressed', String(on));
    }
    grid.addEventListener('click', function (e) {
      var p = e.target.closest('.br-photo');
      if (p) swap(p);
    });
    grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var p = e.target.closest('.br-photo');
      if (!p) return;
      e.preventDefault();
      swap(p);
    });
    checkImages(grid);
  }


  /* ===================================================================
     10. CARTE SVG : tooltips (survol / focus) + modale (clic / Entrée)
     =================================================================== */
  function initMap() {
    var wrap = $('#map-wrap');
    var tip = $('#map-tip');
    var pins = $$('.map-pin');
    var modal = $('#modal');
    var lastFocus = null;

    function showTip(pin) {
      var p = PLACES[pin.getAttribute('data-place')];
      if (!p) return;
      tip.innerHTML = '<strong>' + esc(p.name) + '</strong><span>' + esc(p.short) + '</span>';
      var dot = pin.querySelector('.pin-dot').getBoundingClientRect();
      var w = wrap.getBoundingClientRect();
      tip.style.left = (dot.left + dot.width / 2 - w.left) + 'px';
      tip.style.top = (dot.top - w.top) + 'px';
      tip.classList.add('is-visible');
      tip.setAttribute('aria-hidden', 'false');
    }
    function hideTip() {
      tip.classList.remove('is-visible');
      tip.setAttribute('aria-hidden', 'true');
    }

    function openPlace(id, trigger) {
      var p = PLACES[id];
      if (!p) return;
      hideTip();
      lastFocus = trigger || document.activeElement;
      $('#modal-media').innerHTML = mediaBox(p.img, p.name, 'pin', 'Photo : ' + p.name);
      $('#modal-tag').textContent = p.tag;
      $('#modal-title').textContent = p.name;
      $('#modal-text').textContent = p.text;
      $('#modal-date').textContent = p.date;
      modal.hidden = false;
      document.body.classList.add('modal-open');
      checkImages(modal);
      $('.modal-close', modal).focus();
    }
    function closeModal() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    pins.forEach(function (pin) {
      pin.addEventListener('mouseenter', function () { showTip(pin); });
      pin.addEventListener('mouseleave', hideTip);
      pin.addEventListener('focus', function () { showTip(pin); });
      pin.addEventListener('blur', hideTip);
      pin.addEventListener('click', function () { openPlace(pin.getAttribute('data-place'), pin); });
      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPlace(pin.getAttribute('data-place'), pin);
        }
      });
    });

    // Légende cliquable (accessible clavier / tactile)
    var legend = $('#map-legend');
    legend.innerHTML = Object.keys(PLACES).map(function (id) {
      var p = PLACES[id];
      return '<li><button type="button" data-place="' + id + '">' + icon('pin') + ' ' + esc(p.name) + ' · ' + esc(p.tag) + '</button></li>';
    }).join('');
    legend.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-place]');
      if (b) openPlace(b.getAttribute('data-place'), b);
    });

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'Tab') { e.preventDefault(); $('.modal-close', modal).focus(); } // focus piégé dans la modale
    });
  }


  /* ===================================================================
     11. CINÉMA : tickets + statut cliquable (À voir ensemble / En cours / Vu)
     Les statuts sont mémorisés dans localStorage.
     =================================================================== */
  var STATUSES = [
    { id: 'todo',     label: 'À voir ensemble' },
    { id: 'progress', label: 'En cours' },
    { id: 'seen',     label: 'Vu' }
  ];

  function initCinema() {
    var list = $('#cinema-list');
    var summary = $('#cinema-summary');
    var saved = {};
    try { saved = JSON.parse(store.get('cinema', '{}')) || {}; } catch (e) { saved = {}; }

    function statusOf(item) { return saved[item.id] || item.status; }
    function labelOf(id) { return STATUSES.filter(function (s) { return s.id === id; })[0].label; }

    function updateSummary() {
      var c = { seen: 0, progress: 0, todo: 0 };
      DATA.cinema.forEach(function (it) { c[statusOf(it)]++; });
      summary.textContent = c.seen + ' ' + plural(c.seen, 'vu', 'vus') + ' · ' +
        c.progress + ' en cours · ' + c.todo + ' à voir ensemble';
    }

    list.innerHTML = DATA.cinema.map(function (it, i) {
      var st = statusOf(it);
      return '<article class="ticket" data-id="' + it.id + '">' +
        '<div class="ticket-poster">' + mediaBox(it.img, it.title, 'film', 'Affiche : ' + it.title, 'cinema:' + it.id) + '</div>' +
        '<div class="ticket-body">' +
          '<span class="ticket-type">' + esc(it.type) + '</span>' +
          '<h3 class="ticket-title">' + esc(it.title) + '</h3>' +
          '<p class="ticket-blurb">' + esc(it.blurb) + '</p>' +
          '<div class="ticket-foot">' +
            '<button type="button" class="status" data-status="' + st + '" aria-label="Statut de ' + esc(it.title) + ' : ' + labelOf(st) + '. Cliquer pour changer.">' +
              esc(labelOf(st)) + '</button>' +
            '<span class="ticket-barcode" aria-hidden="true"></span>' +
          '</div>' +
          '<span class="ticket-no">N° ' + pad(i + 1) + '</span>' +
        '</div></article>';
    }).join('');

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.status');
      if (!btn) return;
      var id = btn.closest('.ticket').getAttribute('data-id');
      var item = DATA.cinema.filter(function (x) { return x.id === id; })[0];
      var idx = STATUSES.map(function (s) { return s.id; }).indexOf(statusOf(item));
      var next = STATUSES[(idx + 1) % STATUSES.length];
      saved[id] = next.id;
      store.set('cinema', JSON.stringify(saved));
      btn.setAttribute('data-status', next.id);
      btn.textContent = next.label;
      btn.setAttribute('aria-label', 'Statut de ' + item.title + ' : ' + next.label + '. Cliquer pour changer.');
      updateSummary();
    });

    updateSummary();
    checkImages(list);
  }


  /* ===================================================================
     12. LECTEUR VINYLE + CARTES ARTISTES
     - Si audio/xxx.mp3 existe : lecture réelle.
     - Sinon : mode démo (progression simulée), sans erreur visible.
     =================================================================== */
  function initPlayer() {
    var tracks = DATA.artists;
    var grid = $('#artist-grid');
    var player = $('#player');

    grid.innerHTML = tracks.map(function (a, i) {
      return '<article class="artist-card" data-index="' + i + '">' +
        mediaBox(a.img, a.name, 'music', 'Pochette : ' + a.name, 'artist:' + a.id) +
        '<div class="artist-info">' +
          '<h3 class="artist-name">' + esc(a.name) + '</h3>' +
          '<p class="artist-vibe">' + esc(a.vibe) + '</p>' +
          '<div class="artist-actions">' +
            '<button type="button" class="btn btn-primary btn-small" data-listen="' + i + '">' + icon('play') + ' Écouter</button>' +
            '<a class="btn btn-ghost btn-small" href="' + esc(a.spotify) + '" target="_blank" rel="noopener noreferrer">Spotify ' + icon('external') + '</a>' +
          '</div>' +
        '</div></article>';
    }).join('');
    checkImages(grid);

    var el = {
      mode: $('#player-mode'), title: $('#player-title'), artist: $('#player-artist'),
      initial: $('#vinyl-initial'), bar: $('#progress-bar'), progress: $('#progress'),
      cur: $('#t-cur'), dur: $('#t-dur'), play: $('#btn-play'), playIco: $('#btn-play-ico'),
      prev: $('#btn-prev'), next: $('#btn-next')
    };

    var audio = new Audio();
    audio.preload = 'none';

    var idx = 0;
    var playing = false;
    var mode = 'sim';           // 'sim' (démo) ou 'audio' (fichier réel)
    var elapsed = 0;
    var duration = tracks[0].dur;
    var timer = null;

    function fmt(s) {
      s = Math.max(0, Math.floor(s));
      return Math.floor(s / 60) + ':' + pad(s % 60);
    }

    function renderProgress() {
      var ratio = duration > 0 ? Math.min(1, elapsed / duration) : 0;
      el.bar.style.width = (ratio * 100).toFixed(2) + '%';
      el.progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
      el.cur.textContent = fmt(elapsed);
      el.dur.textContent = fmt(duration);
    }

    function renderMode() {
      el.mode.textContent = mode === 'audio'
        ? 'Lecture audio'
        : 'Mode démo · aucun fichier audio trouvé';
    }

    function setPlayingUI(on) {
      player.classList.toggle('is-playing', on);
      el.play.setAttribute('aria-pressed', String(on));
      el.play.setAttribute('aria-label', on ? 'Pause' : 'Lecture');
      el.playIco.innerHTML = '<use href="#i-' + (on ? 'pause' : 'play') + '"></use>';
    }

    function stopSim() { if (timer) { clearInterval(timer); timer = null; } }
    function startSim() {
      stopSim();
      mode = 'sim';
      renderMode();
      timer = setInterval(function () {
        elapsed += 0.25;
        if (elapsed >= duration) { goTo(idx + 1, true); return; }
        renderProgress();
      }, 250);
    }

    function highlight() {
      $$('.artist-card', grid).forEach(function (c) {
        c.classList.toggle('is-current', +c.getAttribute('data-index') === idx);
      });
    }

    function goTo(i, autoplay) {
      idx = (i + tracks.length) % tracks.length;
      var t = tracks[idx];
      stopSim();
      audio.pause();
      elapsed = 0;
      duration = t.dur;
      mode = 'sim';
      audio.src = t.audio;     // chemin relatif
      el.title.textContent = t.track;
      el.artist.textContent = t.name;
      el.initial.textContent = t.name.charAt(0);
      renderMode(); renderProgress(); highlight();
      if (autoplay) play();
    }

    function play() {
      playing = true;
      setPlayingUI(true);
      var p;
      try { p = audio.play(); } catch (e) { p = null; }
      if (p && typeof p.then === 'function') {
        p.then(function () {
          if (!playing) return;
          mode = 'audio'; stopSim(); renderMode();
        }).catch(function (err) {
          if (!playing || (err && err.name === 'AbortError')) return;
          startSim();          // fichier absent / format non lisible : mode démo
        });
      } else {
        startSim();
      }
    }

    function pause() {
      playing = false;
      setPlayingUI(false);
      stopSim();
      audio.pause();
    }

    audio.addEventListener('loadedmetadata', function () {
      if (isFinite(audio.duration) && audio.duration > 0) { duration = audio.duration; renderProgress(); }
    });
    audio.addEventListener('timeupdate', function () {
      if (mode === 'audio') { elapsed = audio.currentTime; renderProgress(); }
    });
    audio.addEventListener('ended', function () { goTo(idx + 1, true); });
    audio.addEventListener('error', function () { if (playing && mode !== 'sim') startSim(); else if (playing && !timer) startSim(); });

    el.play.addEventListener('click', function () { playing ? pause() : play(); });
    el.next.addEventListener('click', function () { goTo(idx + 1, playing); });
    el.prev.addEventListener('click', function () { goTo(elapsed > 3 ? idx : idx - 1, playing); });

    function seek(ratio) {
      ratio = Math.max(0, Math.min(1, ratio));
      elapsed = ratio * duration;
      if (mode === 'audio') { try { audio.currentTime = elapsed; } catch (e) { /* ignoré */ } }
      renderProgress();
    }
    el.progress.addEventListener('click', function (e) {
      var r = el.progress.getBoundingClientRect();
      seek((e.clientX - r.left) / r.width);
    });
    el.progress.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); seek((elapsed + 5) / duration); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); seek((elapsed - 5) / duration); }
    });

    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-listen]');
      if (!b) return;
      var i = +b.getAttribute('data-listen');
      if (i === idx && playing) { pause(); return; }
      goTo(i, true);
      player.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
    });

    goTo(0, false);
    setPlayingUI(false);
  }


  /* ===================================================================
     13. CONFETTIS (canvas natif)
     =================================================================== */
  var Confetti = (function () {
    var canvas = $('#confetti');
    var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    var parts = [];
    var raf = null;
    var w = 0, h = 0;

    function resize() {
      if (!ctx) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function palette() {
      var cs = getComputedStyle(document.documentElement);
      var a = cs.getPropertyValue('--accent').trim();
      var b = cs.getPropertyValue('--accent-2').trim();
      return [a, b, '#ffd470', '#ff8fa3', '#8fd3ff', '#b8e986', '#ffffff'].filter(Boolean);
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.vy += 0.16; p.vx *= 0.992; p.vy *= 0.992;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
        if (p.y > h + 24 || p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life / 30);
        ctx.fillStyle = p.color;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6); }
        ctx.restore();
      }
      if (parts.length) raf = requestAnimationFrame(loop);
      else { raf = null; ctx.clearRect(0, 0, w, h); }
    }

    function burst(x, y, count) {
      if (!ctx) return;
      var n = REDUCED ? Math.round((count || 90) / 4) : (count || 90);
      var colors = palette();
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var s = 4 + Math.random() * 9;
        parts.push({
          x: x, y: y,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5,
          size: 6 + Math.random() * 7,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35,
          life: 90 + Math.floor(Math.random() * 70),
          round: Math.random() < 0.3
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    return { burst: burst };
  })();


  /* ===================================================================
     14. QUIZ DE NOUS DEUX (4 questions, confettis sur bonne réponse)
     =================================================================== */
  function initQuiz() {
    var root = $('#quiz-root');
    var state = { i: 0, score: 0, locked: false };

    function renderQuestion() {
      var q = QUIZ[state.i];
      var opts = shuffle(q.options.map(function (text, idx) { return { text: text, ok: idx === q.answer }; }));
      state.locked = false;
      root.innerHTML =
        '<div class="quiz-top"><span class="quiz-count">Question ' + (state.i + 1) + ' / ' + QUIZ.length + '</span>' +
        '<div class="quiz-dots" aria-hidden="true">' + QUIZ.map(function (_, k) {
          return '<span class="dot ' + (k < state.i ? 'done' : k === state.i ? 'now' : '') + '"></span>';
        }).join('') + '</div></div>' +
        '<h3 class="quiz-q">' + esc(q.q) + '</h3>' +
        '<div class="quiz-options">' + opts.map(function (o, k) {
          return '<button type="button" class="quiz-opt" data-ok="' + o.ok + '">' +
            '<span class="letter">' + 'ABCD'.charAt(k) + '</span><span>' + esc(o.text) + '</span></button>';
        }).join('') + '</div>' +
        '<p class="quiz-feedback" id="quiz-feedback" aria-live="polite"></p>' +
        '<div class="quiz-actions"><button type="button" class="btn btn-primary" id="quiz-next" hidden>' +
          (state.i === QUIZ.length - 1 ? 'Voir le résultat' : 'Question suivante') + '</button></div>';
    }

    function renderResult() {
      var best = +store.get('quizBest', 0);
      if (state.score > best) { best = state.score; store.set('quizBest', String(best)); }
      var msg, sub;
      if (state.score === QUIZ.length) { msg = 'Sans faute !'; sub = "Vous connaissez votre histoire par cœur."; }
      else if (state.score >= 3) { msg = 'Presque parfait'; sub = "Un tout petit trou de mémoire, rien de grave."; }
      else if (state.score >= 2) { msg = 'Pas mal du tout'; sub = "Un petit tour dans la timeline pour réviser ?"; }
      else { msg = 'À revoir ensemble'; sub = "Direction la timeline pour se rafraîchir la mémoire."; }

      root.innerHTML = '<div class="quiz-result">' +
        '<div class="quiz-score">' + state.score + '/' + QUIZ.length + '</div>' +
        '<h3>' + esc(msg) + '</h3>' +
        '<p>' + esc(sub) + ' Meilleur score : ' + best + '/' + QUIZ.length + '.</p>' +
        '<div class="quiz-actions" style="justify-content:center">' +
          '<button type="button" class="btn btn-primary" id="quiz-replay">Rejouer</button>' +
          '<button type="button" class="btn btn-ghost" data-tab-link="timeline">Revoir la timeline</button>' +
        '</div></div>';

      if (state.score >= 3) {
        var W = window.innerWidth, H = window.innerHeight;
        Confetti.burst(W * 0.25, H * 0.4, 140);
        Confetti.burst(W * 0.75, H * 0.4, 140);
        if (state.score === QUIZ.length) setTimeout(function () { Confetti.burst(W * 0.5, H * 0.3, 180); }, 350);
      }
    }

    root.addEventListener('click', function (e) {
      var opt = e.target.closest('.quiz-opt');
      if (opt && !state.locked) {
        state.locked = true;
        var ok = opt.getAttribute('data-ok') === 'true';
        var q = QUIZ[state.i];
        $$('.quiz-opt', root).forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute('data-ok') === 'true') b.classList.add('is-correct');
        });
        var fb = $('#quiz-feedback', root);
        if (ok) {
          state.score++;
          var r = opt.getBoundingClientRect();
          Confetti.burst(r.left + r.width / 2, r.top + r.height / 2, 90);
          fb.textContent = 'Bravo ! ' + q.explain;
        } else {
          opt.classList.add('is-wrong');
          fb.textContent = 'Raté… ' + q.explain;
        }
        var nx = $('#quiz-next', root);
        nx.hidden = false;
        nx.focus();
        return;
      }
      if (e.target.closest('#quiz-next')) {
        state.i++;
        if (state.i >= QUIZ.length) renderResult(); else renderQuestion();
        return;
      }
      if (e.target.closest('#quiz-replay')) {
        state.i = 0; state.score = 0;
        renderQuestion();
      }
    });

    renderQuestion();
  }


  /* ===================================================================
     15. TOASTS : petites notifications en bas de l'écran
     Toast.show(titre, texte, { icon: 'sparkle', duration: 5000 })
     =================================================================== */
  var Toast = (function () {
    function show(title, text, opts) {
      opts = opts || {};
      var box = $('#toast-stack');
      if (!box) return;
      while (box.children.length >= 3) box.removeChild(box.firstChild);

      var ico = opts.icon || 'sparkle';
      var t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = '<span class="toast-ico">' + icon(ico, ico === 'heart' ? 'ico-fill' : '') + '</span>' +
        '<div class="toast-body"><strong>' + esc(title) + '</strong>' + (text ? '<span>' + esc(text) + '</span>' : '') + '</div>';
      box.appendChild(t);

      function close() {
        if (t.classList.contains('is-out')) return;
        t.classList.add('is-out');
        setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 450);
      }
      t.addEventListener('click', close);
      requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('is-in'); }); });
      setTimeout(close, opts.duration || 5200);
    }
    return { show: show };
  })();


  /* ===================================================================
     16. ROUE DES DATES
     - Filtres : catégories (multi) + budget maximum, mémorisés.
     - 12 idées tirées au hasard dans le « chapeau » filtré.
     - Animation JS (requestAnimationFrame) + tic sonore WebAudio (coupable).
     - « On le fait ! » ajoute l'idée au carnet (localStorage).
     =================================================================== */
  var BUDGETS = [
    { v: 3, label: 'Tous budgets' },
    { v: 0, label: 'Gratuit' },
    { v: 1, label: 'Petit budget' },
    { v: 2, label: "Jusqu'à €€" }
  ];

  function budgetLabel(b) { return b === 0 ? 'Gratuit' : new Array(b + 1).join('€'); }

  function initWheel() {
    var stage = $('#wheel');
    var disc = $('#wheel-disc');
    var svg = $('#wheel-svg');
    var pointer = $('#wheel-pointer');
    var hub = $('#wheel-hub');
    var btnSpin = $('#wheel-spin');
    var btnShuffle = $('#wheel-shuffle');
    var btnSound = $('#wheel-sound');
    var catBox = $('#wheel-cats');
    var budgetBox = $('#wheel-budget');
    var poolInfo = $('#wheel-pool');
    var result = $('#wheel-result');
    var histList = $('#wheel-history');
    var histCount = $('#wheel-history-count');

    var SLOTS = 12;
    var R = 190;
    var cats = Object.keys(DATA.dateCategories);
    var activeCats = readJSON('wheelCats', cats.slice()).filter(function (c) { return cats.indexOf(c) !== -1; });
    var maxBudget = +store.get('wheelBudget', '3');
    if (!(maxBudget >= 0 && maxBudget <= 3)) maxBudget = 3;
    var sound = store.get('wheelSound', '1') === '1';
    var history = readJSON('dates', []);
    if (!Array.isArray(history)) history = [];

    var segs = [];
    var rotation = 0;
    var spinning = false;
    var current = null;
    var spins = 0;
    var actx = null;

    function f(n) { return n.toFixed(2); }
    function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

    function pool() {
      return DATA.dateIdeas.filter(function (it) {
        return activeCats.indexOf(it.cat) !== -1 && it.budget <= maxBudget;
      });
    }

    /* ---- Filtres ---- */
    function renderFilters() {
      catBox.innerHTML = cats.map(function (c) {
        var n = DATA.dateIdeas.filter(function (it) { return it.cat === c; }).length;
        return '<button type="button" class="chip" data-wcat="' + c + '" aria-pressed="' + (activeCats.indexOf(c) !== -1) + '">' +
          esc(DATA.dateCategories[c]) + ' <small>' + n + '</small></button>';
      }).join('');
      budgetBox.innerHTML = BUDGETS.map(function (b) {
        return '<button type="button" class="chip" data-wbudget="' + b.v + '" aria-pressed="' + (maxBudget === b.v) + '">' + esc(b.label) + '</button>';
      }).join('');
    }

    catBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-wcat]');
      if (!b || spinning) return;
      var c = b.getAttribute('data-wcat');
      var i = activeCats.indexOf(c);
      if (i === -1) activeCats.push(c); else activeCats.splice(i, 1);
      store.set('wheelCats', JSON.stringify(activeCats));
      renderFilters();
      build();
    });
    budgetBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-wbudget]');
      if (!b || spinning) return;
      maxBudget = +b.getAttribute('data-wbudget');
      store.set('wheelBudget', String(maxBudget));
      renderFilters();
      build();
    });

    /* ---- Dessin de la roue (SVG, couleurs = variables CSS du thème) ---- */
    function draw() {
      var n = segs.length;
      var out = '';
      if (!n) {
        out = '<circle r="' + R + '" class="wheel-empty"/>' +
          '<text class="wheel-empty-text" text-anchor="middle" y="-6">Aucune idée</text>' +
          '<text class="wheel-empty-text small" text-anchor="middle" y="18">avec ces filtres</text>';
      } else {
        var seg = 360 / n;
        segs.forEach(function (it, i) {
          var c = i % 3;
          if (n % 3 === 1 && i === n - 1) c = 3;   // évite deux parts voisines de même couleur
          var a0 = (i * seg - seg / 2) * Math.PI / 180;
          var a1 = (i * seg + seg / 2) * Math.PI / 180;
          var shape = n === 1
            ? '<circle r="' + R + '"/>'
            : '<path d="M0 0L' + f(R * Math.sin(a0)) + ' ' + f(-R * Math.cos(a0)) +
              'A' + R + ' ' + R + ' 0 ' + (seg > 180 ? 1 : 0) + ' 1 ' + f(R * Math.sin(a1)) + ' ' + f(-R * Math.cos(a1)) + 'Z"/>';
          out += '<g class="seg seg-' + c + '">' + shape +
            '<text class="seg-label" transform="rotate(' + f(i * seg - 90) + ')" x="' + (R - 16) + '" y="0" text-anchor="end" dominant-baseline="central">' +
            esc(trunc(it.short, 21)) + '</text></g>';
        });
      }
      out += '<circle r="' + (R + 5) + '" class="wheel-rim"/>';
      for (var b = 0; b < 24; b++) {
        var a = b * 15 * Math.PI / 180;
        out += '<circle class="bulb' + (b % 2 ? ' b-alt' : '') + '" r="3.4" cx="' + f((R + 5) * Math.sin(a)) + '" cy="' + f(-(R + 5) * Math.cos(a)) + '"/>';
      }
      svg.innerHTML = out;
      svg.classList.remove('has-win');
      btnSpin.disabled = !n;
      hub.disabled = !n;
    }

    function build() {
      var p = pool();
      segs = shuffle(p).slice(0, SLOTS);
      poolInfo.textContent = p.length
        ? p.length + ' ' + plural(p.length, 'idée', 'idées') + ' dans le chapeau · ' + segs.length + ' sur la roue'
        : 'Aucune idée ne correspond : élargis les filtres.';
      draw();
    }

    /* ---- Son (WebAudio, aucun fichier) ---- */
    function ensureAudio() {
      if (!sound) return;
      try {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)();
        if (actx.state === 'suspended') actx.resume();
      } catch (e) { actx = null; }
    }
    function beep(freq, dur, vol, type) {
      if (!sound || !actx) return;
      try {
        var t0 = actx.currentTime;
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'triangle';
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol || 0.06, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      } catch (e) { /* ignoré */ }
    }
    function renderSound() {
      btnSound.innerHTML = icon(sound ? 'sound' : 'mute');
      btnSound.setAttribute('aria-pressed', String(sound));
      btnSound.setAttribute('aria-label', sound ? 'Couper le son de la roue' : 'Activer le son de la roue');
    }
    btnSound.addEventListener('click', function () {
      sound = !sound;
      store.set('wheelSound', sound ? '1' : '0');
      renderSound();
    });

    function tick() {
      pointer.classList.remove('tick');
      void pointer.offsetWidth;            // relance l'animation CSS
      pointer.classList.add('tick');
      beep(1500, 0.04, 0.05);
    }

    /* ---- Lancer ---- */
    function idxAt(rot, n) {
      var seg = 360 / n;
      var a = ((-rot % 360) + 360) % 360;  // angle de la roue sous le pointeur (en haut)
      return Math.round(a / seg) % n;
    }

    function spin() {
      if (spinning || !segs.length) return;
      ensureAudio();
      spinning = true;
      stage.classList.add('is-spinning');
      btnSpin.disabled = true; hub.disabled = true; btnShuffle.disabled = true;
      svg.classList.remove('has-win');
      $$('.seg', svg).forEach(function (g) { g.classList.remove('is-win'); });

      var n = segs.length;
      var seg = 360 / n;
      var win = Math.floor(Math.random() * n);
      var jitter = (Math.random() - 0.5) * seg * 0.7;
      var start = rotation;
      var targetMod = (((360 - win * seg + jitter) % 360) + 360) % 360;
      var base = start - (((start % 360) + 360) % 360);
      var turns = REDUCED ? 1 : 5 + Math.floor(Math.random() * 2);
      var target = base + 360 * turns + targetMod;
      if (target - start < 360) target += 360;
      var dur = REDUCED ? 700 : 5200;
      var t0 = null;
      var last = idxAt(start, n);

      function frame(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = 1 - Math.pow(1 - p, 4);     // décélération douce
        rotation = start + (target - start) * e;
        disc.style.transform = 'rotate(' + rotation.toFixed(2) + 'deg)';
        var k = idxAt(rotation, n);
        if (k !== last) { last = k; tick(); }
        if (p < 1) requestAnimationFrame(frame);
        else done(win);
      }
      requestAnimationFrame(frame);
    }

    function done(win) {
      spinning = false;
      stage.classList.remove('is-spinning');
      btnSpin.disabled = false; hub.disabled = false; btnShuffle.disabled = false;
      var g = $$('.seg', svg)[win];
      if (g) { g.classList.add('is-win'); svg.classList.add('has-win'); }
      current = segs[win];
      renderResult(current);
      beep(880, 0.18, 0.07, 'sine');
      setTimeout(function () { beep(1320, 0.28, 0.06, 'sine'); }, 120);

      var r = stage.getBoundingClientRect();
      Confetti.burst(r.left + r.width / 2, r.top + r.height * 0.35, 80);

      spins++;
      if (spins === 10) Eggs.unlock('roue');
    }

    /* ---- Résultat ---- */
    function renderResult(idea) {
      result.innerHTML =
        '<p class="wr-kicker">La roue a choisi…</p>' +
        '<div class="wr-tags"><span class="wr-tag">' + esc(DATA.dateCategories[idea.cat] || idea.cat) + '</span>' +
          '<span class="wr-tag">' + esc(budgetLabel(idea.budget)) + '</span></div>' +
        '<h3 class="wr-title">' + esc(idea.title) + '</h3>' +
        '<p class="wr-text">' + esc(idea.text) + '</p>' +
        '<div class="wr-actions">' +
          '<button type="button" class="btn btn-primary btn-small" data-wact="validate">' + icon('check') + ' On le fait !</button>' +
          (idea.recipe ? '<button type="button" class="btn btn-ghost btn-small" data-wact="recipe">' + icon('chef') + ' Tirer une recette</button>' : '') +
          '<button type="button" class="btn btn-ghost btn-small" data-wact="again">' + icon('dice') + ' Relancer</button>' +
        '</div>';
      result.classList.remove('is-shown');
      void result.offsetWidth;
      result.classList.add('is-shown');
    }

    result.addEventListener('click', function (e) {
      var b = e.target.closest('[data-wact]');
      if (!b || !current) return;
      var act = b.getAttribute('data-wact');
      if (act === 'again') { spin(); return; }
      if (act === 'recipe') { if (Recipes) Recipes.openRandom(current.recipe); return; }
      if (act === 'validate') {
        history.unshift({ t: current.title, c: current.cat, at: todayISO() });
        if (history.length > 60) history.length = 60;
        store.set('dates', JSON.stringify(history));
        renderHistory();
        b.disabled = true;
        b.innerHTML = icon('check') + ' Ajouté au carnet';
        var r = b.getBoundingClientRect();
        spawnHearts(r.left + r.width / 2, r.top, 8);
        Toast.show('Ajouté au carnet', current.title, { icon: 'heart' });
      }
    });

    /* ---- Carnet des idées validées ---- */
    function renderHistory() {
      histCount.textContent = history.length ? history.length + ' ' + plural(history.length, 'validée', 'validées') : '';
      histList.innerHTML = history.length
        ? history.map(function (h, i) {
            return '<li>' + icon('check', 'wh-ico') +
              '<span class="wh-title">' + esc(h.t) + '</span>' +
              '<span class="wh-date">' + esc(formatISODate(h.at)) + '</span>' +
              '<button type="button" class="wh-del" data-del="' + i + '" aria-label="Retirer « ' + esc(h.t) + ' » du carnet">' + icon('close') + '</button></li>';
          }).join('')
        : '<li class="wh-empty">Aucune idée validée pour l\'instant. La roue attend.</li>';
    }
    histList.addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]');
      if (!b) return;
      history.splice(+b.getAttribute('data-del'), 1);
      store.set('dates', JSON.stringify(history));
      renderHistory();
    });

    btnSpin.addEventListener('click', spin);
    hub.addEventListener('click', spin);
    btnShuffle.addEventListener('click', function () { if (!spinning) build(); });

    renderFilters();
    renderSound();
    renderHistory();
    build();
  }


  /* ===================================================================
     17. LIVRE DE RECETTES (données dans recettes.js → window.POPO_RECETTES)
     - Filtres : catégorie, difficulté, favoris + recherche (titre/ingrédient).
     - Fiche en modale : parts ajustables (quantités recalculées),
       ingrédients à cocher, étapes à valider, favoris mémorisés.
     =================================================================== */
  var Recipes = null;   // API exposée à la roue : { open, openRandom }

  function fmtDuration(min) {
    if (min < 60) return min + ' min';
    var h = Math.floor(min / 60), m = min % 60;
    return h + ' h' + (m ? ' ' + pad(m) : '');
  }

  function fmtQty(v, u) {
    if (u === 'g' || u === 'ml') {
      v = v >= 500 ? Math.round(v / 10) * 10 : v >= 20 ? Math.round(v / 5) * 5 : Math.max(1, Math.round(v));
      return v + ' ' + u;
    }
    if (u === 'pincée') { v = Math.max(1, Math.round(v)); return v + (v > 1 ? ' pincées' : ' pincée'); }
    var step = v >= 3 ? 2 : 4;              // au quart sous 3, à la demie au-delà
    var r = Math.round(v * step) / step;
    if (r === 0) r = 1 / step;
    var whole = Math.floor(r), frac = r - whole;
    var fr = frac === 0.25 ? '¼' : frac === 0.5 ? '½' : frac === 0.75 ? '¾' : '';
    var unit = u;
    if (r > 1 && (u === 'pincée' || u === 'sachet')) unit = u + 's';
    return (whole ? String(whole) : '') + fr + (unit ? ' ' + unit : '');
  }

  function initRecipes() {
    var RD = window.POPO_RECETTES || { categories: {}, levels: [], list: [] };
    var list = RD.list || [];
    var cats = RD.categories || {};
    var levels = (RD.levels && RD.levels.length) ? RD.levels : ['', 'Facile', 'Moyen', 'Élaboré'];

    var grid = $('#recipe-grid');
    var count = $('#recipe-count');
    var search = $('#recipe-search');
    var catBox = $('#recipe-cats');
    var lvlBox = $('#recipe-levels');
    var favChip = $('#recipe-favs');
    var surprise = $('#recipe-surprise');
    var modal = $('#recipe-modal');
    var card = $('.modal-card', modal);
    var sheet = $('#recipe-sheet');

    var favs = {};
    readJSON('recipeFavs', []).forEach(function (id) { favs[id] = true; });
    var state = { cat: 'all', level: 0, favOnly: false, q: '' };
    var current = null, servings = 2, checked = {}, lastFocus = null;

    function find(id) { return list.filter(function (r) { return r.id === id; })[0]; }
    function imgOf(r) { return r.img || ('photos/recettes/' + r.id + '.jpg'); }
    function catName(id) { return cats[id] || id; }
    function saveFavs() { store.set('recipeFavs', JSON.stringify(Object.keys(favs))); }

    function searchText(r) {
      return normText(r.title + ' ' + (r.blurb || '') + ' ' + (r.ingredients || []).map(function (it) {
        if (typeof it === 'string') return '';
        return Array.isArray(it[2]) ? it[2].join(' ') : it[2];
      }).join(' '));
    }
    list.forEach(function (r) { r._search = searchText(r); });

    function filtered() {
      var q = normText(state.q).trim();
      return list.filter(function (r) {
        return (state.cat === 'all' || r.cat === state.cat) &&
               (!state.level || r.level === state.level) &&
               (!state.favOnly || favs[r.id]) &&
               (!q || r._search.indexOf(q) !== -1);
      });
    }

    function levelHTML(l) {
      var h = '';
      for (var i = 1; i <= 3; i++) h += icon('chef', i <= l ? 'on' : '');
      return '<span class="lvl" title="' + esc(levels[l] || '') + '">' + h + '<span class="lvl-txt">' + esc(levels[l] || '') + '</span></span>';
    }

    function cardTime(r) {
      return fmtDuration((r.prep || 0) + (r.cook || 0)) + (r.rest ? ' + ' + (r.restLabel || 'repos').toLowerCase() : '');
    }

    /* ---- Filtres ---- */
    function chip(label, attr, on) {
      return '<button type="button" class="chip" ' + attr + ' aria-pressed="' + on + '">' + label + '</button>';
    }
    function renderChips() {
      catBox.innerHTML = chip('Toutes <small>' + list.length + '</small>', 'data-rcat="all"', state.cat === 'all') +
        Object.keys(cats).map(function (c) {
          var n = list.filter(function (r) { return r.cat === c; }).length;
          return chip(esc(catName(c)) + ' <small>' + n + '</small>', 'data-rcat="' + c + '"', state.cat === c);
        }).join('');
      lvlBox.innerHTML = chip('Tous niveaux', 'data-rlvl="0"', !state.level) +
        [1, 2, 3].map(function (l) { return chip(esc(levels[l]), 'data-rlvl="' + l + '"', state.level === l); }).join('');
      favChip.setAttribute('aria-pressed', String(state.favOnly));
    }

    /* ---- Grille ---- */
    function renderGrid() {
      var items = filtered();
      if (!list.length) {
        grid.innerHTML = '<p class="recipe-empty">Le fichier <code>recettes.js</code> est introuvable : vérifie qu\'il est bien à côté de index.html.</p>';
        count.textContent = '';
        return;
      }
      count.textContent = items.length + ' ' + plural(items.length, 'recette', 'recettes') + (state.favOnly ? ' en favoris' : '');
      grid.innerHTML = items.length ? items.map(function (r) {
        return '<article class="recipe-card">' +
          mediaBox(imgOf(r), r.title, 'chef', 'Photo : ' + r.title) +
          '<button type="button" class="fav-btn" data-fav="' + r.id + '" aria-pressed="' + !!favs[r.id] + '" ' +
            'aria-label="' + (favs[r.id] ? 'Retirer des favoris : ' : 'Ajouter aux favoris : ') + esc(r.title) + '">' + icon('heart') + '</button>' +
          '<div class="recipe-info">' +
            '<span class="recipe-cat">' + esc(catName(r.cat)) + '</span>' +
            '<h3 class="recipe-name"><button type="button" class="recipe-open" data-open="' + r.id + '">' + esc(r.title) + '</button></h3>' +
            '<p class="recipe-blurb">' + esc(r.blurb || '') + '</p>' +
            '<div class="recipe-meta">' + levelHTML(r.level) +
              '<span class="recipe-time">' + icon('clock') + ' ' + esc(cardTime(r)) + '</span></div>' +
          '</div></article>';
      }).join('')
        : '<p class="recipe-empty">' + (state.favOnly && !Object.keys(favs).length
            ? 'Aucun favori pour l\'instant : clique sur le cœur d\'une recette pour l\'ajouter.'
            : 'Aucune recette ne correspond. Essaie un autre mot ou d\'autres filtres.') + '</p>';
      checkImages(grid);
    }

    function refresh() { renderChips(); renderGrid(); }

    catBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rcat]');
      if (!b) return;
      state.cat = b.getAttribute('data-rcat');
      refresh();
    });
    lvlBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rlvl]');
      if (!b) return;
      state.level = +b.getAttribute('data-rlvl');
      refresh();
    });
    favChip.addEventListener('click', function () { state.favOnly = !state.favOnly; refresh(); });

    var searchTimer = null;
    search.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () { state.q = search.value; renderGrid(); }, 120);
    });

    function toggleFav(id, from) {
      var r = find(id);
      if (!r) return;
      if (favs[id]) delete favs[id]; else favs[id] = true;
      saveFavs();
      $$('[data-fav="' + id + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(!!favs[id]));
        if (b.classList.contains('fav-btn')) {
          b.setAttribute('aria-label', (favs[id] ? 'Retirer des favoris : ' : 'Ajouter aux favoris : ') + r.title);
        }
      });
      if (favs[id] && from) {
        var rect = from.getBoundingClientRect();
        spawnHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);
      }
      if (state.favOnly) renderGrid();
    }

    grid.addEventListener('click', function (e) {
      var f = e.target.closest('[data-fav]');
      if (f) { toggleFav(f.getAttribute('data-fav'), f); return; }
      var o = e.target.closest('[data-open]');
      if (o) open(o.getAttribute('data-open'), o);
    });

    surprise.addEventListener('click', function () {
      var items = filtered();
      if (!items.length) items = list;
      if (items.length) open(pick(items).id, surprise);
    });

    /* ---- Fiche recette ---- */
    function ingredientsHTML() {
      var r = current, k = servings / (r.serves || 1);
      return (r.ingredients || []).map(function (it, i) {
        if (typeof it === 'string') return '<li class="ingr-group">' + esc(it.replace(/^#\s*/, '')) + '</li>';
        var q = it[0], u = it[1], n = it[2];
        var v = q == null ? null : q * k;
        var name = Array.isArray(n) ? (v != null && v > 1 ? n[1] : n[0]) : n;
        return '<li><label class="ingr">' +
          '<input type="checkbox" data-ingr="' + i + '"' + (checked[i] ? ' checked' : '') + '>' +
          '<span class="ingr-qty">' + (v == null ? '' : esc(fmtQty(v, u))) + '</span>' +
          '<span class="ingr-name">' + esc(name) + '</span></label></li>';
      }).join('');
    }

    function renderServings() {
      $('.ingr-list', sheet).innerHTML = ingredientsHTML();
      $('.srv-val', sheet).innerHTML = '<b>' + servings + '</b> ' + plural(servings, 'part', 'parts');
    }

    function stepsProgress() {
      var all = $$('.step', sheet), done = all.filter(function (s) { return s.getAttribute('aria-pressed') === 'true'; });
      $('.steps-progress', sheet).textContent = done.length + ' / ' + all.length + ' ' + plural(all.length, 'étape', 'étapes');
      return done.length === all.length && all.length > 0;
    }

    function renderSheet() {
      var r = current;
      var times = '<li>' + icon('clock') + ' Préparation <b>' + esc(fmtDuration(r.prep || 0)) + '</b></li>' +
        (r.cook ? '<li>' + icon('clock') + ' Cuisson <b>' + esc(fmtDuration(r.cook)) + '</b></li>' : '') +
        (r.rest ? '<li>' + icon('clock') + ' ' + esc(r.restLabel || 'Repos') + ' <b>' + esc(fmtDuration(r.rest)) + '</b></li>' : '');

      sheet.innerHTML =
        '<div class="sheet-media">' + mediaBox(imgOf(r), r.title, 'chef', 'Photo : ' + r.title) + '</div>' +
        '<div class="sheet-body">' +
          '<p class="sheet-tag">' + esc(catName(r.cat)) + ' · ' + esc(levels[r.level] || '') + '</p>' +
          '<h3 class="sheet-title" id="recipe-title">' + esc(r.title) + '</h3>' +
          (r.blurb ? '<p class="sheet-blurb">' + esc(r.blurb) + '</p>' : '') +
          '<ul class="sheet-times">' + times + '</ul>' +
          '<div class="sheet-grid">' +
            '<section class="sheet-ingr" aria-label="Ingrédients">' +
              '<div class="sheet-ingr-head"><h4>Ingrédients</h4>' +
                '<div class="servings" role="group" aria-label="Nombre de parts">' +
                  '<button type="button" class="srv-btn" data-srv="-1" aria-label="Une part de moins">' + icon('minus') + '</button>' +
                  '<span class="srv-val" aria-live="polite"></span>' +
                  '<button type="button" class="srv-btn" data-srv="1" aria-label="Une part de plus">' + icon('plus') + '</button>' +
                '</div></div>' +
              '<ul class="ingr-list"></ul>' +
            '</section>' +
            '<section class="sheet-steps" aria-label="Étapes">' +
              '<div class="steps-head"><h4>Étapes</h4><span class="steps-progress" aria-live="polite"></span></div>' +
              '<ol class="step-list">' + (r.steps || []).map(function (s, i) {
                return '<li><button type="button" class="step" aria-pressed="false">' +
                  '<span class="step-n">' + (i + 1) + '</span><span class="step-txt">' + esc(s) + '</span></button></li>';
              }).join('') + '</ol>' +
            '</section>' +
          '</div>' +
          (r.tip ? '<p class="sheet-tip"><strong>Astuce</strong> ' + esc(r.tip) + '</p>' : '') +
          '<div class="sheet-actions">' +
            '<button type="button" class="btn btn-ghost btn-small" data-fav="' + r.id + '" aria-pressed="' + !!favs[r.id] + '">' + icon('heart') + ' Favori</button>' +
            '<button type="button" class="btn btn-ghost btn-small" data-another="1">' + icon('dice') + ' Une autre recette</button>' +
          '</div>' +
        '</div>';
      renderServings();
      stepsProgress();
    }

    sheet.addEventListener('click', function (e) {
      var s = e.target.closest('[data-srv]');
      if (s) {
        servings = Math.max(1, Math.min(20, servings + (+s.getAttribute('data-srv'))));
        renderServings();
        return;
      }
      var st = e.target.closest('.step');
      if (st) {
        var on = st.getAttribute('aria-pressed') !== 'true';
        st.setAttribute('aria-pressed', String(on));
        var allDone = stepsProgress();
        if (on && allDone) {
          var rc = card.getBoundingClientRect();
          Confetti.burst(rc.left + rc.width / 2, rc.top + 80, 120);
          Toast.show('Bon appétit !', current.title + ' est prêt. Photo obligatoire pour l\'album.', { icon: 'chef' });
        }
        return;
      }
      var f = e.target.closest('[data-fav]');
      if (f) { toggleFav(f.getAttribute('data-fav'), f); return; }
      if (e.target.closest('[data-another]')) openRandom(current.cat, current.id);
    });
    sheet.addEventListener('change', function (e) {
      var c = e.target.closest('[data-ingr]');
      if (c) checked[c.getAttribute('data-ingr')] = c.checked;
    });

    function open(id, trigger) {
      var r = find(id);
      if (!r) return;
      if (modal.hidden) lastFocus = trigger || document.activeElement;
      current = r;
      servings = r.serves || 2;
      checked = {};
      renderSheet();
      modal.hidden = false;
      document.body.classList.add('modal-open');
      card.scrollTop = 0;
      checkImages(sheet);
      $('.modal-close', modal).focus();
    }

    function openRandom(cat, excludeId) {
      var p = list.filter(function (r) { return (!cat || cat === '*' || r.cat === cat) && r.id !== excludeId; });
      if (!p.length) p = list.filter(function (r) { return r.id !== excludeId; });
      if (!p.length) p = list;
      if (p.length) open(pick(p).id);
    }

    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
      lastFocus = null;
    }

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'Tab') trapFocus(card, e);
    });

    refresh();
    return { open: open, openRandom: openRandom };
  }


  /* ===================================================================
     18. EASTER EGGS + CÉLÉBRATIONS
     - Compteur « Secrets trouvés » dans le footer (clic = un indice).
     - Célébrations automatiques : chaque 21 du mois, anniversaires,
       jalons en jours (50, 100, 200, 365…). Confettis une fois par jour.
     =================================================================== */
  var Eggs = (function () {
    var found = {};
    readJSON('eggs', []).forEach(function (id) { found[id] = true; });

    function total() { return EGGS.length; }
    function count() { return EGGS.filter(function (e) { return found[e.id]; }).length; }
    function get(id) { return EGGS.filter(function (e) { return e.id === id; })[0]; }

    function render() {
      var b = $('#egg-counter');
      if (!b) return;
      b.innerHTML = icon('sparkle') + ' Secrets trouvés : <b>' + count() + '</b> / ' + total();
      b.classList.toggle('is-complete', count() === total());
    }

    function unlock(id) {
      var egg = get(id);
      if (!egg) return;
      var isNew = !found[id];
      if (isNew) {
        found[id] = true;
        store.set('eggs', JSON.stringify(Object.keys(found)));
        render();
      }
      Toast.show(isNew ? 'Secret trouvé · ' + count() + '/' + total() : egg.name, egg.msg, { icon: 'sparkle' });
      if (isNew && count() === total()) {
        setTimeout(function () {
          var W = window.innerWidth, H = window.innerHeight;
          Confetti.burst(W * 0.2, H * 0.5, 160); Confetti.burst(W * 0.8, H * 0.5, 160);
          Toast.show('Tous les secrets sont trouvés !', "Rien ne vous échappe. Vous méritez un date de votre choix.", { icon: 'star', duration: 7000 });
        }, 1400);
      }
    }

    function hint() {
      var left = EGGS.filter(function (e) { return !found[e.id]; });
      if (!left.length) {
        Toast.show('Tous les secrets sont trouvés', 'Bravo, chasseurs de trésors.', { icon: 'star' });
        return;
      }
      Toast.show('Indice (' + count() + '/' + total() + ')', pick(left).hint, { icon: 'sparkle' });
    }

    return { unlock: unlock, hint: hint, render: render };
  })();

  function initEggs() {
    var root = document.documentElement;

    function flashClass(cls, ms) {
      root.classList.remove(cls);
      void root.offsetWidth;
      root.classList.add(cls);
      setTimeout(function () { root.classList.remove(cls); }, ms);
    }

    function heartRain(waves) {
      for (var k = 0; k < waves; k++) {
        (function (k) {
          setTimeout(function () {
            spawnHearts(Math.random() * window.innerWidth, window.innerHeight - 40, 5);
          }, k * 110);
        })(k);
      }
    }

    function bigHeart() {
      var h = document.createElement('div');
      h.className = 'big-heart';
      h.setAttribute('aria-hidden', 'true');
      h.innerHTML = icon('heart', 'ico-fill');
      h.addEventListener('animationend', function () { h.remove(); });
      document.body.appendChild(h);
      setTimeout(function () { if (h.parentNode) h.remove(); }, 2500);   // sécurité
    }

    var W = function () { return window.innerWidth; };
    var H = function () { return window.innerHeight; };

    var effects = {
      popo:    function () { heartRain(12); },
      livio:   function () { Confetti.burst(W() * 0.5, H() * 0.45, 170); },
      jetaime: function () { bigHeart(); heartRain(16); },
      konami:  function () {
        flashClass('egg-disco', 6000);
        Confetti.burst(W() * 0.15, H() * 0.6, 120); Confetti.burst(W() * 0.85, H() * 0.6, 120);
      },
      logo:    function () {
        flashClass('egg-wobble', 1300);
        var r = $('.brand').getBoundingClientRect();
        spawnHearts(r.left + 14, r.top + r.height / 2, 12);
      },
      titre:   function () { bigHeart(); },
      vinyle:  function () {
        var v = $('#vinyl');
        v.classList.remove('scratch');
        void v.offsetWidth;
        v.classList.add('scratch');
        setTimeout(function () { v.classList.remove('scratch'); }, 1000);
      }
    };

    function trigger(id) {
      if (effects[id]) effects[id]();
      Eggs.unlock(id);
    }

    /* ---- Clavier : mots secrets + code Konami ---- */
    var buffer = '';
    var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var kpos = 0;
    var WORDS = ['jetaime', 'livio', 'popo'];

    document.addEventListener('keydown', function (e) {
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.ctrlKey || e.metaKey || e.altKey || !e.key) return;
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (k === KONAMI[kpos]) {
        kpos++;
        if (kpos === KONAMI.length) { kpos = 0; trigger('konami'); }
      } else {
        kpos = (k === KONAMI[0]) ? 1 : 0;
      }

      if (k.length === 1 && /[a-z]/.test(k)) {
        buffer = (buffer + k).slice(-12);
        for (var i = 0; i < WORDS.length; i++) {
          var w = WORDS[i];
          if (buffer.slice(-w.length) === w) { buffer = ''; trigger(w); break; }
        }
      }
    });

    /* ---- Clics répétés ---- */
    multiClick($('.brand'), 7, 3000, function () { trigger('logo'); });
    multiClick($('#hero-title'), 10, 5000, function () { trigger('titre'); });
    multiClick($('#vinyl'), 5, 2500, function () { trigger('vinyle'); });

    /* ---- Compteur du footer ---- */
    var counter = $('#egg-counter');
    if (counter) counter.addEventListener('click', Eggs.hint);
    Eggs.render();
  }

  function initCelebrations() {
    var today = startOfDay(new Date());
    var start = startOfDay(CONFIG.coupleStart);
    var days = Math.round((today - start) / 86400000);
    var msgs = [];

    var months = (today.getFullYear() - start.getFullYear()) * 12 + today.getMonth() - start.getMonth();
    if (today.getDate() === start.getDate() && months >= 1) {
      if (months % 12 === 0) msgs.push('Joyeux ' + (months / 12) + ' ' + plural(months / 12, 'an', 'ans') + ' ensemble !');
      else msgs.push('Joyeux ' + months + ' mois ensemble !');
    }
    if ([50, 100, 150, 200, 250, 300, 500, 750, 1000].indexOf(days) !== -1) {
      msgs.push(days + " jours de nous aujourd'hui !");
    }
    DATA.birthdays.forEach(function (b) {
      if (today.getMonth() === b.month && today.getDate() === b.day) msgs.push('Joyeux anniversaire ' + b.name + ' !');
    });
    if (!msgs.length) return;

    var box = $('#celebration');
    box.innerHTML = icon('star') + '<span>' + esc(msgs.join(' · ')) + '</span>';
    box.hidden = false;

    var key = todayISO();
    if (store.get('celebrated', '') !== key) {
      store.set('celebrated', key);
      setTimeout(function () {
        var W = window.innerWidth, H = window.innerHeight;
        Confetti.burst(W * 0.3, H * 0.35, 150);
        Confetti.burst(W * 0.7, H * 0.35, 150);
        Toast.show(msgs[0], "Un jour à fêter : la roue des dates a peut-être une idée.", { icon: 'star', duration: 7000 });
      }, 900);
    }
  }


  /* ===================================================================
     19. ÉTOILES (thème Midnight) + INITIALISATION
     =================================================================== */
  function initStars() {
    var box = $('#stars');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 90; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.setProperty('--s', (0.8 + Math.random() * 2).toFixed(1) + 'px');
      s.style.setProperty('--t', (2 + Math.random() * 4).toFixed(1) + 's');
      s.style.setProperty('--dl', (Math.random() * 5).toFixed(1) + 's');
      frag.appendChild(s);
    }
    box.appendChild(frag);
  }

  function init() {
    // Enregistre les sources d'images en ligne (utilisées seulement si le fichier local manque)
    DATA.cinema.forEach(function (it) { ArtResolver.register('cinema:' + it.id, it.art); });
    DATA.artists.forEach(function (a) { ArtResolver.register('artist:' + a.id, a.art); });

    initMediaFallback();   // avant tout rendu d'image
    initThemes();
    initStars();
    initCounter();
    initHome();
    initTimeline();
    initBereal();
    initMap();
    initCinema();
    initPlayer();
    initQuiz();
    Recipes = initRecipes();   // avant la roue (bouton « Tirer une recette »)
    initWheel();
    initEggs();
    initCelebrations();
    initTabs();            // en dernier : affiche l'onglet demandé
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
