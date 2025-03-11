var clavier;
var toucheEchelle;
var platmouv; 
var platmouv2;
var platmouv3;
var boutonFeu;
var groupeBullets;

function tirer(player) {
  var coefDir;
  if (player.direction == 'left') { 
    coefDir = -1; 
  } else { 
    coefDir = 1; 
  }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.allowGravity = false;
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y

  if (coefDir == -1) {
    bullet.anims.play('Bullet2', true);
  } else {
    bullet.anims.play('Bullet', true);
  }
}

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
        this.load.spritesheet("Transporter1", "src/assets/Transporter1.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Transporter2", "src/assets/Transporter2.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Transporter3", "src/assets/Transporter3.png", { frameWidth: 32, frameHeight: 32 });  
        this.load.spritesheet("bullet", "src/assets/Bullet.png", { frameWidth: 63, frameHeight: 48 });
        this.load.spritesheet("bullet2", "src/assets/Bullet - Copie.png", { frameWidth: 63, frameHeight: 48 });

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
        this.ladder = carteDuNiveau.createLayer("ladder", tileset);
        plateform.setCollisionByProperty({ estsolide: true }); 
        //
        this.player = this.physics.add.sprite(100, 600, "player");
        this.pants = this.physics.add.sprite(100, 600, "pants");
        this.shirt = this.physics.add.sprite(100, 600, "shirt");
        this.shoes = this.physics.add.sprite(100, 600, "shoes");
        this.player.body.setSize(18, 40, true); 
        this.player.body.setOffset(30, 22);
        this.pants.body.setSize(18, 40, true);
        this.pants.body.setOffset(30, 22);
        this.shirt.body.setSize(18, 40, true);
        this.shirt.body.setOffset(30, 22);
        this.shoes.body.setSize(18, 40, true);
        this.shoes.body.setOffset(30, 22);
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
        // Création des pigèes ahhahahah
        platmouv = this.add.sprite(1375, 950, 'Transporter1');
        platmouv2 = this.add.sprite(1407, 950, 'Transporter2');
        platmouv3 = this.add.sprite(1439, 950, 'Transporter3');      
        this.anims.create({
            key: "anim_transporter1",  
            frames: this.anims.generateFrameNumbers("Transporter1", { start: 0, end: 3 }),
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: "anim_transporter2",
            frames: this.anims.generateFrameNumbers("Transporter2", { start: 0, end: 3 }),  
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: "anim_transporter3",
            frames: this.anims.generateFrameNumbers("Transporter3", { start: 0, end: 3}),
            frameRate: 60,
            repeat: -1
        });
        platmouv.anims.play("anim_transporter1", true);
        platmouv2.anims.play("anim_transporter2", true);
        platmouv3.anims.play("anim_transporter3", true);
        this.physics.add.collider(this.player, platmouv);
        // Reste du code
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
        toucheEchelle = this.input.keyboard.addKey('E');
        clavier = this.input.keyboard.createCursorKeys();


        // GESTION DES TIRS
        boutonFeu = this.input.keyboard.addKey('A');
        groupeBullets = this.physics.add.group();
        this.anims.create({
          key: "Bullet",
          frames: this.anims.generateFrameNumbers("bullet", { start: 0, end: 6 }),
          frameRate: 60,
          repeat: -1
        });
        this.anims.create({
            key: "Bullet2",
            frames: this.anims.generateFrameNumbers("bullet2", { start: 0, end: 6 }),
            frameRate: 60,
            repeat: -1
            });
      


    }
    update() {
      if (toucheEchelle.isDown && this.isOnLadder(this.player)) {
        this.player.setVelocityY(-200) && this.player.setVelocityX(0);
        this.pants.setVelocityY(-200) && this.pants.setVelocityX(0);
        this.shirt.setVelocityY(-200) && this.shirt.setVelocityX(0);
        this.shoes.setVelocityY(-200) && this.shoes.setVelocityX(0);
      }else if (clavier.left.isDown) {
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
        this.pants.setVelocityY(-400);
        this.player.setVelocityY(-400);
        this.shirt.setVelocityY(-400);
        this.shoes.setVelocityY(-400);
      }
    
    
    
    
    // GESTION DES TIRS 
    if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      tirer(this.player);
   }
    
    
    
    
    }   
    isOnLadder(player) {
      const tile = this.ladder.getTileAtWorldXY(player.x, player.y);
      return tile && tile.properties.estladder;
  }
}