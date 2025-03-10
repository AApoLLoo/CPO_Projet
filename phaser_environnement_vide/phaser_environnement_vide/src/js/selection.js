/* variables globales accessibles dans toutes les fonctions */
var player;
var groupe_etoiles; // contient tous les sprite etoiles
var groupe_bombes; // contient tous les sprite bombes
var groupe_plateformes; // contient toutes les plateformes
var clavier; // pour la gestion du clavier
var score = 0; // pour enregistrer le score
var zone_texte_score; // pour afficher le score du joueur
var gameOver = false; // pour savoir si le jeu est terminé
var porte; // pour la porte de sortie
var boutonFeu;
var groupeBullets;
var groupeCibles; 
var son_CoupDeFeu;
var son_Background;
var son_Defaite;
var son_Rechargement;
// définition de la classe "selection"
export default class selection extends Phaser.Scene { 
  constructor() {
     super({key : "selection"}); // mettre le meme nom que le nom de la classe
  }
 
  preload() {   
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.image("img_etoile", "src/assets/star.png");
    this.load.image("img_bombe", "src/assets/bomb.png");
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png");
    this.load.image("bullet", "src/assets/balle.png");  
    this.load.image("cible", "src/assets/cible.png"); 
    this.load.image("GameOver", "src/assets/gameOver.png");
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("img_porte", "src/assets/porte.png", {
      frameWidth: 96,
      frameHeight: 120
  }); 
  this.load.audio("CoupDeFeu", "src/assets/gun-shot.mp3");
  this.load.audio("Background", "src/assets/Not Like Us.mp3");
  this.load.audio("GameOver", "src/assets/game-over.mp3");
  this.load.audio("Rechargement", "src/assets/gun-load.mp3");
  }

  create()  { 
    this.add.image(400, 300, "img_ciel");
    groupe_plateformes = this.physics.add.staticGroup();
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(700, 584, "img_plateforme");
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");
    porte = this.physics.add.staticSprite(700, 372, "img_porte");
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");
    player = this.physics.add.sprite(100, 450, "img_perso");
    this.physics.add.collider(player, groupe_plateformes); 
    groupeBullets = this.physics.add.group();  
    player.direction = 'right';
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
    player.body.onWorldBounds = true;
    player.body.world.on(
      "worldbounds",
      function(body, up, down, left, right){
        if (body.gameObject == player && down == true){
          this.physics.pause();
          player.setTint(0xff0000); 
          gameOver = true;
        }
      },
      this
    );
    player.peutTirer = true;
    porte.ouverte = false;
    this.anims.create({
      key: "anim_ouvreporte",
      frames: this.anims.generateFrameNumbers("img_porte", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    }); 
    this.anims.create({
      key: "anim_fermeporte",
      frames: this.anims.generateFrameNumbers("img_porte", { start: 5, end: 0 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A');
    groupeCibles = this.physics.add.group({
      key: 'cible',
      repeat: 7,
      setXY: { x: 24, y: 0, stepX: 107 }
  });  
  this.physics.add.collider(groupeCibles, groupe_plateformes);
  this.physics.add.overlap(groupeBullets, groupeCibles, hit, null,this);
  groupeCibles.children.iterate(function (cibleTrouvee) {
  cibleTrouvee.pointsVie=Phaser.Math.Between(1, 3);;
  cibleTrouvee.y = Phaser.Math.Between(10,250);
  cibleTrouvee.setBounce(0.8);
  });    
  this.physics.world.on("worldbounds", function(body) {
  var objet = body.gameObject;
  if (groupeBullets.contains(objet)) {
      objet.destroy();
  }
  });
  son_CoupDeFeu = this.sound.add("CoupDeFeu");
  son_Background = this.sound.add("Background", { loop: true });
  son_Defaite = this.sound.add("GameOver");
  son_Rechargement = this.sound.add("Rechargement");
  son_Background.play();  
  }
 
  update()  {   
  if (gameOver) {
    this.add.image(400, 300, "GameOver");
    son_Background.stop();
    son_Defaite.play(); 
    this.time.delayedCall(3000, recommencerNiveau, null, this);  
    return;
  }
  if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
    tirer.call(this, player);
 }  
  if (Phaser.Input.Keyboard.JustDown(clavier.space)) {
    if (this.physics.overlap(player, porte)) {
      if (!porte.ouverte) {
        porte.anims.play("anim_ouvreporte");
        porte.ouverte = true;
        porte.on('animationcomplete', () => {
          this.scene.start("niveau1");
          son_Background.stop();
        }, this);
      } else {
        porte.anims.play("anim_fermeporte");
        porte.ouverte = false;
      }
    } else if (this.physics.overlap(player, this.porte1)) {
      this.scene.switch("niveau1");
      son_Background.stop();

    } else if (this.physics.overlap(player, this.porte2)) {
      this.scene.switch("niveau2");
      son_Background.stop();

    } else if (this.physics.overlap(player, this.porte3)) {
      this.scene.switch("niveau3");
      son_Background.stop();

    }
  }
  if (clavier.left.isDown) {
    player.direction = 'left';
    player.setVelocityX(-160);
    player.anims.play("anim_tourne_gauche", true);
  } else if (clavier.right.isDown) {
    player.direction = 'right';
    player.setVelocityX(160);
    player.anims.play("anim_tourne_droite", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("anim_face");
  }

  if (clavier.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  } }

}
function recommencerNiveau() {
  gameOver = false;
  son_Defaite.stop();
  son_Background.stop();
  son_CoupDeFeu.stop();
  this.scene.stop("selection");
  this.scene.start("menu");
} 
function tirer(player) {
  var coefDir;
  if (player.peutTirer == true) {
  if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
  bullet.setCollideWorldBounds(true);
  bullet.body.allowGravity =false;
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
  bullet.body.onWorldBounds = true; 
  son_CoupDeFeu.play();
  player.peutTirer = false;
  }
  son_Rechargement.play();
  var timerTirOk = this.time.delayedCall(1000, 
    function() {
    player.peutTirer = true;
  }, 
  null, this);
}
function hit (bullet, groupeCibles) {
  groupeCibles.pointsVie--;
  if (groupeCibles.pointsVie==0) {
    groupeCibles.destroy(); 
  } 
   bullet.destroy();
}  