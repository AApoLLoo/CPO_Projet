var clavier;
var player;
var score = 0;
var zone_texte_score;
var musique_de_fond;
var TP;
var boutondoor;
var sonRoi;

export default class Moyen_age extends Phaser.Scene {
    constructor() {
        super({key : "Moyen_age"});
    }   
    preload() {
     
        
    this.load.image("tuilesmoyenage", "src/assets/tuilesmoyenage.png");
    this.load.tilemapTiledJSON("MAPmoyenage", "src/assets/MAPmoyenage.json"); 
    this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("fantome", "src/assets/fantome.png", { frameWidth: 630, frameHeight: 396}); // Ajout gobelins
    this.load.image("epee", "src/assets/epee.png"); // Ajoute l'image de l'épée
    this.load.image("HP", "src/assets/Coeur_HP.png");
    this.load.audio('medieval', 'src/assets/medieval.mp3');   
    this.load.spritesheet("TP", "src/assets/teleporter1.png", { frameWidth: 154, frameHeight: 130}); 
    this.load.audio('sonmort', 'src/assets/gameover.mp3'); // Remplace par le chemin correct
    this.load.image("roi", "src/assets/roi.png"); // Remplace par le bon chemin
    this.load.audio("dialogueroi", "src/assets/roi.mp3"); // Remplace par le bon fichier audio


    }
    create(){


// Ajout du roi sur une plateforme solide


        musique_de_fond = this.sound.add('medieval'); 
        musique_de_fond.play();  
        this.score = 0;
        this.scoreText = this.add.text(50, 80, "Score: " + this.score, { 
            fontSize: "24px", 
            fill: "#FFF" 
        }).setScrollFactor(0);
        
    
        const carteDuNiveau3 = this.add.tilemap("MAPmoyenage");
        const tileset = carteDuNiveau3.addTilesetImage("tuilesmoyenage");
        const calque_background = carteDuNiveau3.createLayer("calque_background", tileset);
        const calque_2 = carteDuNiveau3.createLayer("calque_2", tileset);
        const calque_3 = carteDuNiveau3.createLayer("calque_3", tileset);
        calque_2.setCollisionByProperty({ estSolide: true });
    

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
        this.physics.add.collider(this.player, calque_2);
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
            frames: this.anims.generateFrameNumbers("player2", { start: 14, end: 16}),
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
            frames: this.anims.generateFrameNumbers("pants2", { start: 14, end: 16}),
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
            frames: this.anims.generateFrameNumbers("shirt2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 22, end: 24 }),
            frameRate: 4,
        });
       
        clavier = this.input.keyboard.createCursorKeys();

// Affichage des règles du jeu





        this.fantomes = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            this.time.delayedCall(i * 1000, () => { // Ajout d'un délai entre chaque momie
                let fantome = this.fantomes.create(1000 + i * 800, 600, "fantome"); // Augmentation de l'espacement
                fantome.setCollideWorldBounds(true);
                fantome.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100)); // Augmentation de la vitesse
                fantome.health = 1;
            }, [], this);
        }

        this.physics.add.collider(this.fantomes, calque_2);
        this.physics.add.overlap(this.player, this.fantomes, this.hitByFantome, null, this);
        this.physics.add.collider(this.player, calque_2); 


        this.player.health = 3;
        

        // Clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, 3840, 1280);
        this.cameras.main.setBounds(0, 0, 3840, 1280);
        this.cameras.main.startFollow(this.player);

        // Groupe d'épées statiques (elles ne tombent pas)
this.epees = this.physics.add.staticGroup();

// Liste des positions des épées
let positionsEpees = [
    { x: 455, y: 620 },
    { x: 1280, y: 850 },
    { x: 2850, y:1000},
    { x: 3210, y: 700},
];

// Ajout des épées dans le niveau
positionsEpees.forEach(pos => {
    this.epees.create(pos.x, pos.y, "epee").setScale(0.5); // Place les épées et réduit la taille
});


// Détecte quand le joueur touche une épée
this.physics.add.overlap(this.player, this.epees, this.ramasserEpee, null, this);

//VIES
this.player.health = 3; // Nombre initial de vies
this.coins = []; // Tableau pour stocker les objets de cœur

// Affichage des cœurs pour les vies
for (let i = 0; i < this.player.health; i++) {
   this.coins.push(this.add.image(100 + i * 120, 120, "HP").setOrigin(0.5).setScrollFactor(0));
}
   
//SCORE
zone_texte_score = this.add.text(this.cameras.main.width / 2, 50, 'SCORE : 0', { 
   fontSize: '64px', 
   fill: '#FFF', 
   fontStyle: 'bold',
   fontFamily: 'Times New Roman' // Remplacer ici par la police de ton choix
}).setOrigin(0.5).setScrollFactor(0);


//TELEPORTATION
TP=this.physics.add.sprite(3700, 100, "TP");
        TP.body.immovable = true;
        TP.setAllowGravity = false;  
        this.physics.add.collider(TP, calque_2);
        this.anims.create({
            key: 'teleporteur',
            frames: this.anims.generateFrameNumbers('TP', { start: 0, end: 5 }),
            frameRate: 4
            ,
            });
boutondoor=this.input.keyboard.addKey('F');

this.roi = this.physics.add.staticSprite(400, 1000, "roi").setScale(1.2);
 
this.physics.add.collider(this.roi, calque_2);
// Détection de la rencontre avec le roi
this.physics.add.overlap(this.player, this.roi, this.rencontrerRoi, null, this);










   }

    
    update() {        
        if (clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.shirt.direction = 'left';
            this.player.setVelocityX(-400);
            this.pants.setVelocityX(-400);
            this.shirt.setVelocityX(-400);
            this.player.anims.play("anim_tourne_gauche", true);
            this.pants.anims.play("anim_tourne_gauche_pants", true);
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);
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
            this.player.setVelocityX(0);
            this.pants.setVelocityX(0);
            this.shirt.setVelocityX(0);
            this.player.anims.play("anim_face");
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
          }
          if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.pants.setVelocityY(-420);
            this.player.setVelocityY(-420);
            this.shirt.setVelocityY(-420);
          }
 // Faire suivre les gobelins
 this.fantomes.children.iterate((fantome) => {
    if (fantome) {
        this.physics.moveToObject(fantome, this.player, 50);
    }
});

// Attaque du joueur
if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
    this.attack();

}

// Téléportation
if (boutondoor.isDown && this.physics.overlap(this.player, TP)) {
    TP.anims.play('teleporteur', true);
    

}


if (boutondoor.isDown && this.physics.overlap(this.player, TP)) {
    TP.anims.play('teleporteur', true);
    TP.on('animationcomplete', () => {
        // Arrêtez la musique
        // // if (MUSIQUE.isPlaying) {
        //     MUSIQUE.stop();
        // }
        // if (industry.isPlaying) {
        //     industry.stop();
        // }
        // // Lancez la scène Fin
        this.scene.stop('Moyen_age');
        this.scene.start('Industrie');
    }, this);
}






}


hitByFantome(player, fantome) {
    if (!player.invincible) {
        player.health -= 1; // Le joueur perd une vie

        console.log("👻 Le joueur a été touché ! Vies restantes : " + player.health);

        // Vérifie que le joueur a encore des vies avant de supprimer un cœur
        if (player.health >= 0 && this.coins[player.health]) {
            this.coins[player.health].destroy(); // Supprime un cœur
        }

        // Activer l'invincibilité temporaire
        player.invincible = true;

        // Effet visuel d'invincibilité
        this.tweens.add({
            targets: player,
            alpha: 0.5,
            duration: 200,
            yoyo: true,
            repeat: 5
        });

        this.time.delayedCall(1000, () => {
            player.invincible = false;
            player.setAlpha(1);
        });

        // Vérifie si le joueur a encore des vies
        if (player.health <= 0) {
            console.log("💀 Plus de vies ! Game Over.");
            this.afficherGameOver();
        }
    }
}

rencontrerRoi(player, roi) {
    // Arrête la musique médiévale
    if (musique_de_fond.isPlaying) {
        musique_de_fond.stop();
    }

    // Affiche le texte du roi à droite de l'écran
    this.dialogueRoi = this.add.text(
        this.cameras.main.width - 50, // Position X (à droite)
        200, // Position Y
        "👑 Philippe II Auguste :\n" +
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
            fontSize: "22px",
            fill: "#FFF",
            align: "right",
            fontStyle: "bold"
        }
    ).setOrigin(1, 0.5).setScrollFactor(0);

    // Joue le son du roi et récupère la durée
    sonRoi = this.sound.add('medieval');
    sonRoi.play();
    

    // Met le jeu en pause

    // Quand le son du roi se termine, on reprend la musique et le jeu
    sonRoi.once('complete', () => {
        this.dialogueRoi.destroy(); // Supprime le texte
        this.physics.resume(); // Reprend le jeu
        musique_de_fond.play(); // Redémarre la musique médiévale
    });
}


afficherGameOver() {
    // Affiche "GAME OVER" en grand au centre de l'écran
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
    // Tuer les momies proches
    this.fantomes.children.iterate((momie) => {
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, fantome.x, fantome.y) < 50) {
            fantome.destroy();
        }
    });
}


 
ramasserEpee(player, epee) {
    console.log("🗡️ Épée ramassée !");
    epee.destroy(); // Supprime l'épée ramassée
    score += 1;
  zone_texte_score.setText("Score: " + score); 
}
}