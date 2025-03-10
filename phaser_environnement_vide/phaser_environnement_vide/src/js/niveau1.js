var gameOver = false;
var son_Defaite;
var plateforme_mobile;
var tween_mouvement;
var levier;
var clavier;
export default class niveau1 extends Phaser.Scene {
    // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("plateforme_bleue", "src/assets/blue-platform.png");
    this.load.image("levier", "src/assets/levier.png");
    this.load.audio("GameOver", "src/assets/game-over.mp3");
  }

  create() {
    this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    plateforme_mobile = this.physics.add.sprite(350, 450,"plateforme_bleue"); 
    plateforme_mobile.body.allowGravity = false;
    plateforme_mobile.body.immovable = true; 
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });
    levier = this.physics.add.staticSprite(700, 538, "levier"); 
    levier.active = false; 
    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1"); 
    clavier = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, plateforme_mobile);
    this.physics.add.collider(this.player, this.groupe_plateformes);
    son_Defaite = this.sound.add("GameOver"); 
    tween_mouvement = this.tweens.add({
      targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
      paused: true, // de base le tween est en pause
      ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
      duration: 2000,  // durée de l'animation pour monter 
      yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
      y: "-=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
      delay: 0,     // délai avant le début du tween une fois ce dernier activé
      hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
      repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
      repeat: -1 // répétition infinie 
    });
  }

  update() {
    if (
      Phaser.Input.Keyboard.JustDown(clavier.space) == true){
      if (this.physics.overlap(this.player, levier) == true){
      if (levier.active == true) {
        levier.active = false; 
        levier.flipX = false; 
        tween_mouvement.pause(); 
      } else {
        levier.active = true;
        levier.flipX = true; 
        tween_mouvement.resume();
      } 
      if (this.physics.overlap(this.player, this.porte_retour) == true) {
        this.scene.switch("selection");
      }
    }
  }
    if (gameOver) {
      this.add.image(400, 300, "GameOver");
      son_Defaite.play(); 
      this.time.delayedCall(1000, recommencerNiveau, null, this);  
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
        }
    }   
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.touching.down || this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
    }
  }
}
function recommencerNiveau() {
  gameOver = false;
  son_Defaite.stop();
  son_CoupDeFeu.stop();
  this.scene.stop("niveau1");
  this.scene.start("menu");
} 