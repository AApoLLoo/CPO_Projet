var clavier;
export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
    }
    preload() {
        this.load.image("TuilesDeJeuIndustrie1", "src/assets/TuilesJeux.png");
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAP_INDUSTRY.json"); 
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
        const carteDuNiveau = this.add.tilemap("Carte_Industrie");   
        const tileset = carteDuNiveau.addTilesetImage(
            "jeux_2_tuiles", "TuilesDeJeuIndustrie1", 32, 32
          );  
        const background = carteDuNiveau.createLayer("background", tileset);
        const light = carteDuNiveau.createLayer("light", tileset);
        const sun = carteDuNiveau.createLayer("sun", tileset);
        const fonds_4 = carteDuNiveau.createLayer("fonds_4", tileset);
        const fonds_3 = carteDuNiveau.createLayer("fonds_3", tileset);
        const fonds_2 = carteDuNiveau.createLayer("fonds_2", tileset);
        const fonds_1 = carteDuNiveau.createLayer("fonds_1", tileset);
        const plateform = carteDuNiveau.createLayer("plateform", tileset);
        plateform.setCollisionByProperty({ estsolide: true }); 
        //
        this.player = this.physics.add.sprite(100, 600, "player");
        this.pants = this.physics.add.sprite(100, 600, "pants");
        this.shirt = this.physics.add.sprite(100, 600, "shirt");
        this.shoes = this.physics.add.sprite(100, 600, "shoes");
        this.player.body.setSize(20, 60, true); 
        this.pants.body.setSize(20, 60, true);
        this.shirt.body.setSize(20, 60, true);
        this.shoes.body.setSize(20, 60, true);
        this.player.direction = 'right';
        this.player.setScale(1.5); 
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, plateform);
        this.pants.setScale(1.5);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.physics.add.collider(this.pants, plateform);
        this.shirt.setScale(1.5);
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.physics.add.collider(this.shirt, plateform);
        this.shoes.setScale(1.5);
        this.shoes.setBounce(0.2);
        this.shoes.setCollideWorldBounds(true);
        this.shoes.direction = 'right';
        this.physics.add.collider(this.shoes, plateform);
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
        this.message = this.add.text(400, 200, "Bienvenue dans l'air de l'insdustrie !", { fontSize: "32px", color: "White" });
        this.message.setOrigin(0.5);
        this.time.delayedCall(5000, () => {
            this.message.destroy();
        }, [], this);
        this.physics.world.setBounds(0, 0, 3840, 1280);
        this.cameras.main.setBounds(0, 0, 3840, 1280);
        this.cameras.main.startFollow(this.player);
        clavier = this.input.keyboard.createCursorKeys();

        //echelles test
        plateform.setCollisionByProperty({ estLadder: true }); 
        this.ladderTouchees = false;
        this.physics.add.overlap(this.player, ladder, () => {
        this.echellesTouchees = true;
          }, null, this);
          this.physics.add.overlap(this.pants, echelles, null, null, this);
          this.physics.add.overlap(this.shirt, echelles, null, null, this);
          this.physics.add.overlap(this.shoes, echelles, null, null, this);



    }
    update() {
      if (clavier.left.isDown) {
        this.player.direction = 'left';
        this.pants.direction = 'left';
        this.shirt.direction = 'left';
        this.shoes.direction = 'left';
        this.player.setVelocityX(-200);
        this.pants.setVelocityX(-200);
        this.shirt.setVelocityX(-200);
        this.shoes.setVelocityX(-200);
        this.player.anims.play("anim_tourne_gauche", true);
        this.pants.anims.play("anim_tourne_gauche_pants", true);
        this.shirt.anims.play("anim_tourne_gauche_shirt", true);
        this.shoes.anims.play("anim_tourne_gauche_shoes", true);
      } else if (clavier.right.isDown) {
        this.player.direction = 'right';
        this.pants.direction = 'right';
        this.shirt.direction = 'right';
        this.shoes.direction = 'right';
        this.player.setVelocityX(200);
        this.pants.setVelocityX(200);
        this.shirt.setVelocityX(200);
        this.shoes.setVelocityX(200);
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
    
      if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
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
    