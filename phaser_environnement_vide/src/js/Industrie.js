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
var industry;
var MUSIQUE;
var Shot;
var Mort;
var footstep;
var Degats;
var door;
var boutondoor;
var groupeFireball;
var compteurCibleDetruite = 0;


//tire des cibles 
export default class Industrie extends Phaser.Scene {
    constructor() {
        super({ key: "Industrie" });
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
        this.load.spritesheet("fireball", "src/assets/fireball.png", { frameWidth: 95, frameHeight: 32 });
        this.load.image("HP", "src/assets/Coeur_HP.png");
        this.load.image("GameOverImage", "src/assets/GameOverNice.png");
        this.load.image("BoutonRetourMenu", "src/assets/BoutonRetour.png");
        this.load.audio('BOUM', 'src/assets/explosion.mp3');
        this.load.audio('factory', 'src/assets/factory.mp3');
        this.load.audio('MUSIQUE', 'src/assets/musique.mp3');
        this.load.audio('shot', 'src/assets/gun_shot.mp3');
        this.load.audio('footstep', 'src/assets/footstep_iron.mp3');
        this.load.audio('Degats', 'src/assets/BruitageDegats.mp3');
        this.load.audio('Mort', 'src/assets/Mort.mp3');

        this.load.spritesheet("door", "src/assets/door.png", { frameWidth: 71, frameHeight: 97 });

    }






    create() {
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
        industry = this.sound.add('factory'), { loop: true }, { volume: 1.5 };
        MUSIQUE = this.sound.add('MUSIQUE'), { loop: true }, { volume: 0.1 };
        Shot = this.sound.add('shot')
        Mort = this.sound.add('Mort'), { loop: false }, { volume: 1 };
        footstep = this.sound.add('footstep'), { loop: true }, { volume: 1 };
        Degats = this.sound.add('Degats'), { loop: false }, { volume: 1 };
        MUSIQUE.play();
        industry.play();
        door = this.physics.add.sprite(3500, 600, 'door');
        //
        this.player = this.physics.add.sprite(100, 600, "player");
        this.pants = this.physics.add.sprite(100, 600, "pants");
        this.shirt = this.physics.add.sprite(100, 600, "shirt");
        this.player.body.setSize(10, 40, true);
        this.player.body.setOffset(35, 22);
        this.pants.body.setSize(10, 40, true);
        this.pants.body.setOffset(35, 22);
        this.shirt.body.setSize(10, 40, true);
        this.shirt.body.setOffset(35, 22);
        this.player.direction = 'right';
        this.player.setScale(1.5);
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, plateform);
        this.pants.setScale(1.5);
        this.pants.setBounce(0.05);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.physics.add.collider(this.pants, plateform);
        this.shirt.setScale(1.5);
        this.shirt.setBounce(0.05);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.physics.add.collider(this.shirt, plateform);
        this.player.body.onWorldBounds = true;
        this.pants.body.onWorldBounds = true;
        this.shirt.body.onWorldBounds = true;
        // Création des pigèes ahhahahah
        door.body.immovable = true;
        door.body.setAllowGravity(false);
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
            frames: this.anims.generateFrameNumbers("Transporter3", { start: 0, end: 3 }),
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
        boutondoor = this.input.keyboard.addKey('F');
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

        this.physics.world.on("worldbounds", function (body) {
            var objet = body.gameObject;
            // s'il s'agit d'une balle
            if (groupeBullets.contains(objet)) {
                // on le détruit
                objet.destroy();
            }
        });
        this.physics.add.collider(groupeBullets, plateform, function (bullet) {
            bullet.destroy();
        });

        groupeCibles = this.physics.add.group({
            key: 'cible',
            repeat: 20,
            setXY: { x: 1240, y: 0, stepX: 300 }
        });
        groupeCibles.children.iterate(function (cible) {
            console.log("Ciblecree");
            cible.setScale(1.5);
            cible.body.setSize(18, 40, true);
            cible.fireballActive = false;
            cible.pointsVie = Phaser.Math.Between(1, 2);
            cible.y = Phaser.Math.Between(10, 250)
            cible.timer = this.time.addEvent({
                delay: Phaser.Math.Between(1000, 3000),
                callback: () => {
                    tirerFireball(cible);
                },
                callbackScope: this,
                loop: true
            });
        }, this);
        // Gestion des collisions entre les balles et les cibles    
        this.physics.add.overlap(groupeBullets, groupeCibles, hit, null, this);
        //////////////////////////////////////////
        // Gestion des collisions entre les balles et les bords du monde    
        this.physics.world.on("worldbounds", function (body) {
            // on récupère l'objet surveillé
            var objet = body.gameObject;
            // s'il s'agit d'une balle
            if (groupeBullets.contains(objet)) {
                // on le détruit
                objet.destroy();
            }
        });
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
        //////////////////////////////////////////
        // Gestion des collisions entre les players et le sol
        this.player.body.world.on(
            "worldbounds",
            function (body, up, down, left, right) {
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
        this.physics.add.collider(groupeCibles, plateform);
        this.physics.add.collider(groupeCibles, platmouv);
        this.physics.add.collider(groupeCibles, platmouv2);
        this.physics.add.collider(groupeCibles, platmouv3);

        this.anims.create({
            key: 'door',
            frames: this.anims.generateFrameNumbers('door', { start: 0, end: 4 }),
            frameRate: 6,
        })
// Création des fireballs
        groupeFireball = this.physics.add.group({
            defaultKey: 'fireball',
        });
        this.physics.add.collider(this.player, groupeFireball, this.playerHitFireball, null, this);
        this.physics.add.collider(groupeFireball, plateform, this.handlerDestructionFireball, null, this);
        this.physics.add.collider(groupeFireball, platmouv, this.handlerDestructionFireball, null, this);
        this.physics.add.collider(groupeFireball, platmouv2, this.handlerDestructionFireball, null, this);
        this.physics.add.collider(groupeFireball, platmouv3, this.handlerDestructionFireball, null, this);
        this.physics.world.on("worldbounds", function (body) {
            // on récupère l'objet surveillé
            var objet = body.gameObject;
            // s'il s'agit d'une fireball
            if (groupeFireball.contains(objet)) {
                // on le détruit
                objet.destroy();
            }
        });


    }
    update() {
        const isOnTransporter = this.physics.overlap(this.player, platmouv) || this.physics.overlap(this.player, platmouv2) || this.physics.overlap(this.player, platmouv3);

        // Logique pour tirer les fireball depuis les cibles
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
            footstep.play();
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
            footstep.play();
        } else {
            const velocity = isOnTransporter ? (this.player.direction === 'left' ? -100 : 100) : 0;
            this.player.setVelocityX(velocity);
            this.pants.setVelocityX(velocity);
            this.shirt.setVelocityX(velocity);
            this.player.anims.play("anim_face");
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
            footstep.stop();
        }
        if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.pants.setVelocityY(-400);
            this.player.setVelocityY(-400);
            this.shirt.setVelocityY(-400);
        }
        //////////////////////////
        // GESTION DU SOL
        if (sol) {
            this.time.delayedCall(1000, this.respawn, null, this);
            return;
        }
        // GESTION DES TIRS 
        if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
            tirer(this.player);
        }

        // GESTION DE LA PORTE
        if (boutondoor.isDown && this.physics.overlap(this.player, door) && compteurCibleDetruite == 0) {
            door.anims.play('door', true);
            door.on('animationcomplete', () => {
                // Arrêtez la musique
                if (MUSIQUE.isPlaying) {
                    MUSIQUE.stop();
                }
                if (industry.isPlaying) {
                    industry.stop();
                }
                // Lancez la scène Fin
                this.scene.stop('Industrie');
                this.scene.start('Fin');
            }, this);
        }

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
            Mort.play();
            this.add.image(960, 350, "GameOverImage").setScrollFactor(0);
            BoutonRetourMenu = this.add.image(960, 800, "BoutonRetourMenu").setScrollFactor(0);
            this.add.text(960, 800, "Retour au menu", { fontSize: "50px", color: "White", fontStyle: "bold", fontStyle: "Arial Black", origin: 0.5 }).setScrollFactor(0).setScale(3);
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
                this.shutdown();
                this.scene.start("menu");
            });
        }
        this.updateLivesDisplay();
    }
    resetLives() {
        this.hp = 3;
        this.updateLivesDisplay();
    }
    handlerDestructionFireball(fireball, plateform, platmouv, platmouv2, platmouv3) {
        if (fireball.texture.key === 'fireball') {
            fireball.destroy();
        }
    } 
    playerHitFireball(player, fireball) {
        if (fireball.texture.key === 'fireball') {
            this.hp--;
            Degats.play();
            fireball.destroy();
            this.updateLivesDisplay();
            if (this.hp <= 0) {
                this.respawn();
            } else {
                // Optionally, you can add a brief invincibility period here
                this.player.setTint(0xff0000); // Change player color to indicate damage
                this.time.delayedCall(500, () => {
                    this.player.clearTint(); // Reset player color
                }, [], this);
            }
        }




        if (boutondoor.isDown && this.physics.overlap(this.player, door)) {
            door.anims.play('door', true);
        }
    }
    shutdown() {
        if (MUSIQUE.isPlaying) {
            MUSIQUE.stop();
        }
        if (industry.isPlaying) {
            industry.stop();
        }
    }
}
function tirerFireball(cible) {
    console.log("ontire")
    if (cible.pointsVie > 0 && (cible.body.touching.down || cible.body.blocked.down)) {
        // Crée la fireball en utilisant le groupe correct
         var fireball = groupeFireball.create(cible.x, cible.y, 'fireball');

            fireball.setCollideWorldBounds(true);
            fireball.body.onWorldBounds = true;
            fireball.body.allowGravity = false;
            fireball.setVelocity(-400, 0); // Définit la vitesse de la fireball
            fireball.anims.play('fireball', true);
            cible.fireballActive = true;
            console.log("onatire")
            // Ajout d'un timer pour réinitialiser `cible.fireballActive`
            fireball.on('destroy', () => {
                cible.fireballActive = false;
            });
    }
}
function tirer(player) {
    var coefDir;
    if (player.direction == 'left') {
        coefDir = -1;
    } else {
        coefDir = 1;
    }
    // on crée la balle a coté du joueur
    var bullet = groupeBullets.create(player.x + (1 * coefDir), player.y - 4, 'bullet');
    Shot.play();
    // parametres physiques de la balle.
    bullet.setCollideWorldBounds(true);
    bullet.body.onWorldBounds = true;
    bullet.body.allowGravity = true;
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
        explosion.on('animationcomplete', function () {
            explosion.destroy();
        });

        cible.scene.sound.play('BOUM');
        cible.destroy();
        compteurCibleDetruite += 1;
        console.log(compteurCibleDetruite);
    }
    bullet.destroy();
}