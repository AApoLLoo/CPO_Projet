var clavier;
var player;
var score = 0;
var zone_texte_score;
var musique_de_fond;
var TP;
var boutondoor;
var sonRoi;
// Ces variables globales servent à :
//arder une référence aux objets pour pouvoir les modifier à tout moment
//Simplifier l'organisation du code en accédant aux éléments sans avoir besoin de les redéclarer


export default class Moyen_age extends Phaser.Scene { 
    constructor() {
        super({ key: "Moyen_age" });
    }
    //Création d’une nouvelle classe qui hérite des fonctionnalités de Phaser.Scene.

    preload() {

//La fonction preload() sert à charger tous les éléments du jeu avant son lancement.
// Dans Phaser, tout doit être chargé en mémoire avant d’être utilisé dans create().
        this.load.image("tuilesmoyenage", "src/assets/tuilesmoyenage.png");//Charge les tuiles 
        this.load.tilemapTiledJSON("MAPmoyenage", "src/assets/MAPmoyenage.json");//Charge le niveau
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });//charge le spirte pour les animations
        this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });// deuxieme version ex: tourner a droite
        this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });// ajoute une couche pour les pnatalons du perso
        this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });//2eme version
        this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });//chemise
        this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("fantome", "src/assets/fantome.png", { frameWidth: 630, frameHeight: 396 }); // Ajout des fantomes
        this.load.image("epee", "src/assets/epee.png"); // Ajoute l'image de l'épée
        this.load.image("HP", "src/assets/Coeur_HP.png");// charge les coeurs vies
        this.load.audio('medieval', 'src/assets/medieval.mp3');//chergement de la musique de fond
        this.load.spritesheet("TP", "src/assets/teleporter2.png", { frameWidth: 154, frameHeight: 130 });// animation du teleporteur
        this.load.audio('sonmort', 'src/assets/gameover.mp3'); // chergement son de mort quand game over
        this.load.image("roi", "src/assets/roi.png"); // image du roi

        // frameWidth: largeur d'une image individuelle
        //frameHeigth: hauteur d'une image
    // plusieurs animations du perso,chaque image est une frame d'anim, ca decoupe l'image en tel pixel

    }
    create() {

       // elle initalise et affiche les élements du jeu
        if (!musique_de_fond) { // on verifie si la musique a été chargé
            musique_de_fond = this.sound.add("medieval"), { volume: 0.05, loop: true };// règle le volume et la repetition du son
        }
        if (musique_de_fond.isPlaying == false) {//true si musique en cours de lecture, false si elle est arrêtée ou en pause
            musique_de_fond.play();

        //musique_de_fond = this.sound.add('medieval'); 
        //musique_de_fond.play(); c'est plus clair comme ca 


        }
        this.score = 0; // on initialise le score à 0
        this.scoreText = this.add.text(50, 80, "Score: " + this.score, { // la valeur du score est mis à jour a chaque épee, x= 50 y=80
            fontSize: "24px", // style du texte
            fill: "#FFF" // couleur blanche
        }).setScrollFactor(0); // le texte reste au meme endroit pendant le jeu



        const carteDuNiveau3 = this.add.tilemap("MAPmoyenage");
        const tileset = carteDuNiveau3.addTilesetImage("tuilesmoyenage");
        const calque_background = carteDuNiveau3.createLayer("calque_background", tileset);
        const calque_2 = carteDuNiveau3.createLayer("calque_2", tileset); // createLayerpermet de charger les 3 calques en leur associant le jeu de tuile associé
        const calque_3 = carteDuNiveau3.createLayer("calque_3", tileset);// on definit avant le perso pour quils soient deriere 
        calque_2.setCollisionByProperty({ estSolide: true });// propriété estSolide pour les tuiles qui sont sur le calque 2
// permet de creer la carte du niveau et de charger le jeu de tuiles



        TP = this.physics.add.sprite(3700, 100, "TP");
        TP = this.physics.add.sprite(3700, 100, "TP"); // beug ligne en trop mais elle ecrase celui creer sur la 1ere ligne
        //"TP" = image teleporteur, creer un objet qui est affecté par la gravité et les collisions
        
        
        
        this.player = this.physics.add.sprite(100, 600, "player");
        this.pants = this.physics.add.sprite(100, 600, "pants");
        this.shirt = this.physics.add.sprite(100, 600, "shirt"); 

        // les vetements sont positionés aux memes coordonnees que le player pour le suivre

        this.player.body.setSize(18, 40, true); // reduit la taille de la hitbox du joeur, le centre de la hitbox calculé automatiquement
        this.player.body.setSize(18, 40, true); // doublons
        this.player.body.setOffset(30, 22);
        this.pants.body.setSize(18, 40, true);
        this.pants.body.setOffset(30, 22);
        this.shirt.body.setSize(18, 40, true);
        this.shirt.body.setOffset(30, 22);
        // hitbox = zone invisible qui deffinit les collisions du perso
        // setSize = change la taille
        //setOffset = decale la hitbox pour l'aligner avec le joeur
// plus hitbox petit plus meileure precision collison


        this.player.direction = 'right'; // dans quel sens va le joeur
        this.player.setScale(1.5);// agrandit le joeur de 1.5
        this.player.setScale(1.5);
        this.player.setBounce(0.2); // rebons sur le sol
        this.player.setCollideWorldBounds(true); // le perso ne sort pas de la zone de jeu si il atteint les bord il est bloqué
        this.physics.add.collider(this.player, calque_2); // empeche le joeur de tomber a travers les platefomes
        this.pants.setScale(1.5);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.physics.add.collider(this.pants, calque_2);
        this.shirt.setScale(1.5);
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.physics.add.collider(this.shirt, calque_2);


// dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche


        this.anims.create({
            key: "anim_face",
            frames: [{ key: "player", frame: 4 }], // affiche la frame 4
            frameRate: 20 // definit 20 images par seconde
        });
        this.anims.create({
            key: "anim_tourne_gauche",
            frames: this.anims.generateFrameNumbers("player", { start: 14, end: 16 }), // jouent les frame de 14 a 16 pour un mvt fluide
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite",
            frames: this.anims.generateFrameNumbers("player2", { start: 14, end: 16 }), //pareil
            frames: this.anims.generateFrameNumbers("player2", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut",
            frames: this.anims.generateFrameNumbers("player", { start: 22, end: 24 }), //pareil
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_pants",
            frames: [{ key: "pants", frame: 4 }], // que la frame 4 
            frameRate: 20 // 20 im par sec
        });
        this.anims.create({
            key: "anim_tourne_gauche_pants",
            frames: this.anims.generateFrameNumbers("pants", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_pants",
            frames: this.anims.generateFrameNumbers("pants2", { start: 14, end: 16 }),
            frames: this.anims.generateFrameNumbers("pants2", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_pants",
            frames: this.anims.generateFrameNumbers("pants", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_shirt",
            frames: [{ key: "shirt", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "anim_tourne_gauche_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_shirt",
            frames: this.anims.generateFrameNumbers("shirt2", { start: 14, end: 16 }),
            frames: this.anims.generateFrameNumbers("shirt2", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 22, end: 24 }),
            frameRate: 4,
        });

        clavier = this.input.keyboard.createCursorKeys(); // crer un clavier qui permet de detecter l'appui sur les toiches

        
        this.fantomes = this.physics.add.group(); { // creer un groupe de fantome qui bougent dans des directions diff
            for (let i = 0; i < 3; i++) { // on creer une boucle pour ajouter plusieurs fantomes au lieu de les creer 1 par 1, si on veut 5 fantome : <5
                this.time.delayedCall(i * 1000, () => { // Ajout d'un délai entre chaque momie, 1er a 0sec, 2 eme apres 1 sec, 3eme apres 2 sec, si on veut plus vite: i*500
                    let fantome = this.fantomes.create(1000 + i * 800, 600, "fantome"); // ecarte les fantomes horizontalement, chacun apparait 800 pixel plus loin
                    fantome.setCollideWorldBounds(true); // empeche de sortir de l'ecran
                    fantome.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100)); // donne une vitesse aleatoire entre -100 et 100
                    fantome.health = 1; // chaque fantome etait censé commencer avec une vie 
                }, [], this);
            }


        }

        this.physics.add.collider(this.fantomes, calque_2); // empeche les fantome de traverse le sol
        this.physics.add.overlap(this.player, this.fantomes, this.hitByFantome, null, this); // detecte une collision entre fantome et player, appelle hitbyfantome quand le joeur est touche par un fantome
        this.physics.add.collider(this.player, calque_2);// colider= bloque le passage evite aux fantome de passer a travers le calque 2
        this.player.health = 3;



          
            this.clavier = this.input.keyboard.createCursorKeys(); // deja creer en haut
            this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // attaque quand on appuie sur espace
            this.physics.world.setBounds(0, 0, 3840, 1280); // fixe es bords du jeu
            this.cameras.main.setBounds(0, 0, 3840, 1280); // empeche la cam de depaser les bords
            this.cameras.main.startFollow(this.player); // centre la camera sur le joeur


// EPEES

        this.epees = this.physics.add.staticGroup(); // Static Group car plus perfomant qu'un groupe car il ne calcule pas de physique intule, les epees ne sont pas affectées par la gravité
  
        let positionsEpees = [ // liste des coordonnes des épees sur la carte 
            { x: 455, y: 620 },
            { x: 1280, y: 850 },
            { x: 2850, y: 1000 },
            { x: 3210, y: 700 },
        ];


        
        
        positionsEpees.forEach(pos => { // pour chaque position d'epees
            this.epees.create(pos.x, pos.y, "epee").setScale(0.5); // reduit la taille des épees
        });
        

        this.physics.add.overlap(this.player, this.epees, this.ramasserEpee, null, this); // overlap= detacte le contact sans le bloquer, si this.player touche une eppe, this.ramasserEpee() est appele
     

//VIES
        this.player.health = 3; // Nombre initial de vies, variable else qui suit le nmb de vies restante
        this.coins = []; // Tableau qui stocke les coeur à l'ecran, permet de les sup 1 par 1
       
        for (let i = 0; i < this.player.health; i++) { // parcourt le nombre de vies du joeur
            this.coins.push(this.add.image(100 + i * 120, 120, "HP").setOrigin(0.5).setScrollFactor(0)); // position x et y des coeurs, fixent a l'ecran et on les espace de 120 pixel horizontalment 
        }



        //SCORE
        zone_texte_score = this.add.text(this.cameras.main.width / 2, 50, 'SCORE : 0', {
            fontSize: '64px',
            fill: '#FFF',
            fontStyle: 'bold',
            fontFamily: 'Times New Roman' // Remplacer ici par la police de ton choix
        }).setOrigin(0.5).setScrollFactor(0); // ce score sert a rien ct au debut ou il etait a gauche



        //TELEPORTATION


        TP.body.immovable = true; // le teleporteur ne bouge pas si un objet la touche
        TP.setAllowGravity = false; // le teleporteur ne tombe pas sous l'effet de la gravité
        this.physics.add.collider(TP, calque_2); // empeche le tleporteur de traverser le sol

        this.anims.create({   // creer une animation 
            key: 'teleporteur',
            frames: this.anims.generateFrameNumbers('TP', { start: 0, end: 5 }), // jouer l'image de 0 a 5 a une vitesse de 4 image /sec
            frameRate: 4 // rapidité de l'anim
            ,
        });

        boutondoor = this.input.keyboard.addKey('F'); // si F est préssé alors le telporteur s'ouvre

this.roi = this.physics.add.staticSprite(400, 1000, "roi").setScale(1.2); // ajoute un perso roi a tel coordonne en l'agrandissant
this.physics.add.collider(this.roi, calque_2); // solide par rapport au claque 2



this.physics.add.overlap(this.player, this.roi, this.rencontrerRoi, null, this); // si le joeur touche le roi (overlap) on appelle this.rencontrerRoi contrairement a collider ca ne bloque pas le joeur

}


    update() { //Cette section du code permet de contrôler les mouvements du personnage lorsque le joueur appuie sur les flèches directionnelles

        if (clavier.left.isDown) { // verifie si la touche gauche est appuyé
            this.player.direction = 'left'; // met a jouer la direction du joeur
            this.pants.direction = 'left';
            this.shirt.direction = 'left'; // pareil pour ses parties 
            this.player.setVelocityX(-200); // applique une vitesse horizontale de -200 au joueur
            this.pants.setVelocityX(-200); // si on veut accelerer -400
            this.shirt.setVelocityX(-200);
            this.player.anims.play("anim_tourne_gauche", true); // declanche l'animation de marche vers la gauche
            this.pants.anims.play("anim_tourne_gauche_pants", true); // true signifie que l'animation est joue en boucle tant que la touche est préssée
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);

        } else if (clavier.right.isDown) { // exactement pareil mais dans le cas ou cest la fleche droite qui est pressee
            this.player.direction = 'right';
            this.pants.direction = 'right';
            this.shirt.direction = 'right';
            this.player.setVelocityX(200);
            this.pants.setVelocityX(200);
            this.shirt.setVelocityX(200);
            this.player.anims.play("anim_tourne_droite", true);
            this.pants.anims.play("anim_tourne_droite_pants", true);
            this.shirt.anims.play("anim_tourne_droite_shirt", true);
        } else {
            this.player.setVelocityX(0); // si aucune touche est presse on arrete le joueur
            this.pants.setVelocityX(0);
            this.shirt.setVelocityX(0);
            this.player.anims.play("anim_face"); // evite que l'animation de marche continue alord que le joueur est immobile
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
        }
        if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
        } // elle y est en double

        if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) { // verifie si la touche haut est presse et ca empeche le joueur de sauter en plain vol en testant si il touche le sol ou une plateforme 
            this.player.anims.play("anim_saut", true); // true signifie que ca se repete tant que la touche est pressee
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.pants.setVelocityY(-420); // applique une force vers le haut, -420 cest la hauteur du saut plus le chiffre est neg plus il saute haut
            this.player.setVelocityY(-420);
            this.shirt.setVelocityY(-420); // applique a tt les elem pour qu'ils bougent ensemble
        }
       

// faux 
        this.fantomes.children.iterate((fantome) => { // parcourt chaque fantome du groupe this.fantome
            if (fantome) { 
                this.physics.moveToObject(fantome, this.player, 50); // fais avancer chaque fantome vers le joeuur a une vitesse de 50 pixel par seconde
            }
        });

      
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) { //justeDown signifie que l'action ne s'execute qu'une seule fois par pression
            this.attack(); // declenche la fonction attack
       
    }

       
        if (boutondoor.isDown && this.physics.overlap(this.player, TP) && score == 4) { // active le telporteur quand le joueur appuie sur F et s'il a collecte 4 eppe
            TP.anims.play('teleporteur', true);
        }
        if (boutondoor.isDown && this.physics.overlap(this.player, TP) && score == 4) {
            TP.anims.play('teleporteur', true); //ligne en trop , joue rl'animation teleporte du TP
            TP.on('animationcomplete', () => { // evite que la transition se declenche plusieurs fois si F continue
                musique_de_fond.stop(); // arrete la musique de fond
                this.scene.stop('Moyen_age');
                this.scene.start('Industrie'); // change de niveau
            }, this);
        }

}
    hitByFantome(player, fantome) {
        if (!player.invincible) { // verifie si le joueur est invincible(evite qu'il perde plusieurs vies en une seule collisoon)
            player.health -= 1; // diminue la vie du joueur de 1
            console.log("👻 Le joueur a été touché ! Vies restantes : " + player.health); // affihce un mess dans la consoles avec les vies restantes
           
            if (player.health >= 0 && this.coins[player.health]) { // supprime un coeur visuel si le joueur perd une vie, verifie que le joueur a encore des vies (playerhealth)
                this.coins[player.health].destroy(); // si le joueur commence avec une vie et quil en perd une this.coins est supp
            }
            // evite que le joueur perdre plusieurs vies d'un coup
            player.invincible = true;
           // le joueur ne peut pas etre touché pendant plusieurs instant
            player.invincible = true;
            
            this.tweens.add({ // fait clignoter le jouer en retrecite son opacite : alpha
                targets: player,
                alpha: 0.5, // opacité
                duration: 200, // dure 200 ùs
                yoyo: true,
                repeat: 5 // se repete 5 fois
            });
        
            this.tweens.add({ // mis en double
                targets: player,
                alpha: 0.5,
                duration: 200,
                yoyo: true,
                repeat: 5
            });
            this.time.delayedCall(1000, () => { // mis en double
                player.invincible = false;
                player.setAlpha(1);
            });
            this.time.delayedCall(1000, () => { // aprés une seconde le joueur rredevient vulnérable car invincible= false
                player.invincible = false;
                player.setAlpha(1); // remet son opacité normale 
            });
       
            if (player.health <= 0) { // verifie si le joueur a encore des vies
                console.log("💀 Plus de vies ! Game Over."); // si player health<0 il a plus de vies
                this.afficherGameOver(); // declenche this.afficherGameOver()
            }
        }
    }

    rencontrerRoi(player, roi) { // deux parametre , player= entite qui ramasse l'eppe , eppee = ce que le jouer ramasse, chacun est un objet
        

        this.dialogueRoi = this.add.text( // ajoute un texte sur l'ecran aligne a droite 
            this.cameras.main.width - 50, 
            200, // il est placé a 200 pixel en haut
            "👑 Philippe II Auguste :\n" + // utilise /n pour aller a la ligne
            "Bienvenue, aventurier !\n" +
            "Grâce à moi, le royaume de France s'est renforcé !\n" +
            "J'ai agrandi Paris et bâti des fortifications !\n\n" +
            "🎮 Règles du jeu :\n" +
            "- ⚔️ Récupère toutes les épées\n" +
            "- 👻 Évite les fantômes\n" +
            "- 🚪 Trouve la porte\n" +
            "- ❤️ Ne perds pas toutes tes vies\n\n" +
            "Bonne chance, noble guerrier !",
            {
                fontSize: "22px", // format du texte
                fill: "#FFF", // blanc
                align: "right", // aligné droit
                fontStyle: "bold" // gras
            }
        ).setOrigin(1, 0.5).setScrollFactor(0); // definit l'origine du texte a 1 en X et 0,5 en Y/ le texte reste fixe

      

    }


    afficherGameOver() {
        // Affiche "GAME OVER" en grand au centre de l'écran

        this.sound.play('sonmort'); // appelle le son son mort
        this.gameOverText = this.add.text(
            this.cameras.main.width / 2,// place l'element au centre horizontalement
            this.cameras.main.height / 2, // au centre verticalement 
            "GAME OVER",
            {
                fontSize: "80px",
                fill: "#FF0000", // Rouge pour l'effet dramatique
                fontStyle: "bold", // gras
                fontFamily: "Times New Roman"
            }
        );
        this.gameOverText.setOrigin(0.5); // posiitonne les elements par defaut, sans le set origin le texte serait legerement decalé
        this.gameOverText.setScrollFactor(0);

        // Désactive les contrôles du joueur
        this.player.setVelocity(0, 0); // empeche le joueur de bouger apres sa mort, sa vitesse X=0 et Y=0
        this.player.setTint(0x366666); // Effet de "mort", le perso est sombre
        this.physics.pause(); // Met en pause le jeu

    
        this.time.delayedCall(5000, () => { // redemarre le jue apres 5 seconde
            this.scene.restart();
        }, [], this);
    }


    attack() { // fonction marche pas le jeu beugue 
 
        this.fantomes.children.iterate((fantome) => { // parcourt tt les fantome 1 par 1 
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, fantome.x, fantome.y) < 50) { // calcule la distance entre le joueur et le fantome, si la distance est inferieur a 50 pixel alors l'attaque reussie
                fantome.destroy();// supprime le fantome qui est touche
            }
        });
    }



    ramasserEpee(player, epee) {
        console.log("🗡️ Épée ramassée !"); // affiche dans la console a chaque fois qu'une eppe est ramasse
        epee.destroy(); // Supprime l'épée ramassée
        score += 1; // le score augmente de 1 
        zone_texte_score.setText("Score: " + score); // met a jour l'affichafe du score 
    }
}