var clavier;
var player;
var groupe_parchemins;
var score = 0;
var zone_texte_score;
var teleporteur;
var boutondoor;
var musique_fond;
var CompteurParchemin = 0;

export default class Egypte extends Phaser.Scene {
    constructor() {
        super({key : "Egypte"});
    }
    preload() {
        this.load.image("TuilesEgypte3", "src/assets/TuilesEgypte3.png");
        this.load.tilemapTiledJSON("MapEgypte", "src/assets/MapEgypte.json");
        //
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt", "src/assets/Shirt.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("shirt2", "src/assets/Shirt - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.image("parchemin", "src/assets/parchemin.png"); 
        this.load.spritesheet("momie", "src/assets/momie.png", { frameWidth: 80, frameHeight: 80}); 
        this.load.image("HP", "src/assets/Coeur_HP.png");
        this.load.image("Ramses", "src/assets/Ramses.png");
        this.load.audio('desert', 'src/assets/desert.mp3');



        //teleporteur
        this.load.spritesheet("teleporteur", "src/assets/teleporter.png", { frameWidth: 154, frameHeight: 130}); 
   

    }
    create(){
        const carteDuNiveau2 = this.add.tilemap("MapEgypte");
        const tileset = carteDuNiveau2.addTilesetImage("TuilesEgypte3", "TuilesEgypte3", 32, 32);

        const calque_background = carteDuNiveau2.createLayer("calque_background", tileset);
        const calque_background2 = carteDuNiveau2.createLayer("calque_background2", tileset);
        const calque_background3 = carteDuNiveau2.createLayer("calque_background3", tileset);
        const calque_background4 = carteDuNiveau2.createLayer("calque_background4", tileset);
        const calque_plateformes = carteDuNiveau2.createLayer("calque_plateformes", tileset);  
        calque_plateformes.setCollisionByProperty({ estSolide: true }); 

 
        //teleporteur
        teleporteur=this.physics.add.sprite(150, 100, "teleporteur"); //((3750), y, nom de l'image)
        teleporteur.body.immovable = true;
        teleporteur.setAllowGravity = false;  
        this.physics.add.collider(teleporteur, calque_plateformes);
        this.anims.create({
            key: 'teleporteur',
            frames: this.anims.generateFrameNumbers('teleporteur', { start: 0, end: 5 }),
            frameRate: 4
            ,
            });

            boutondoor= this.input.keyboard.addKey('F');





        

        this.player = this.physics.add.sprite(100, 600, "player");
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
        this.message = this.add.text(1000, 350, 
            "Bienvenue en Égypte !\nTa mission : récupérer tous les parchemins sacrés\net éviter les momies qui hantent ces terres antiques.", 
            { fontSize: "32px", color: "Black", fontFamily: "Papyrus", align: "center" }
        );
        this.message.setOrigin(0.5);
        this.time.delayedCall(10000, () => {
            this.message.destroy();
        }, [], this);
//SON
musique_fond = this.sound.add('desert'), {loop: true}, {volume: 0.1};
musique_fond.play();
//CLAVIER
        clavier = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, calque_plateformes); 

        this.clavier = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, 3840, 1280);
        this.cameras.main.setBounds(0, 0, 3840, 1280);
        this.cameras.main.startFollow(this.player);

 //PARCHEMIN
        groupe_parchemins = this.physics.add.group();
        for (var i = 0; i < 10; i++) {
            var coordX = 400 + 400 * i;
            groupe_parchemins.create(coordX, 10, "parchemin");
          } 

        this.physics.add.collider(groupe_parchemins, calque_plateformes); 

        groupe_parchemins.children.iterate(function iterateur(parchemin_i) {
            
            var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
            parchemin_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond 
            parchemin_i.setSize(70, 32); // on définit la taille du parchemin (Hitbox)
            parchemin_i.setOffset(60, 15); // on définit l'offset du parchemin (Hitbox)
            
          }); 
        this.physics.add.overlap(this.player, groupe_parchemins, ramasserParchemin, null, this);

 //MOMIE       
        this.momies = this.physics.add.group();
        for (let i = 0; i < 4; i++) {
            this.time.delayedCall(i * 1000, () => { // Ajout d'un délai entre chaque momie
                let momie = this.momies.create(1000 + i * 600, 600, "momie"); // Augmentation de l'espacement
                momie.setCollideWorldBounds(true);
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
            this.pants.setVelocityY(-450);
            this.player.setVelocityY(-450);
            this.shirt.setVelocityY(-450);
            
          }
          


          
// Faire suivre les momies
 this.momies.children.iterate((momie) => {
    if (momie) {
        this.physics.moveToObject(momie, this.player, 50);
    }
});

// Attaque du joueur
if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
    this.attack();
}
if (boutondoor.isDown && this.physics.overlap(this.player, teleporteur) && CompteurParchemin == 0) {
    teleporteur.anims.play('teleporteur', true);
    teleporteur.on('animationcomplete', () => {
        musique_fond.stop();
        this.scene.stop('Egypte');
        this.scene.start('Moyen_age');
    }, this);
}

}

hitByMomie(player, momie) {
    if (!player.invincible) {
        player.health -= 1; // Le joueur perd une vie
        this.coins[player.health]?.destroy(); // Supprime un cœur correspondant à la perte de vie

        console.log("👻 Le joueur a été touché ! Vies restantes : " + player.health);

        player.invincible = true;

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

        if (player.health <= 0) {
            console.log("Plus de vies ! Game Over.");
            this.scene.restart();
        }
    }
}

attack() {

// Tuer par les momies proches
this.momies.children.iterate((momie) => {
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, momie.x, momie.y) < 50) {
        momie.destroy();
    }
});
}


}

//Fonction pour ramasser les parchemins
function ramasserParchemin(player, un_parchemin) {
        un_parchemin.disableBody(true, true);
        score += 1;
        CompteurParchemin += 1;
        zone_texte_score.setText("SCORE : " + score);
      
      } 






       
   