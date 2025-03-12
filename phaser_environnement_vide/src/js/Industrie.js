var clavier;
var toucheEchelle;
var platmouv; 
var platmouv2;
var platmouv3;
var boutonFeu;
var groupeBullets;
var groupeCibles; 
var sol = false;
var BoutonRetourMenu;
var bouton;
var explosion;


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
  bullet.body.onWorldBounds = true;
  bullet.body.allowGravity = false;
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y

  if (coefDir == -1) {
    bullet.anims.play('Bullet2', true);
  } else {
    bullet.anims.play('Bullet', true);
  }
}
function hit(bullet, cible) {
  cible.pointsVie--;
  if (cible.pointsVie == 0) {
      // Jouer l'animation d'explosion
      var explosion = cible.scene.add.sprite(cible.x, cible.y, 'boum');
      explosion.play('explosion');
      explosion.on('animationcomplete', function() {
          explosion.destroy();
      });
      cible.destroy();
  }
  bullet.destroy();
}


function tirerFireball(cible) {
  if (cible.pointsVie > 0 && cible.body.blocked.down) {
      var fireball = groupeCibles.create(cible.x, cible.y, 'fireball');
      fireball.setCollideWorldBounds(true);
      fireball.body.onWorldBounds = true;
      fireball.body.allowGravity = false;
      fireball.setVelocity(-400, 0); // vitesse en x et en y
      fireball.anims.play('fireball', true);


  }
}


//tire des cibles 


export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
        this.hp = 3;
        this.spawn = { x: 100, y: 580 };
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
        this.load.spritesheet("Transporter1", "src/assets/Transporter1.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Transporter2", "src/assets/Transporter2.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Transporter3", "src/assets/Transporter3.png", { frameWidth: 32, frameHeight: 32 });  
        this.load.spritesheet("bullet", "src/assets/Bullet.png", { frameWidth: 63, frameHeight: 48 });
        this.load.spritesheet("bullet2", "src/assets/Bullet - Copie.png", { frameWidth: 63, frameHeight: 48 });
        this.load.image("cible", "src/assets/Cible.png");
        this.load.spritesheet("boum", "src/assets/boum.png", { frameWidth: 120, frameHeight: 120 });
        this.load.spritesheet("fireball", "src/assets/fireball (2).png", { frameWidth: 95, frameHeight: 32 });
    
        this.load.image("HP", "src/assets/Coeur_HP.png");
        this.load.image("GameOverImage", "src/assets/GameOverNice.png");
        this.load.image("BoutonRetourMenu", "src/assets/BoutonRetour.png");

        this.load.audio('BOUM', 'src/assets/explosion.mp3');
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
        const smog = carteDuNiveau.createLayer("smog", tileset);
        this.ladder = carteDuNiveau.createLayer("ladder", tileset);
        plateform.setCollisionByProperty({ estsolide: true });
        //
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
        this.player.body.onWorldBounds = true;
        this.pants.body.onWorldBounds = true;
        this.shirt.body.onWorldBounds = true;
        // Création des pigèes ahhahahah
        platmouv = this.physics.add.sprite(1375, 950, 'Transporter1');
        platmouv2 = this.physics.add.sprite(1407, 950, 'Transporter2');
        platmouv3 = this.physics.add.sprite(1439, 950, 'Transporter3');
        platmouv.body.setAllowGravity(false);
        platmouv.body.immovable = true;
        platmouv2.body.setAllowGravity(false);
        platmouv2.body.immovable = true;
        platmouv3.body.setAllowGravity(false);
        platmouv3.body.immovable = true;   
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
        this.physics.add.collider(this.player, platmouv2);                              
        this.physics.add.collider(this.player, platmouv3);
        this.physics.add.collider(this.pants, platmouv);
        this.physics.add.collider(this.pants, platmouv2);
        this.physics.add.collider(this.pants, platmouv3);
        this.physics.add.collider(this.shirt, platmouv);
        this.physics.add.collider(this.shirt, platmouv2);
        this.physics.add.collider(this.shirt, platmouv3);
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
          frames: this.anims.generateFrameNumbers("bullet", { start: 0, end: 5 }),
          frameRate: 60,
          repeat: -1
        });
        this.anims.create({
            key: "Bullet2",
            frames: this.anims.generateFrameNumbers("bullet2", { start: 0, end: 5 }),
            frameRate: 60,
            repeat: -1
            });

            this.physics.world.on("worldbounds", function(body) {
        // on récupère l'objet surveillé
        var objet = body.gameObject;
        // s'il s'agit d'une balle
        if (groupeBullets.contains(objet)) {
            // on le détruit
            objet.destroy();
        }
        });
        this.physics.add.collider(groupeBullets, plateform, function(bullet) {
            bullet.destroy();
        });
        
        groupeCibles = this.physics.add.group({
            key: 'cible',
            repeat: 40,
            setXY: { x: 1280, y: 0, stepX: 200 }
        });  
        groupeCibles.children.iterate(function (cible) {
            cible.setScale(1.5);
            cible.body.setSize(18, 40, true);
        });
        groupeCibles.children.iterate(function (cibleTrouvee) {
            cibleTrouvee.pointsVie=Phaser.Math.Between(1, 2);
            cibleTrouvee.y = Phaser.Math.Between(10,250);
            });    
        this.physics.add.collider(groupeCibles, plateform); 
        // Gestion des collisions entre les balles et les cibles    
        this.physics.add.overlap(groupeBullets, groupeCibles, hit, null,this);
        // Gestion des collisions entre les balles et les bords du monde    
        this.physics.world.on("worldbounds", function(body) {
            // on récupère l'objet surveillé
            var objet = body.gameObject;
            // s'il s'agit d'une balle
            if (groupeBullets.contains(objet)) {
                // on le détruit
                objet.destroy();
            }
        });

        //destuction des cibles
        this.anims.create({
          key: 'explosion',
          frames: this.anims.generateFrameNumbers('boum', { start: 0, end: 11 }),
          frameRate: 10,
          repeat: 0
      });



      // tirs des cibles
      this.anims.create({
        key: 'fireball',
        frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3 }), // Ajuste `end` selon le nombre de frames
        frameRate: 10,  // -1 pour boucle infinie, sinon mets 0 pour une seule lecture
        repeat: -1
    });
    
    




      groupeCibles.children.iterate(function (cible) {
        if (cible.pointsVie > 0) {
            tirerFireball(cible);
        }
    });
      this.player.body.world.on(
        "worldbounds",
        function(body, up, down, left, right) {
            if (body.gameObject == (this.player || this.pants || this.shrit) && down) {
                this.respawn(); // Appelle respawn directement
            }
        },
        this
    );    
    this.hpContainer = this.add.group();
    for (let i = 0; i < this.hp; i++) {
    let heart = this.add.image(50 + i * 80, 50, "HP").setScrollFactor(0).setScale(0.5);
    this.hpContainer.add(heart);
    }
    this.resetLives();
      
    }
    update() {
        const isOnTransporter = this.physics.overlap(this.player, platmouv) || this.physics.overlap(this.player, platmouv2) || this.physics.overlap(this.player, platmouv3);

        if (toucheEchelle.isDown && this.isOnLadder(this.player)) {
            this.player.setVelocityY(-200);
            this.player.setVelocityX(0);
            this.pants.setVelocityY(-200);
            this.pants.setVelocityX(0);
            this.shirt.setVelocityY(-200);
            this.shirt.setVelocityX(0);
        } else if (clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.shirt.direction = 'left';
            const velocity = isOnTransporter ? -100 : -200;
            this.player.setVelocityX(velocity);
            this.pants.setVelocityX(velocity);
            this.shirt.setVelocityX(velocity);
            this.player.anims.play("anim_tourne_gauche", true);
            this.pants.anims.play("anim_tourne_gauche_pants", true);
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);
        } else if (clavier.right.isDown) {
            this.player.direction = 'right';
            this.pants.direction = 'right';
            this.shirt.direction = 'right';
            const velocity = isOnTransporter ? 100 : 200;
            this.player.setVelocityX(velocity);
            this.pants.setVelocityX(velocity);
            this.shirt.setVelocityX(velocity);
            this.player.anims.play("anim_tourne_droite", true);
            this.pants.anims.play("anim_tourne_droite_pants", true);
            this.shirt.anims.play("anim_tourne_droite_shirt", true);
        } else {
            const velocity = isOnTransporter ? (this.player.direction === 'left' ? -100 : 100) : 0;
            this.player.setVelocityX(velocity);
            this.pants.setVelocityX(velocity);
            this.shirt.setVelocityX(velocity);
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
        if (sol) {
            this.time.delayedCall(1000, this.respawn, null, this);  
            return;
          }
        // GESTION DES TIRS 
        if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
            tirer(this.player);
        }



        // tire des cibles 
  groupeCibles.children.iterate(function (cible) {
    if (cible.pointsVie > 0) {
        tirerFireball(cible);
    }else{ 
      explosion.play
    
}
    });

    }   
    isOnLadder(player) {
      const tile = this.ladder.getTileAtWorldXY(player.x, player.y);
      return tile && tile.properties.estladder;
  }

  updateLivesDisplay() {
    this.hpContainer.clear(true, true);
    for (let i = 0; i < this.hp; i++) {
        let heart = this.add.image(50 + i * 80, 50, "HP").setScrollFactor(0).setScale(0.5);
        this.hpContainer.add(heart);
    }
}


respawn() {
    console.log("Respawn appelé !");
    this.hp--;

    if (this.hp > 0) {
        this.player.setPosition(this.spawn.x, this.spawn.y);
        this.pants.setPosition(this.spawn.x, this.spawn.y);
        this.shirt.setPosition(this.spawn.x, this.spawn.y);
        this.physics.pause();
        this.time.delayedCall(500, () => {
            this.physics.resume();
        }, [], this);
    } else {
        this.add.image(960, 540, "GameOverImage");
        BoutonRetourMenu = this.add.image(960, 1000, "BoutonRetourMenu");
        this.add.text(960, 1000, "Retour au menu", { fontSize: "50px", color: "White" , fontStyle: "bold", fontStyle:"Arial Black", origin: 0.5});
        this.physics.pause();
        this.player.setTint(0xff0000);
        BoutonRetourMenu.setInteractive();
        BoutonRetourMenu.on("pointerover", () => {
            BoutonRetourMenu.setTint(0x00ff00);
        });
        BoutonRetourMenu.on("pointerout", () => {
            BoutonRetourMenu.clearTint();
        });
        BoutonRetourMenu.on("pointerup", () => {
            this.scene.start("menu");
        });
    }
    this.updateLivesDisplay();
}
resetLives() {
    this.hp = 3;
    this.updateLivesDisplay();
}
}  