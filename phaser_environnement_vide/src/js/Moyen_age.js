var clavier;
export default class Moyen_age extends Phaser.Scene {
    constructor() {
        super({key : "Moyen_age"});
    }   
    preload() {
     
    this.load.image("Sanstitre", "src/assets/Sanstitre.png");
    this.load.tilemapTiledJSON("MAPmoyenage", "src/assets/MAPmoyenage.json"); 
    this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });
    this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
    }
    create(){

        const carteDuNiveau3 = this.add.tilemap("MAPmoyenage");   
        const tileset = carteDuNiveau3.addTilesetImage( "Sans titre", "tuilemoyenage",32,32);  
        const calque_background = carteDuNiveau3.createLayer("calque background", tileset);
        const calque_2 = carteDuNiveau3.createLayer("calque_2", tileset);
        const calque_3 = carteDuNiveau3.createLayer("calque_3", tileset);
        const calque_4 = carteDuNiveau3.createLayer("calque_4", tileset);
        calque_2.setCollisionByProperty({ estSolide: true }); 
        calque_3.setCollisionByProperty({ estSolide: true }); 
        calque_4.setCollisionByProperty({ estSolide: true }); 

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
        this.physics.add.collider(this.player, calque_3);
        this.physics.add.collider(this.player, calque_4);
        this.pants.setScale(1.5);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.physics.add.collider(this.pants, calque_2);
        this.physics.add.collider(this.pants, calque_3);
        this.physics.add.collider(this.pants, calque_4);
        this.shirt.setScale(1.5);
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.physics.add.collider(this.shirt, calque_2);
        this.physics.add.collider(this.shirt, calque_3);
        this.physics.add.collider(this.shirt, calque_4);
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
        this.physics.world.setBounds(0, 0, 3200, 640);
        this.cameras.main.setBounds(0, 0, 3200, 640);
        this.cameras.main.startFollow(this.player);
    }
    
    update() {
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
            this.pants.setVelocityY(-400);
            this.player.setVelocityY(-400);
            this.shirt.setVelocityY(-400);
          }       
}
}
