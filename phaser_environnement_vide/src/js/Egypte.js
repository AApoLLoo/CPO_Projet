var clavier;
var player;
export default class Egypte extends Phaser.Scene {
    constructor() {
        super({key : "Egypte"});
    }
    preload() {
        this.load.image("TuilesEgypte", "src/assets/TuilesEgypte.png");
        this.load.tilemapTiledJSON("MapEgypte2", "src/assets/MapEgypte2.json");
        //
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shoes", "src/assets/Shoes.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shoes2", "src/assets/Shoes - Copie.png", { frameWidth: 80, frameHeight: 64 });

    }
    create(){
        const carteDuNiveau2 = this.add.tilemap("MapEgypte2");
        const tileset = carteDuNiveau2.addTilesetImage("TuilesEgypte", "TuilesEgypte", 32, 32);
        const calque_background = carteDuNiveau2.createLayer("calque_background", tileset);
        const calque_background2 = carteDuNiveau2.createLayer("calque_background2", tileset);
        const calque_background4 = carteDuNiveau2.createLayer("calque_background4", tileset);
        const calque_background3 = carteDuNiveau2.createLayer("calque_background3", tileset);
        const calque_plateformes = carteDuNiveau2.createLayer("calque_plateformes", tileset);  
        // calque_plateformes.setCollisionByProperty({ estSolide: true }); 

        // const tileset = carteDuNiveau.addTilesetImage(
        //   "TuilesEgypte", "TuilesEgypte", 32 , 32);  
        // const calque_background = carteDuNiveau.createLayer("calque_background", tileset);
            //
        this.player = this.physics.add.sprite(100, 450, "player");
        this.pants = this.physics.add.sprite(100, 450, "pants");
        this.shirt = this.physics.add.sprite(100, 450, "shirt");
        this.shoes = this.physics.add.sprite(100, 450, "shoes");
        this.player.direction = 'right';
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.shoes.setBounce(0.2);
        this.shoes.setCollideWorldBounds(true);
        this.shoes.direction = 'right';
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
        this.anims.create({
            key: "anim_face_shoes",
            frames: [{ key: "shoes", frame: 4 }],
            frameRate: 20
            });
        this.anims.create({
            key: "anim_tourne_gauche_shoes",
            frames: this.anims.generateFrameNumbers("shoes", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_shoes",
            frames: this.anims.generateFrameNumbers("shoes2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shoes",
            frames: this.anims.generateFrameNumbers("shoes", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.message = this.add.text(400, 100, "Bienvenue en Egypte", { fontSize: "32px", color: "White" });
        this.message.setOrigin(0.5);
        this.time.delayedCall(10000, () => {
            this.message.destroy();
        }, [], this);
        this.clavier = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, calque_plateformes); 
    }
    
    update() {        
        if (this.clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.shirt.direction = 'left';
            this.shoes.direction = 'left';
            this.player.setVelocityX(-160);
            this.pants.setVelocityX(-160);
            this.shirt.setVelocityX(-160);
            this.shoes.setVelocityX(-160);
            this.player.anims.play("anim_tourne_gauche", true);
            this.pants.anims.play("anim_tourne_gauche_pants", true);
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);
            this.shoes.anims.play("anim_tourne_gauche_shoes", true);
          } else if (this.clavier.right.isDown) {
            this.player.direction = 'right';
            this.pants.direction = 'right';
            this.shirt.direction = 'right';
            this.shoes.direction = 'right';
            this.player.setVelocityX(160);
            this.pants.setVelocityX(160);
            this.shirt.setVelocityX(160);
            this.shoes.setVelocityX(160);
            this.player.anims.play("anim_tourne_droite", true);
            this.pants.anims.play("anim_tourne_droite_pants", true);
            this.shirt.anims.play("anim_tourne_droite_shirt", true);
            this.shoes.anims.play("anim_tourne_droite_shoes", true);
          } else {
            this.player.setVelocityX(0);
            this.pants.setVelocityX(0);
            this.shirt.setVelocityX(0);
            this.shoes.setVelocityX(0);
            this.player.anims.play("anim_face");
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
            this.shoes.anims.play("anim_face_shoes");
          }
        
          if (this.clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.shoes.anims.play("anim_saut_shoes", true);
            this.pants.setVelocityY(-330);
            this.player.setVelocityY(-330);
            this.shirt.setVelocityY(-330);
            this.shoes.setVelocityY(-330);
          } }
        
    }