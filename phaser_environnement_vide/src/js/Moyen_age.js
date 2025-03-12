var clavier;
var player;
var groupe_parchemins;
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
    
    


    }
    create(){
    
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
        this.message = this.add.text(400, 300, "Bienvenue au Moyen-âge", { fontSize: "32px", color: "White" });
        this.message.setOrigin(0.5);
        this.time.delayedCall(10000, () => {
            this.message.destroy();
        }, [], this);
        clavier = this.input.keyboard.createCursorKeys();


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
        this.healthText = this.add.text(300, 400, "Vies❤️: " + this.player.health, { fontSize: "24px", fill: "#FFF" });

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
            this.pants.setVelocityY(-550);
            this.player.setVelocityY(-550);
            this.shirt.setVelocityY(-550);
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
}

hitByFantome(player, fantome) {
        if (!player.invincible) { // Vérifie si le joueur est déjà invincible
            player.health -= 1; // Perd seulement une vie
            this.healthText.setText("Vies: " + player.health);
            console.log("👻 Le joueur a été touché ! Vies restantes : " + player.health);
            
            player.invincible = true; // Active l'invincibilité temporaire
    
            // Clignotement du joueur pour montrer l'invincibilité
            this.tweens.add({
                targets: player,
                alpha: 0.5, // Le joueur devient un peu transparent
                duration: 200, // 200ms par clignotement
                yoyo: true,
                repeat: 5 // Fait 5 clignotements
            });
    
            // Désactive l'invincibilité après 1 seconde
            this.time.delayedCall(1000, () => {
                player.invincible = false; // Le joueur peut être touché à nouveau
                player.setAlpha(1); // Remet l'opacité normale
            });
    
            // Vérifie si le joueur a encore des vies
            if (player.health <= 0) {
                console.log("☠️ Plus de vies ! Game Over.");
                this.scene.restart(); // Redémarre la scène si plus de vies
            }
        }
    }


attack() {
    // Tuer les momies proches
    this.momies.children.iterate((momie) => {
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, momie.x, momie.y) < 50) {
            momie.destroy();
        }
    });
    }

ramasserEpee(player, epee) {
    console.log("🗡️ Épée ramassée !");
    epee.destroy(); // Supprime l'épée quand elle est ramassée
}
}