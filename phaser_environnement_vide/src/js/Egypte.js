//déclarer des variables
var clavier; 
var player;
var groupe_parchemins;
var score = 0;
var zone_texte_score;
var teleporter;
var boutondoor;
var musique_fond;
var CompteurParchemin = 0;
var phrases;


// Classe Egypte qui étend Phaser.Scene
export default class Egypte extends Phaser.Scene {
    constructor() {
         // Appelle le constructeur de la classe parente avec la clé "Egypte"
        super({ key: "Egypte" });
         // Initialise isPaused à false (scène non en pause)
        this.isPaused = false;
    }


    preload() {
        // Charge les images, spritesheets et audios nécessaires pour la scène
        this.load.image("TuilesEgypte3", "src/assets/TuilesEgypte3.png");
        this.load.tilemapTiledJSON("MapEgypte", "src/assets/MapEgypte.json");
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.image("parchemin", "src/assets/parchemin.png");
        this.load.spritesheet("momie", "src/assets/momie.png", { frameWidth: 80, frameHeight: 80 });
        this.load.image("HP", "src/assets/Coeur_HP.png");
        this.load.image("Ramses", "src/assets/Ramses.png");
        this.load.audio('desert', 'src/assets/desert.mp3');
        this.load.image("ParcheminTexte", "src/assets/ParcheminImageTexte.png");
        this.load.spritesheet("teleporter", "src/assets/teleporter.png", { frameWidth: 154, frameHeight: 130 });
        this.load.audio('sonmort', 'src/assets/gameover.mp3');
    }


    create() {
        const carteDuNiveau2 = this.add.tilemap("MapEgypte");
        const tileset = carteDuNiveau2.addTilesetImage("TuilesEgypte3", "TuilesEgypte3", 32, 32);

        const calque_background = carteDuNiveau2.createLayer("calque_background", tileset);
        const calque_background2 = carteDuNiveau2.createLayer("calque_background2", tileset);
        const calque_background3 = carteDuNiveau2.createLayer("calque_background3", tileset);
        const calque_background4 = carteDuNiveau2.createLayer("calque_background4", tileset);
        const calque_plateformes = carteDuNiveau2.createLayer("calque_plateformes", tileset);
        calque_plateformes.setCollisionByProperty({ estSolide: true });

        //TELEPORTEUR
        // Création du téléporteur
        teleporter = this.physics.add.sprite(3700, 100, "teleporter"); //((3750), y, nom de l'image)
        teleporter.body.immovable = true;
        teleporter.setAllowGravity = false;
        // Collisions entre le téléporteur et les plateformes
        this.physics.add.collider(teleporter, calque_plateformes);
        // Animation du téléporteur (cycle d'images pour animation)
        this.anims.create({
            key: 'teleporter',
            frames: this.anims.generateFrameNumbers('teleporter', { start: 0, end: 5 }),
            frameRate: 4
            ,
        });
        //Création du bouton pour activer le léléporteur
        boutondoor = this.input.keyboard.addKey('F');

         //PLAYER
        this.player = this.physics.add.sprite(100, 600, "player");
        this.pants = this.physics.add.sprite(100, 600, "pants");
        this.shirt = this.physics.add.sprite(100, 600, "shirt");
        this.player.body.setSize(18, 40, true);
        this.player.body.setOffset(30, 22);
        this.pants.body.setSize(18, 40, true);
        this.pants.body.setOffset(30, 22);
        this.shirt.body.setSize(18, 40, true);
        this.shirt.body.setOffset(30, 22);
        this.player.direction = 'right';
        this.player.setScale(1.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, calque_plateformes);
        this.pants.setScale(1.5);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.physics.add.collider(this.pants, calque_plateformes);
        this.shirt.setScale(1.5);
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.physics.add.collider(this.shirt, calque_plateformes);
        this.anims.create({
            key: "anim_face",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "anim_tourne_gauche",
            frames: this.anims.generateFrameNumbers("player", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite",
            frames: this.anims.generateFrameNumbers("player2", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut",
            frames: this.anims.generateFrameNumbers("player", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_pants",
            frames: [{ key: "pants", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "anim_tourne_gauche_pants",
            frames: this.anims.generateFrameNumbers("pants", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_pants",
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
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 22, end: 24 }),
            frameRate: 4,
        });

        //CONSIGNES
        this.message = this.add.text(1000, 350,
            "Bienvenue en Égypte !\nTa mission : récupérer tous les parchemins sacrés\net éviter les momies qui hantent ces terres antiques.",
            { fontSize: "32px", color: "Black", fontFamily: "Papyrus", align: "center" }
        );
        this.message.setOrigin(0.5);
        this.time.delayedCall(10000, () => {
            this.message.destroy();
        }, [], this);

        //SON
        // Initialisation et lecture de la musique de fond
        if (!musique_fond) {
            musique_fond = this.sound.add("desert"), { volume: 0.05, loop: true };
        }
        if (musique_fond.isPlaying == false) {
            musique_fond.play();
        }

        //CLAVIER
        // Création des touches directionnelles
        clavier = this.input.keyboard.createCursorKeys();
        // Collision entre le joueur et les plateformes
        this.physics.add.collider(this.player, calque_plateformes);
        this.clavier = this.input.keyboard.createCursorKeys();
        // Attribuer la touche "Espace" pour l'attaque
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Définir les limites du monde physique
        this.physics.world.setBounds(0, 0, 3840, 1280);
        //Définir les limites du monde camera
        this.cameras.main.setBounds(0, 0, 3840, 1280);
        this.cameras.main.startFollow(this.player);

        //TEXTES POUR LES PARCHEMINS
        phrases = [
            "L'Égypte antique a duré plus de 3000 ans.",
            "Les pyramides ont été construites comme tombes pour les pharaons.",
            "Le Nil est le plus long fleuve du monde.",
            "Cléopâtre était la dernière reine d'Égypte.",
            "Les Égyptiens croyaient en plus de 2000 dieux.",
            "Le Sphinx de Gizeh a plus de 4500 ans.",
            "Les momies étaient embaumées pour l'au-delà.",
            "Le papyrus était utilisé pour écrire avant le papier.",
            "Les Égyptiens utilisaient des hiéroglyphes pour écrire.",
            "Le roi Toutankhamon est célèbre pour sa tombe intacte."
        ];
        // Mélanger aléatoirement les élements du tableau pour éviter la répétition 
        Phaser.Utils.Array.Shuffle(phrases);

        //PARCHEMIN
        // Crée un groupe de parchemins avec physique
        groupe_parchemins = this.physics.add.group();
        // Initialise l'index des phrases
        let indexPhrase = 0;
        for (var i = 0; i < 10; i++) {
            var coordX = 400 + 400 * i;
            // Crée le parchemin à la position calculée
            var parchemin = groupe_parchemins.create(coordX, 10, "parchemin");
            if (indexPhrase < phrases.length) {
                parchemin.phrase = phrases[indexPhrase]; // Assigner une phrase unique
                indexPhrase++;
            } else {
                parchemin.phrase = "Ancienne sagesse perdue..."; // Sécurité au cas où
            }
        }
        this.physics.add.collider(groupe_parchemins, calque_plateformes);
        groupe_parchemins.children.iterate(function iterateur(parchemin_i) {

            var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
            parchemin_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond 
            parchemin_i.setSize(70, 32); // on définit la taille du parchemin (Hitbox)
            parchemin_i.setOffset(60, 15); // on définit l'offset du parchemin (Hitbox)            
        });
        this.physics.add.overlap(this.player, groupe_parchemins, this.ramasserParchemin, null, this);

        //MOMIE       
        this.momies = this.physics.add.group();
        // Génère 3 momies avec un délai de 1 seconde entre chaque momie
        for (let i = 0; i < 3; i++) {
            this.time.delayedCall(i * 1000, () => { // Ajout d'un délai entre chaque momie
                let momie = this.momies.create(1000 + i * 700, 700, "momie"); // Augmentation de l'espacement
                // Collision avec les bords du monde
                momie.setCollideWorldBounds(true);
                 // Vitesse 
                momie.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100)); // Augmentation de la vitesse
                momie.health = 1;
            }, [], this);
        }
        this.physics.add.collider(this.momies, calque_plateformes);
        this.physics.add.overlap(this.player, this.momies, this.hitByMomie, null, this);
        this.physics.add.collider(this.player, calque_plateformes);

        //VIES
        this.player.health = 3; // Nombre initial de vies
        this.coins = []; // Tableau pour stocker les objets de cœur
        // Affichage des cœurs pour les vies
        for (let i = 0; i < this.player.health; i++) {
            this.coins.push(this.add.image(100 + i * 120, 120, "HP").setOrigin(0.5).setScrollFactor(0));
        }

        //SCORE
        zone_texte_score = this.add.text(this.cameras.main.width * 0.08, 200, 'SCORE : 0', {
            fontSize: '32px',
            fill: '#000',
            fontStyle: 'bold',
            fontFamily: 'Papyrus'
        }).setOrigin(0.5).setScrollFactor(0);

        //permettre au joueur de mourir et de recommencer la partie s'il touche les limites du monde
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true; // Active la détection des collisions avec les bords
        this.physics.world.on('worldbounds', () => {
            this.scene.restart(); // Redémarre le jeu si le joueur touche les bords du monde
        }, this);
    }


    update() {
        // Déplacement à gauche
        if (clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.shirt.direction = 'left';
            this.player.setVelocityX(-200);
            this.pants.setVelocityX(-200);
            this.shirt.setVelocityX(-200);
            this.player.anims.play("anim_tourne_gauche", true);
            this.pants.anims.play("anim_tourne_gauche_pants", true);
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);
            // Déplacement à droite
        } else if (clavier.right.isDown) {
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
            // Arrêt du déplacement
            this.player.setVelocityX(0);
            this.pants.setVelocityX(0);
            this.shirt.setVelocityX(0);
            this.player.anims.play("anim_face");
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
        }
        // Sauter
        if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.pants.setVelocityY(-450);
            this.player.setVelocityY(-450);
            this.shirt.setVelocityY(-450);

        }

        // Faire suivre les momies au joueur
        this.momies.children.iterate((momie) => {
            if (momie) {
                this.physics.moveToObject(momie, this.player, 50);
            }
        });

        // Attaque du joueur
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.attack();
        }
        // Vérifie si le joueur est sur le téléporteur et a assez de parchemins
        if (boutondoor.isDown && this.physics.overlap(this.player, teleporter) && CompteurParchemin > 8) {
            teleporter.anims.play('teleporter', true);
            teleporter.on('animationcomplete', () => {
                musique_fond.stop();
                this.scene.stop('Egypte');
                this.scene.start('Moyen_age');
            }, this);
        }
    }

    // Fonction pour gérer les collisions entre le joueur et les momie
    hitByMomie(player, momie) {
        if (!player.invincible) {
            player.health -= 1; // Le joueur perd une vie
            this.coins[player.health]?.destroy(); // Supprime un cœur correspondant à la perte de vie

            console.log("👻 Le joueur a été touché ! Vies restantes : " + player.health);

            player.invincible = true;
            // Effet de clignotement du joueur 
            this.tweens.add({
                targets: player,
                alpha: 0.5,
                duration: 200,
                yoyo: true,
                repeat: 5
            });
            // Fin d'invincibilité après 1s
            this.time.delayedCall(1000, () => {
                player.invincible = false;
                player.setAlpha(1);
            });
            // Si plus de vies, Game Over
            if (player.health <= 0) {
                console.log("Plus de vies ! Game Over.");
                this.afficherGameOver();
            }
        }
    }



    // Affiche "GAME OVER"
    afficherGameOver() {
        this.sound.play('sonmort');
        this.gameOverText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "GAME OVER",
            {
                fontSize: "80px",
                fill: "#FF0000", // Rouge pour l'effet dramatique
                fontStyle: "bold",
                fontFamily: "Times New Roman"
            }
        );
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setScrollFactor(0);

        // Désactive les contrôles du joueur
        this.player.setVelocity(0, 0);
        this.player.setTint(0x366666); // Effet de "mort"
        this.physics.pause(); // Met en pause le jeu

        // Redémarre la scène après **5 secondes**
        this.time.delayedCall(5000, () => {
            this.scene.restart();
        }, [], this);

    }

    attack() { 
        // Attaque du joueur avec un rayon de 50px
        this.momies.children.iterate((momie) => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, momie.x, momie.y) < 50) {
                momie.destroy();
            }
        });
    }

    // Affiche une phrase sur un parchemin
    showPhrase(phrase) {
        console.log("Affiche la phrase")
        let ImageTemp = this.add.image(1700, 300, "ParcheminTexte").setScrollFactor(0).setScale(0.8);
        let text = this.add.text(1700, 300, phrase, {
            fontSize: '30px',
            color: '#ffffff',
            align: "center",
            padding: { x: 3, y: 5 },
            wordWrap: { width: ImageTemp.width * 0.8, useAdvancedWrap: true }

        }).setOrigin(0.5).setScrollFactor(0);

        // Effacer le texte après 3 secondes
        this.time.delayedCall(3000, () => text.destroy(), [], this);
        this.time.delayedCall(3000, () => ImageTemp.destroy(), [], this);
    }
    
    // Fonction pour ramasser les parchemins
    ramasserParchemin(player, un_parchemin) {
        un_parchemin.destroy();
        if (un_parchemin.phrase) {
            this.showPhrase(un_parchemin.phrase); // Afficher la phrase correcte
        } else {
            console.log("⚠️ Problème : Pas de phrase attribuée à ce parchemin.");
        }
        score += 1;
        CompteurParchemin += 1;
        zone_texte_score.setText("SCORE : " + score);

    }
}








