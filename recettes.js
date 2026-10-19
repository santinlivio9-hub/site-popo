/* =====================================================================
   recettes.js — « site popo » · Livio & Popo
   Livre de recettes : DONNÉES UNIQUEMENT (la logique est dans script.js).
   Ce fichier doit être chargé AVANT script.js dans index.html.

   FORMAT D'UNE RECETTE
     id          identifiant unique (sert aussi au nom de la photo)
     cat         'apero' | 'plat' | 'dessert' | 'brunch'
     level       1 = Facile · 2 = Moyen · 3 = Élaboré
     serves      nombre de parts de base (le site recalcule les quantités)
     prep/cook   temps en minutes · rest (optionnel) = repos / marinade
     img         (optionnel) chemin relatif. Par défaut :
                 photos/recettes/<id>.jpg   (image absente = fallback CSS)

   FORMAT D'UN INGRÉDIENT : [quantité, unité, nom]
     quantité    nombre, ou null si « au goût »
     unité       'g', 'ml', 'c. à s.', 'c. à c.', 'pincée', 'sachet', ou '' (à l'unité)
     nom         texte, ou ['singulier', 'pluriel'] pour les ingrédients
                 comptés à l'unité (le site choisit selon la quantité)
     Une ligne texte commençant par '#' crée un sous-titre (ex. '# Sauce').

   ÉTAPES ET MINUTEURS
     Une durée écrite dans une étape (« 20 minutes », « 8 à 10 minutes »,
     « 1 h 30 », « 6 heures », « 30 secondes ») ajoute automatiquement
     un bouton minuteur à côté de l'étape (la plus petite valeur est retenue).
   ===================================================================== */
window.POPO_RECETTES = {

  categories: {
    apero:   'Apéro & entrées',
    plat:    'Plats',
    dessert: 'Desserts',
    brunch:  'Brunch & goûter'
  },

  levels: ['', 'Facile', 'Moyen', 'Élaboré'],

  list: [

    /* =================== APÉRO & ENTRÉES =================== */
    {
      id: 'guacamole', cat: 'apero', level: 1, serves: 2, prep: 10, cook: 0,
      title: 'Guacamole maison',
      blurb: "L'apéro le plus rapide du monde, avec des chips de maïs.",
      ingredients: [
        [2, '', ['avocat bien mûr', 'avocats bien mûrs']],
        [0.5, '', ['citron vert', 'citrons verts']],
        [0.25, '', ['oignon rouge', 'oignons rouges']],
        [1, '', ['tomate', 'tomates']],
        [null, '', 'quelques brins de coriandre'],
        [null, '', "sel, piment d'Espelette"],
        [null, '', 'chips de maïs (tortillas)']
      ],
      steps: [
        "Hacher l'oignon rouge très finement et couper la tomate en petits dés en retirant les graines.",
        "Couper les avocats en deux, retirer le noyau et récupérer la chair à la cuillère.",
        "Écraser la chair à la fourchette avec le jus du citron vert, en gardant quelques morceaux.",
        "Ajouter l'oignon, la tomate et la coriandre ciselée. Saler, pimenter, mélanger.",
        "Goûter, rectifier l'assaisonnement et servir aussitôt avec les chips."
      ],
      tip: "Pour le préparer à l'avance, filmer au contact de la surface : l'avocat noircit beaucoup moins vite."
    },
    {
      id: 'tartines-chevre-miel', cat: 'apero', level: 1, serves: 2, prep: 10, cook: 8,
      title: 'Tartines chèvre, miel & noix',
      blurb: "Le sucré-salé qui fond, parfait avec une salade verte.",
      ingredients: [
        [4, '', ['tranche de pain de campagne', 'tranches de pain de campagne']],
        [120, 'g', 'bûche de chèvre'],
        [2, 'c. à s.', 'miel liquide'],
        [6, '', ['cerneau de noix', 'cerneaux de noix']],
        [null, '', 'thym, poivre'],
        [null, '', 'salade verte pour servir']
      ],
      steps: [
        "Préchauffer le four en position gril à 200 °C.",
        "Couper le chèvre en rondelles et les répartir sur les tranches de pain.",
        "Arroser d'un filet de miel et parsemer de thym.",
        "Enfourner 6 à 8 minutes, jusqu'à ce que le fromage soit fondant et doré.",
        "Ajouter les noix concassées, un tour de poivre, et servir avec la salade."
      ],
      tip: "Un filet de vinaigre balsamique sur la salade équilibre le sucré du miel."
    },
    {
      id: 'veloute-potimarron', cat: 'apero', level: 1, serves: 2, prep: 15, cook: 25,
      title: 'Velouté de potimarron',
      blurb: "Le classique de l'automne, doux et réconfortant.",
      ingredients: [
        [500, 'g', 'potimarron'],
        [1, '', ['oignon', 'oignons']],
        [1, '', ['pomme de terre', 'pommes de terre']],
        [500, 'ml', 'bouillon de légumes'],
        [50, 'ml', 'crème liquide'],
        [10, 'g', 'beurre'],
        [null, '', 'sel, poivre, muscade']
      ],
      steps: [
        "Laver le potimarron (inutile de l'éplucher), l'épépiner et le couper en cubes.",
        "Faire revenir l'oignon émincé dans le beurre 3 minutes à feu moyen.",
        "Ajouter le potimarron et la pomme de terre en cubes, puis couvrir avec le bouillon.",
        "Laisser cuire 20 à 25 minutes à petits frémissements, jusqu'à ce que tout soit tendre.",
        "Mixer finement, ajouter la crème, puis saler, poivrer et râper un peu de muscade."
      ],
      tip: "Servir avec des graines de courge grillées à sec à la poêle ou quelques noisettes concassées."
    },
    {
      id: 'gyoza', cat: 'apero', level: 3, serves: 2, prep: 50, cook: 10,
      title: 'Gyoza maison',
      blurb: "Les raviolis japonais grillés dessous et moelleux dessus.",
      ingredients: [
        '# Farce',
        [200, 'g', 'porc haché'],
        [100, 'g', 'chou chinois'],
        [1, '', ["gousse d'ail", "gousses d'ail"]],
        [10, 'g', 'gingembre frais'],
        [2, '', ['oignon vert', 'oignons verts']],
        [1, 'c. à s.', 'sauce soja'],
        [1, 'c. à c.', 'huile de sésame'],
        [20, '', ['feuille à gyoza', 'feuilles à gyoza']],
        '# Sauce',
        [2, 'c. à s.', 'sauce soja'],
        [1, 'c. à s.', 'vinaigre de riz'],
        [null, '', 'huile pimentée (facultatif)']
      ],
      steps: [
        "Hacher finement le chou, le saler légèrement et le laisser dégorger 10 minutes, puis le presser dans les mains pour retirer l'eau.",
        "Mélanger le porc, le chou, l'ail et le gingembre râpés, l'oignon vert ciselé, la sauce soja et l'huile de sésame.",
        "Déposer une cuillère à café de farce au centre d'une feuille, humidifier le bord et refermer en formant 4 ou 5 plis.",
        "Dans une poêle huilée bien chaude, saisir les gyoza à plat 2 minutes, jusqu'à ce que le dessous soit doré.",
        "Verser un fond d'eau (environ 5 cl), couvrir aussitôt et laisser cuire 5 à 6 minutes à la vapeur.",
        "Retirer le couvercle et laisser l'eau s'évaporer pour que le dessous redevienne croustillant.",
        "Mélanger les ingrédients de la sauce et servir les gyoza bien chauds."
      ],
      tip: "Les gyoza crus se congèlent très bien à plat sur une plaque. On les cuit ensuite sans les décongeler, avec 2 minutes de vapeur en plus."
    },

    /* =================== PLATS =================== */
    {
      id: 'croque-monsieur', cat: 'plat', level: 1, serves: 2, prep: 10, cook: 10,
      title: 'Croque-monsieur',
      blurb: "Le dîner du dimanche soir, doré et filant.",
      ingredients: [
        [4, '', ['tranche de pain de mie', 'tranches de pain de mie']],
        [2, '', ['tranche de jambon', 'tranches de jambon']],
        [80, 'g', 'emmental râpé'],
        [2, 'c. à s.', 'crème fraîche épaisse'],
        [15, 'g', 'beurre mou'],
        [null, '', 'poivre, muscade']
      ],
      steps: [
        "Préchauffer le four à 200 °C.",
        "Beurrer une face de chaque tranche de pain : c'est elle qui sera à l'extérieur.",
        "Sur la face non beurrée, étaler la crème, poivrer et ajouter une pincée de muscade.",
        "Déposer le jambon et la moitié du fromage, puis refermer avec une deuxième tranche, face beurrée au-dessus.",
        "Parsemer le reste du fromage sur le dessus et enfourner 8 à 10 minutes, jusqu'à ce que ce soit bien doré."
      ],
      tip: "Avec un œuf au plat posé dessus, il devient un croque-madame."
    },
    {
      id: 'andouillette-moutarde', cat: 'plat', level: 1, serves: 2, prep: 10, cook: 20,
      title: 'Andouillette de Troyes, sauce moutarde',
      blurb: "La spécialité de notre QG, nappée d'une sauce à l'ancienne.",
      ingredients: [
        [2, '', ['andouillette de Troyes', 'andouillettes de Troyes']],
        [1, '', ['échalote', 'échalotes']],
        [100, 'ml', 'vin blanc sec'],
        [100, 'ml', 'crème fraîche'],
        [1, 'c. à s.', "moutarde à l'ancienne"],
        [15, 'g', 'beurre'],
        [null, '', 'sel, poivre'],
        [null, '', 'pommes de terre vapeur ou frites']
      ],
      steps: [
        "Entailler légèrement la peau des andouillettes en quelques endroits pour qu'elles n'éclatent pas à la cuisson.",
        "Les cuire dans le beurre à feu moyen pendant 15 minutes environ, en les retournant régulièrement pour bien les dorer. Réserver au chaud.",
        "Dans la même poêle, faire revenir l'échalote ciselée 2 minutes.",
        "Déglacer avec le vin blanc en grattant les sucs, puis laisser réduire de moitié.",
        "Ajouter la crème et la moutarde, laisser épaissir 2 minutes à feu doux, puis poivrer.",
        "Napper les andouillettes de sauce et servir avec les pommes de terre."
      ],
      tip: "Parfait pour le « défi andouillette » de la roue des dates : la sauce moutarde adoucit le goût, idéal pour une première fois."
    },
    {
      id: 'carbonara', cat: 'plat', level: 1, serves: 2, prep: 10, cook: 12,
      title: 'Spaghetti carbonara',
      blurb: "La vraie, sans crème : œufs, fromage, poivre et c'est tout.",
      ingredients: [
        [200, 'g', 'spaghetti'],
        [100, 'g', 'guanciale ou lardons'],
        [3, '', ["jaune d'œuf", "jaunes d'œufs"]],
        [40, 'g', 'pecorino ou parmesan râpé'],
        [null, '', 'poivre noir du moulin']
      ],
      steps: [
        "Cuire les pâtes dans une grande casserole d'eau bouillante salée.",
        "Pendant ce temps, faire dorer le guanciale à sec dans une grande poêle, puis couper le feu.",
        "Fouetter les jaunes avec le fromage et beaucoup de poivre.",
        "Égoutter les pâtes en gardant une louche d'eau de cuisson, puis les verser dans la poêle hors du feu.",
        "Ajouter le mélange aux œufs et un peu d'eau de cuisson, et mélanger vivement pour obtenir une sauce crémeuse sans faire cuire les œufs.",
        "Servir aussitôt avec un peu de fromage et de poivre."
      ],
      tip: "Le secret, c'est la poêle hors du feu : trop chaude, les œufs font des grumeaux."
    },
    {
      id: 'welsh', cat: 'plat', level: 2, serves: 2, prep: 10, cook: 15,
      title: 'Welsh du Nord',
      blurb: "Cheddar fondu à la bière, jambon et pain grillé : la spécialité lilloise.",
      ingredients: [
        [2, '', ['tranche épaisse de pain de campagne', 'tranches épaisses de pain de campagne']],
        [2, '', ['tranche de jambon blanc', 'tranches de jambon blanc']],
        [250, 'g', 'cheddar affiné'],
        [150, 'ml', 'bière blonde ou ambrée'],
        [1, 'c. à s.', 'moutarde'],
        [2, '', ['œuf', 'œufs']],
        [null, '', 'poivre, paprika (facultatif)'],
        [null, '', 'frites pour servir']
      ],
      steps: [
        "Préchauffer le four à 200 °C.",
        "Faire griller légèrement le pain, puis poser chaque tranche dans un plat à gratin individuel.",
        "Arroser le pain d'un petit trait de bière, le tartiner de moutarde et le couvrir d'une tranche de jambon.",
        "Dans une casserole à feu doux, faire fondre le cheddar coupé en dés avec le reste de la bière, en remuant sans arrêt jusqu'à obtenir une sauce lisse. Poivrer.",
        "Napper généreusement le pain de cheddar fondu.",
        "Enfourner 10 à 12 minutes, jusqu'à ce que ce soit doré et bouillonnant.",
        "Pendant ce temps, cuire les œufs au plat et en poser un sur chaque welsh à la sortie du four."
      ],
      tip: "La répétition idéale avant l'escapade à Lille. Une bière ambrée donne plus de goût que la blonde."
    },
    {
      id: 'risotto-champignons', cat: 'plat', level: 2, serves: 2, prep: 15, cook: 25,
      title: 'Risotto aux champignons',
      blurb: "Crémeux, réconfortant, et ça se tourne à deux.",
      ingredients: [
        [160, 'g', 'riz arborio'],
        [250, 'g', 'champignons de Paris'],
        [1, '', ['échalote', 'échalotes']],
        [80, 'ml', 'vin blanc sec'],
        [700, 'ml', 'bouillon de volaille chaud'],
        [40, 'g', 'parmesan râpé'],
        [20, 'g', 'beurre'],
        [1, 'c. à s.', "huile d'olive"]
      ],
      steps: [
        "Faire dorer les champignons émincés à la poêle avec un peu d'huile, saler, puis réserver.",
        "Dans une casserole, faire suer l'échalote hachée dans l'huile d'olive sans la colorer.",
        "Ajouter le riz et le nacrer 2 minutes en remuant : les grains deviennent translucides.",
        "Déglacer avec le vin blanc et laisser absorber.",
        "Ajouter le bouillon chaud louche par louche, en remuant et en attendant qu'il soit absorbé avant la suivante, pendant environ 18 minutes.",
        "Incorporer les champignons, puis hors du feu ajouter le beurre et le parmesan. Couvrir 2 minutes avant de servir."
      ],
      tip: "Le bouillon doit rester chaud sur le feu à côté : froid, il casse la cuisson du riz."
    },
    {
      id: 'poulet-curry-coco', cat: 'plat', level: 2, serves: 2, prep: 15, cook: 25,
      title: 'Poulet curry coco',
      blurb: "Doux, parfumé, avec un riz basmati bien chaud.",
      ingredients: [
        [300, 'g', 'blanc de poulet'],
        [200, 'ml', 'lait de coco'],
        [1, '', ['oignon', 'oignons']],
        [1, '', ["gousse d'ail", "gousses d'ail"]],
        [10, 'g', 'gingembre frais'],
        [1, 'c. à s.', 'pâte de curry ou curry en poudre'],
        [1, '', ['tomate', 'tomates']],
        [150, 'g', 'riz basmati'],
        [null, '', 'coriandre, citron vert']
      ],
      steps: [
        "Lancer la cuisson du riz selon les indications du paquet.",
        "Faire revenir l'oignon émincé, l'ail et le gingembre râpés dans un peu d'huile, 3 minutes.",
        "Ajouter le curry et le faire torréfier 1 minute en remuant.",
        "Ajouter le poulet coupé en cubes et le faire dorer sur toutes les faces.",
        "Verser la tomate coupée en dés et le lait de coco, puis laisser mijoter 15 minutes à feu doux.",
        "Parsemer de coriandre, ajouter un trait de citron vert et servir avec le riz."
      ],
      tip: "Une poignée d'épinards frais ajoutée à la fin apporte de la couleur sans changer le goût."
    },
    {
      id: 'quiche-lorraine', cat: 'plat', level: 2, serves: 4, prep: 15, cook: 35,
      title: 'Quiche lorraine',
      blurb: "La recette traditionnelle, encore meilleure le lendemain.",
      ingredients: [
        [1, '', ['pâte brisée', 'pâtes brisées']],
        [200, 'g', 'lardons fumés'],
        [3, '', ['œuf', 'œufs']],
        [200, 'ml', 'crème fraîche'],
        [200, 'ml', 'lait'],
        [null, '', 'poivre, muscade (peu de sel : les lardons le sont déjà)']
      ],
      steps: [
        "Préchauffer le four à 180 °C.",
        "Étaler la pâte dans un moule à tarte et la piquer à la fourchette.",
        "Faire revenir les lardons à sec 5 minutes, puis les égoutter sur du papier absorbant.",
        "Battre les œufs avec la crème, le lait, le poivre et la muscade.",
        "Répartir les lardons sur la pâte et verser l'appareil par-dessus.",
        "Enfourner 35 minutes environ, jusqu'à ce que la quiche soit dorée et prise au centre."
      ],
      tip: "Une vraie lorraine n'a pas de fromage, mais personne ne vous jugera si vous en ajoutez."
    },
    {
      id: 'burgers', cat: 'plat', level: 2, serves: 2, prep: 20, cook: 10,
      title: 'Burgers maison',
      blurb: "Mieux qu'au fast-food, et avec la sauce secrète.",
      ingredients: [
        [2, '', ['pain à burger', 'pains à burger']],
        [300, 'g', 'bœuf haché (15 % de matières grasses)'],
        [2, '', ['tranche de cheddar', 'tranches de cheddar']],
        [1, '', ['tomate', 'tomates']],
        [0.5, '', ['oignon rouge', 'oignons rouges']],
        [null, '', 'quelques feuilles de salade, cornichons'],
        '# Sauce',
        [2, 'c. à s.', 'mayonnaise'],
        [1, 'c. à s.', 'ketchup'],
        [1, 'c. à c.', 'moutarde'],
        [1, 'c. à c.', 'cornichons hachés']
      ],
      steps: [
        "Mélanger les ingrédients de la sauce et la réserver au frais.",
        "Former deux steaks un peu plus larges que les pains, et creuser légèrement leur centre avec le pouce pour qu'ils restent plats à la cuisson.",
        "Couper la tomate et l'oignon en rondelles fines.",
        "Saler les steaks juste avant de les cuire dans une poêle très chaude, 3 minutes de chaque côté.",
        "Après les avoir retournés, poser le cheddar dessus et couvrir 1 à 2 minutes pour le faire fondre.",
        "Toaster les pains côté mie, puis monter : sauce, salade, steak, tomate, oignon, et le chapeau."
      ],
      tip: "Des frites au four : bâtonnets de pommes de terre, un filet d'huile, 30 minutes à 220 °C en les retournant à mi-cuisson."
    },
    {
      id: 'tartiflette', cat: 'plat', level: 2, serves: 2, prep: 20, cook: 45,
      title: 'Tartiflette',
      blurb: "Le plat d'hiver qui réchauffe d'un coup.",
      ingredients: [
        [600, 'g', 'pommes de terre à chair ferme'],
        [0.5, '', ['reblochon', 'reblochons']],
        [125, 'g', 'lardons'],
        [1, '', ['oignon', 'oignons']],
        [50, 'ml', 'vin blanc sec'],
        [2, 'c. à s.', 'crème fraîche'],
        [null, '', 'poivre']
      ],
      steps: [
        "Cuire les pommes de terre entières dans l'eau salée 20 minutes : elles doivent rester fermes. Les éplucher et les couper en rondelles.",
        "Préchauffer le four à 200 °C.",
        "Faire revenir l'oignon émincé avec les lardons, puis déglacer avec le vin blanc.",
        "Dans un plat, alterner pommes de terre, lardons-oignons et crème, en poivrant.",
        "Couper le reblochon en deux dans l'épaisseur et le poser par-dessus, croûte vers le haut.",
        "Enfourner 20 à 25 minutes, jusqu'à ce que le fromage soit fondu et gratiné."
      ],
      tip: "Une salade verte bien vinaigrée à côté, et c'est presque un repas équilibré."
    },
    {
      id: 'lasagnes', cat: 'plat', level: 2, serves: 4, prep: 30, cook: 75,
      title: 'Lasagnes bolognaises',
      blurb: "Le grand plat à partager, qui se réchauffe parfaitement.",
      ingredients: [
        '# Bolognaise',
        [400, 'g', 'bœuf haché'],
        [1, '', ['oignon', 'oignons']],
        [1, '', ['carotte', 'carottes']],
        [1, '', ["gousse d'ail", "gousses d'ail"]],
        [400, 'g', 'tomates concassées'],
        [1, 'c. à s.', 'concentré de tomate'],
        '# Béchamel',
        [40, 'g', 'beurre'],
        [40, 'g', 'farine'],
        [500, 'ml', 'lait'],
        [null, '', 'sel, poivre, muscade'],
        '# Montage',
        [9, '', ['feuille de lasagne', 'feuilles de lasagne']],
        [80, 'g', 'parmesan ou emmental râpé']
      ],
      steps: [
        "Bolognaise : faire revenir l'oignon, la carotte et l'ail hachés dans un peu d'huile, puis ajouter la viande et la faire dorer.",
        "Ajouter les tomates et le concentré, saler, poivrer et laisser mijoter 30 à 45 minutes à feu doux.",
        "Béchamel : faire fondre le beurre, ajouter la farine et cuire 1 minute en remuant, puis verser le lait froid en fouettant jusqu'à épaississement. Assaisonner.",
        "Préchauffer le four à 180 °C.",
        "Dans un plat, étaler un peu de sauce, puis alterner feuilles, bolognaise et béchamel, pour obtenir trois couches.",
        "Finir par de la béchamel et le fromage râpé, puis enfourner 30 à 35 minutes.",
        "Laisser reposer 10 minutes avant de couper : les parts se tiennent beaucoup mieux."
      ],
      tip: "Préparées la veille, elles sont encore meilleures : les saveurs ont le temps de se mélanger."
    },
    {
      id: 'pad-thai', cat: 'plat', level: 2, serves: 2, prep: 20, cook: 10,
      title: 'Pad thaï aux crevettes',
      blurb: "Sucré, salé, acidulé : le voyage en 10 minutes de wok.",
      ingredients: [
        [150, 'g', 'nouilles de riz plates'],
        [200, 'g', 'crevettes décortiquées (ou poulet)'],
        [2, '', ['œuf', 'œufs']],
        [100, 'g', 'pousses de soja'],
        [2, '', ['oignon vert', 'oignons verts']],
        [30, 'g', 'cacahuètes grillées'],
        [1, '', ['citron vert', 'citrons verts']],
        '# Sauce',
        [2, 'c. à s.', 'nuoc-mâm (sauce poisson)'],
        [1, 'c. à s.', 'pâte de tamarin (ou jus de citron vert)'],
        [1, 'c. à s.', 'sucre roux'],
        [1, 'c. à s.', 'sauce soja']
      ],
      steps: [
        "Faire tremper les nouilles dans l'eau chaude selon le paquet : elles doivent être souples mais encore fermes. Égoutter.",
        "Mélanger les ingrédients de la sauce jusqu'à ce que le sucre soit dissous.",
        "Dans un wok bien chaud et huilé, faire sauter les crevettes 2 minutes, puis les pousser sur le côté.",
        "Casser les œufs dans l'espace libre et les brouiller rapidement.",
        "Ajouter les nouilles et la sauce, et faire sauter 2 minutes en mélangeant tout.",
        "Ajouter les pousses de soja et l'oignon vert 30 secondes, puis servir avec les cacahuètes concassées et des quartiers de citron vert."
      ],
      tip: "Tout doit être prêt avant d'allumer le feu : la cuisson au wok va très vite."
    },
    {
      id: 'pizza-maison', cat: 'plat', level: 3, serves: 2, prep: 30, cook: 10, rest: 120,
      title: 'Pizza maison, pâte comprise',
      blurb: "Pâte pétrie à la main, four à fond, garnitures au choix.",
      ingredients: [
        '# Pâte',
        [250, 'g', 'farine T45 ou T55'],
        [160, 'ml', 'eau tiède'],
        [4, 'g', 'levure de boulanger sèche'],
        [5, 'g', 'sel'],
        [1, 'c. à s.', "huile d'olive"],
        '# Garniture',
        [150, 'g', 'coulis de tomate'],
        [125, 'g', 'mozzarella'],
        [null, '', 'basilic frais, garnitures au choix']
      ],
      steps: [
        "Délayer la levure dans l'eau tiède.",
        "Mélanger la farine et le sel, ajouter l'eau et l'huile, puis pétrir 10 minutes jusqu'à obtenir une pâte lisse et souple.",
        "Couvrir et laisser lever 1 h 30 à 2 h dans un endroit tiède : la pâte doit doubler de volume.",
        "Préchauffer le four au maximum (250 °C ou plus) avec la plaque à l'intérieur.",
        "Diviser la pâte en deux et l'étaler à la main en gardant un bord un peu plus épais.",
        "Garnir de coulis, de mozzarella égouttée et déchirée, puis des garnitures choisies.",
        "Cuire 8 à 10 minutes sur la plaque brûlante. Ajouter le basilic et un filet d'huile d'olive à la sortie."
      ],
      tip: "Mozzarella bien égouttée, voire séchée 30 minutes sur du papier absorbant : sinon la pizza détrempe."
    },
    {
      id: 'boeuf-bourguignon', cat: 'plat', level: 3, serves: 4, prep: 30, cook: 180, rest: 720, restLabel: 'Marinade',
      title: 'Bœuf bourguignon',
      blurb: "Le plat des grandes occasions, mijoté pendant des heures.",
      ingredients: [
        [800, 'g', 'bœuf à braiser (paleron, joue)'],
        [150, 'g', 'lardons'],
        [750, 'ml', 'vin rouge de Bourgogne'],
        [2, '', ['carotte', 'carottes']],
        [1, '', ['oignon', 'oignons']],
        [2, '', ["gousse d'ail", "gousses d'ail"]],
        [1, '', ['bouquet garni', 'bouquets garnis']],
        [2, 'c. à s.', 'farine'],
        [250, 'g', 'champignons de Paris'],
        [12, '', ['petit oignon grelot', 'petits oignons grelots']],
        [null, '', 'beurre, huile, sel, poivre']
      ],
      steps: [
        "La veille : couper la viande en gros cubes et la faire mariner au frais dans le vin avec les carottes en rondelles, l'oignon émincé, l'ail et le bouquet garni.",
        "Le jour même : égoutter la viande et bien la sécher, en gardant la marinade.",
        "Dans une cocotte avec un peu d'huile, faire dorer la viande en plusieurs fois pour bien la saisir, puis réserver. Faire dorer les lardons.",
        "Remettre la viande, saupoudrer de farine et remuer 2 minutes.",
        "Verser la marinade avec ses légumes, porter à ébullition, puis couvrir et laisser mijoter 2 h 30 à 3 h à feu très doux.",
        "30 minutes avant la fin, faire dorer au beurre les champignons et les oignons grelots, puis les ajouter dans la cocotte.",
        "Rectifier l'assaisonnement et servir avec des pommes de terre vapeur ou des pâtes fraîches."
      ],
      tip: "Il est encore meilleur réchauffé le lendemain : n'hésitez pas à le faire la veille."
    },
    {
      id: 'magret-miel-orange', cat: 'plat', level: 3, serves: 2, prep: 15, cook: 20,
      title: 'Magret, sauce miel & orange',
      blurb: "Le dîner chic à la maison, rosé et caramélisé.",
      ingredients: [
        [1, '', ['magret de canard (environ 400 g)', 'magrets de canard (environ 400 g chacun)']],
        [1, '', ['orange', 'oranges']],
        [2, 'c. à s.', 'miel'],
        [2, 'c. à s.', 'vinaigre balsamique'],
        [null, '', 'fleur de sel, poivre']
      ],
      steps: [
        "Sortir le magret du réfrigérateur 30 minutes avant la cuisson.",
        "Quadriller la peau au couteau sans entailler la chair.",
        "Le poser côté peau dans une poêle froide, puis cuire à feu moyen 8 à 10 minutes en retirant la graisse au fur et à mesure.",
        "Retourner et cuire 3 à 4 minutes côté chair pour une cuisson rosée.",
        "Laisser reposer 5 minutes sous une feuille d'aluminium.",
        "Vider la graisse de la poêle, puis déglacer avec le jus et le zeste de l'orange, le miel et le balsamique. Laisser réduire jusqu'à ce que la sauce soit sirupeuse.",
        "Trancher le magret, napper de sauce et finir avec la fleur de sel et le poivre."
      ],
      tip: "Gardez la graisse de canard : elle fait les meilleures pommes de terre sautées du monde."
    },

    /* =================== DESSERTS =================== */
    {
      id: 'mug-cake', cat: 'dessert', level: 1, serves: 1, prep: 5, cook: 2,
      title: 'Mug cake au chocolat',
      blurb: "L'envie de chocolat satisfaite en 3 minutes chrono.",
      ingredients: [
        [40, 'g', 'chocolat noir'],
        [25, 'g', 'beurre'],
        [1, '', ['œuf', 'œufs']],
        [25, 'g', 'sucre'],
        [20, 'g', 'farine']
      ],
      steps: [
        "Dans un grand mug, faire fondre le chocolat et le beurre au micro-ondes 30 à 40 secondes, puis mélanger.",
        "Ajouter le sucre et l'œuf, et fouetter à la fourchette.",
        "Incorporer la farine jusqu'à ce que la pâte soit lisse.",
        "Cuire 1 minute à 1 minute 15 à 800 W : le centre doit rester légèrement fondant.",
        "Laisser tiédir 1 minute avant de déguster (attention, c'est brûlant)."
      ],
      tip: "Un carré de chocolat enfoncé au centre avant la cuisson, et c'est un cœur coulant."
    },
    {
      id: 'cookies', cat: 'dessert', level: 1, serves: 10, prep: 15, cook: 12,
      title: 'Cookies aux pépites de chocolat',
      blurb: "Bords croustillants, cœur moelleux : une fournée d'une dizaine de cookies.",
      ingredients: [
        [125, 'g', 'beurre mou'],
        [100, 'g', 'sucre roux'],
        [50, 'g', 'sucre en poudre'],
        [1, '', ['œuf', 'œufs']],
        [200, 'g', 'farine'],
        [0.5, 'c. à c.', 'levure chimique'],
        [1, 'pincée', 'fleur de sel'],
        [150, 'g', 'pépites ou morceaux de chocolat']
      ],
      steps: [
        "Préchauffer le four à 180 °C et couvrir une plaque de papier cuisson.",
        "Mélanger le beurre mou avec les deux sucres jusqu'à obtenir une texture crémeuse.",
        "Ajouter l'œuf, puis la farine, la levure et la fleur de sel, sans trop travailler la pâte.",
        "Incorporer les pépites de chocolat.",
        "Former des boules de la taille d'une noix et bien les espacer sur la plaque : elles s'étalent à la cuisson.",
        "Cuire 10 à 12 minutes : les bords doivent être dorés et le centre encore mou. Laisser durcir 10 minutes sur la plaque."
      ],
      tip: "Une demi-heure de pâte au réfrigérateur avant la cuisson donne des cookies plus épais et plus moelleux."
    },
    {
      id: 'fondant-coeur-coulant', cat: 'dessert', level: 2, serves: 2, prep: 15, cook: 10,
      title: 'Fondant au cœur coulant',
      blurb: "Le dessert de restaurant, sans le restaurant.",
      ingredients: [
        [100, 'g', 'chocolat noir pâtissier'],
        [60, 'g', 'beurre'],
        [2, '', ['œuf', 'œufs']],
        [50, 'g', 'sucre'],
        [20, 'g', 'farine'],
        [null, '', 'beurre et cacao pour les moules']
      ],
      steps: [
        "Préchauffer le four à 200 °C. Beurrer deux ramequins et les saupoudrer de cacao.",
        "Faire fondre le chocolat et le beurre au bain-marie ou au micro-ondes.",
        "Fouetter les œufs et le sucre jusqu'à ce que le mélange blanchisse.",
        "Verser le chocolat fondu, mélanger, puis incorporer la farine.",
        "Remplir les ramequins et enfourner 8 à 10 minutes : les bords doivent être cuits et le centre encore tremblotant.",
        "Attendre 1 minute, puis démouler sur l'assiette."
      ],
      tip: "Les ramequins remplis peuvent attendre au réfrigérateur : comptez alors 2 minutes de cuisson en plus."
    },
    {
      id: 'tiramisu', cat: 'dessert', level: 2, serves: 4, prep: 25, cook: 0, rest: 360,
      title: 'Tiramisu',
      blurb: "Le classique italien, à préparer la veille.",
      ingredients: [
        [250, 'g', 'mascarpone'],
        [3, '', ['œuf très frais', 'œufs très frais']],
        [70, 'g', 'sucre'],
        [16, '', ['biscuit cuillère', 'biscuits cuillère']],
        [250, 'ml', 'café fort refroidi'],
        [1, 'pincée', 'sel'],
        [null, '', 'cacao non sucré']
      ],
      steps: [
        "Séparer les blancs des jaunes.",
        "Fouetter les jaunes avec le sucre jusqu'à ce que le mélange blanchisse, puis ajouter le mascarpone et lisser.",
        "Monter les blancs en neige ferme avec la pincée de sel, puis les incorporer délicatement à la spatule.",
        "Tremper rapidement les biscuits dans le café, une seconde par face, sans les détremper.",
        "Dans un plat, alterner une couche de biscuits et une couche de crème, deux fois.",
        "Réserver au réfrigérateur au moins 6 heures.",
        "Saupoudrer de cacao au tamis juste avant de servir."
      ],
      tip: "Les œufs sont consommés crus : prenez-les très frais et gardez le tiramisu au froid."
    },
    {
      id: 'tarte-citron-meringuee', cat: 'dessert', level: 3, serves: 6, prep: 45, cook: 35, rest: 120,
      title: 'Tarte au citron meringuée',
      blurb: "Le défi pâtissier : pâte sablée, crème acidulée, meringue dorée.",
      ingredients: [
        '# Pâte sablée',
        [200, 'g', 'farine'],
        [100, 'g', 'beurre froid'],
        [70, 'g', 'sucre glace'],
        [1, '', ["jaune d'œuf", "jaunes d'œufs"]],
        [1, 'c. à s.', 'eau froide'],
        '# Crème au citron',
        [3, '', ['citron', 'citrons']],
        [3, '', ['œuf', 'œufs']],
        [120, 'g', 'sucre'],
        [15, 'g', 'fécule de maïs'],
        [70, 'g', 'beurre'],
        '# Meringue',
        [3, '', ["blanc d'œuf", "blancs d'œufs"]],
        [120, 'g', 'sucre']
      ],
      steps: [
        "Pâte : sabler du bout des doigts la farine, le sucre glace et le beurre en dés, puis ajouter le jaune et l'eau. Former une boule sans trop la travailler et la réserver 30 minutes au froid.",
        "Étaler la pâte, foncer un moule de 22 cm, la piquer et la remettre 15 minutes au froid.",
        "Cuire à blanc à 180 °C : 20 minutes avec du papier cuisson et des poids, puis 5 à 8 minutes sans, jusqu'à ce qu'elle soit dorée. Laisser refroidir.",
        "Crème : dans une casserole, fouetter le zeste et le jus des citrons, le sucre, les œufs et la fécule. Chauffer à feu moyen sans cesser de fouetter jusqu'à épaississement.",
        "Hors du feu, incorporer le beurre en morceaux, puis verser la crème sur le fond de tarte.",
        "Meringue : monter les blancs en neige en ajoutant le sucre petit à petit, jusqu'à ce qu'elle soit ferme et brillante.",
        "Étaler ou pocher la meringue sur la crème, puis la dorer au chalumeau ou 2 à 3 minutes sous le gril, en surveillant de près.",
        "Réserver au moins 2 heures au réfrigérateur avant de servir."
      ],
      tip: "Les jaunes restants peuvent servir à une crème anglaise ou à la carbonara du lendemain."
    },
    {
      id: 'profiteroles', cat: 'dessert', level: 3, serves: 4, prep: 40, cook: 30,
      title: 'Profiteroles au chocolat',
      blurb: "Pâte à choux maison, glace vanille et sauce chocolat chaude.",
      ingredients: [
        '# Pâte à choux',
        [125, 'ml', 'eau'],
        [50, 'g', 'beurre'],
        [75, 'g', 'farine'],
        [2, '', ['œuf', 'œufs']],
        [1, 'c. à c.', 'sucre'],
        [1, 'pincée', 'sel'],
        '# Garniture',
        [500, 'ml', 'glace vanille'],
        [100, 'g', 'chocolat noir'],
        [100, 'ml', 'crème liquide']
      ],
      steps: [
        "Préchauffer le four à 190 °C et couvrir une plaque de papier cuisson.",
        "Porter à ébullition l'eau, le beurre, le sucre et le sel.",
        "Hors du feu, verser la farine d'un coup et mélanger vivement. Remettre sur feu doux 1 à 2 minutes en remuant pour dessécher la pâte, jusqu'à ce qu'elle se détache des bords.",
        "Transférer dans un saladier, laisser tiédir 2 minutes, puis incorporer les œufs un par un : la pâte doit être lisse et retomber en formant un ruban.",
        "Former une quinzaine de petits choux sur la plaque, à la poche ou avec deux cuillères.",
        "Cuire 25 à 30 minutes sans jamais ouvrir le four, jusqu'à ce qu'ils soient bien dorés. Laisser refroidir sur une grille.",
        "Sauce : verser la crème bouillante sur le chocolat haché et lisser.",
        "Couper les choux, les garnir d'une boule de glace et napper de sauce chaude au moment de servir."
      ],
      tip: "Si on ouvre le four pendant la cuisson, les choux retombent : patience jusqu'au bout."
    },

    /* =================== BRUNCH & GOÛTER =================== */
    {
      id: 'pancakes', cat: 'brunch', level: 1, serves: 2, prep: 10, cook: 15, rest: 10,
      title: 'Pancakes moelleux',
      blurb: "Épais, dorés, et noyés de sirop d'érable.",
      ingredients: [
        [150, 'g', 'farine'],
        [1, '', ['œuf', 'œufs']],
        [180, 'ml', 'lait'],
        [20, 'g', 'sucre'],
        [20, 'g', 'beurre fondu'],
        [1.5, 'c. à c.', 'levure chimique'],
        [1, 'pincée', 'sel'],
        [null, '', "sirop d'érable, fruits frais"]
      ],
      steps: [
        "Mélanger la farine, le sucre, la levure et le sel.",
        "Ajouter l'œuf, le lait et le beurre fondu, puis fouetter juste assez pour obtenir une pâte homogène (quelques grumeaux, ce n'est pas grave).",
        "Laisser reposer 10 minutes.",
        "Dans une poêle légèrement huilée à feu moyen, verser une petite louche de pâte.",
        "Retourner quand des bulles apparaissent à la surface, au bout de 2 minutes environ, puis cuire 1 minute de l'autre côté.",
        "Servir en pile avec du sirop d'érable et des fruits."
      ],
      tip: "Trop fouetter la pâte rend les pancakes plats : on mélange, on ne bat pas."
    },
    {
      id: 'gaufres', cat: 'brunch', level: 1, serves: 4, prep: 10, cook: 20, rest: 30,
      title: 'Gaufres croustillantes',
      blurb: "Croustillantes dehors, moelleuses dedans, pour le goûter du dimanche.",
      ingredients: [
        [250, 'g', 'farine'],
        [2, '', ['œuf', 'œufs']],
        [400, 'ml', 'lait'],
        [80, 'g', 'beurre fondu'],
        [30, 'g', 'sucre'],
        [1, 'sachet', 'levure chimique'],
        [1, 'pincée', 'sel'],
        [null, '', 'sucre glace, chantilly ou chocolat fondu']
      ],
      steps: [
        "Mélanger la farine, le sucre, la levure et le sel dans un saladier.",
        "Ajouter les œufs, puis verser le lait petit à petit en fouettant pour éviter les grumeaux.",
        "Incorporer le beurre fondu et laisser reposer la pâte 30 minutes.",
        "Faire chauffer le gaufrier et le graisser légèrement au pinceau.",
        "Verser une petite louche de pâte, refermer et cuire 3 à 4 minutes, jusqu'à ce que la gaufre soit bien dorée.",
        "Servir aussitôt avec du sucre glace, de la chantilly ou du chocolat fondu."
      ],
      tip: "Pour des gaufres encore plus légères, monter les blancs en neige et les incorporer délicatement à la fin."
    },
    {
      id: 'crepes', cat: 'brunch', level: 1, serves: 4, prep: 10, cook: 20, rest: 60,
      title: 'Crêpes',
      blurb: "La pâte de base, pour le sucre, la confiture ou la pâte à tartiner.",
      ingredients: [
        [250, 'g', 'farine'],
        [3, '', ['œuf', 'œufs']],
        [500, 'ml', 'lait'],
        [30, 'g', 'beurre fondu'],
        [1, 'c. à s.', 'sucre'],
        [1, 'pincée', 'sel'],
        [null, '', "rhum, vanille ou fleur d'oranger (facultatif)"]
      ],
      steps: [
        "Mélanger la farine, le sucre et le sel dans un saladier et creuser un puits.",
        "Ajouter les œufs et mélanger en incorporant le lait petit à petit pour éviter les grumeaux.",
        "Ajouter le beurre fondu et l'arôme choisi.",
        "Laisser reposer 1 heure (la pâte n'en sera que meilleure).",
        "Dans une poêle chaude légèrement beurrée, verser une petite louche de pâte en inclinant la poêle pour la répartir.",
        "Cuire environ 1 minute de chaque côté."
      ],
      tip: "Une pâte trop épaisse ? Un peu de lait. Trop liquide ? Une cuillère de farine tamisée."
    },
    {
      id: 'oeufs-brouilles-avocat', cat: 'brunch', level: 1, serves: 2, prep: 10, cook: 5,
      title: 'Œufs brouillés & avocado toast',
      blurb: "Le brunch qui fait plaisir, en dix minutes.",
      ingredients: [
        [4, '', ['œuf', 'œufs']],
        [10, 'g', 'beurre'],
        [1, '', ['avocat', 'avocats']],
        [2, '', ['tranche de pain de campagne', 'tranches de pain de campagne']],
        [0.5, '', ['citron', 'citrons']],
        [null, '', 'sel, poivre, ciboulette, piment']
      ],
      steps: [
        "Faire griller les tranches de pain.",
        "Écraser l'avocat avec le jus de citron, saler et poivrer, puis l'étaler sur les tartines.",
        "Battre les œufs avec une pincée de sel.",
        "Faire fondre le beurre à feu doux, verser les œufs et remuer sans arrêt à la spatule.",
        "Retirer du feu quand les œufs sont encore crémeux : ils finissent de cuire avec la chaleur de la poêle.",
        "Déposer les œufs sur les tartines et finir avec la ciboulette et une pincée de piment."
      ],
      tip: "Feu doux et patience : c'est ce qui fait la différence entre des œufs crémeux et des œufs caoutchouteux."
    },
    {
      id: 'chocolat-chaud', cat: 'brunch', level: 1, serves: 2, prep: 5, cook: 10,
      title: 'Chocolat chaud épais',
      blurb: "Façon salon de thé, à boire sous le plaid.",
      ingredients: [
        [400, 'ml', 'lait entier'],
        [80, 'g', 'chocolat noir'],
        [1, 'c. à s.', 'sucre'],
        [1, 'c. à c.', 'fécule de maïs'],
        [null, '', 'chantilly, cannelle (facultatif)']
      ],
      steps: [
        "Délayer la fécule dans un peu de lait froid.",
        "Faire chauffer le reste du lait, puis ajouter le chocolat haché et le laisser fondre en remuant.",
        "Ajouter le sucre et la fécule délayée.",
        "Fouetter à feu doux 2 à 3 minutes, jusqu'à ce que le chocolat épaississe.",
        "Servir bien chaud, avec de la chantilly ou une pincée de cannelle."
      ],
      tip: "Une pincée de sel dans le lait renforce le goût du chocolat."
    }
  ]
};
