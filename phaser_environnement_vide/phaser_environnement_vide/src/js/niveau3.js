var gameOver = false;
var son_Defaite;
export default class niveau3 extends Phaser.Scene {
    constructor() {
        super({
            key: "niveau3"
        });
    }
    preload(){
        this.load.image("Phaser_tuilesdejeu", "src/assets/tuilesJeu.png");
        this.load.tilemapTiledJSON("carte", "src/assets/map.json"); 
    }
    create(){this.add.image(400, 300, "img_ciel");
        const carteDuNiveau = this.add.tilemap("carte");   
        const tileset = carteDuNiveau.addTilesetImage(
            "tuiles_de_Jeu",
            "Phaser_tuilesdejeu"
          );  
        const calque_background = carteDuNiveau.createLayer("Calque_Background", tileset);
        const calque_background2 = carteDuNiveau.createLayer("Calque_Background2", tileset);
        const calque_plateformes = carteDuNiveau.createLayer("Calque_Plateformes", tileset);
        calque_plateformes.setCollisionByProperty({ estSolide: true }); 
        this.add.text(400, 100, "Vous êtes dans le niveau 3", {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "22pt"
        });
        this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3"); // porte de retour
        this.player = this.physics.add.sprite(100, 550, "img_perso");
        this.player.refreshBody();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, calque_plateformes);
        this.clavier = this.input.keyboard.createCursorKeys();
        this.player.body.onWorldBounds = true;
        this.player.body.world.on(
          "worldbounds",
          function(body, up, down, left, right){
            if (body.gameObject == this.player && down == true){
              this.physics.pause();
              this.player.setTint(0xff0000); 
              gameOver = true;
            }
          },
          this
        );
        this.physics.world.setBounds(0, 0, 3200, 640);
        this.cameras.main.setBounds(0, 0, 3200, 640);
        this.cameras.main.startFollow(this.player);
        son_Defaite = this.sound.add("GameOver");
      }
    update(){
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
  this.scene.stop("niveau3");
  this.scene.start("menu");
} 
