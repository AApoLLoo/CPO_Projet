var clavier;
export default class Moyen_age extends Phaser.Scene {
    constructor() {
        super({key : "Moyen_age"});
    }   
    preload() {
     
    this.load.image("Sanstitre", "src/assets/Sanstitre.png");
    this.load.tilemapTiledJSON("MAPmoyenage", "src/assets/MAPmoyenage.json"); 
    }
    create(){

        const carteDuNiveau = this.add.tilemap("MAPmoyenage");   
        const tileset = carteDuNiveau.addTilesetImage( "Sanstitre", "Sanstitre",32,32);  
        const calque_background = carteDuNiveau.createLayer("calque background", tileset);
        const calque_2 = carteDuNiveau.createLayer("calque_2", tileset);
        const calque_3 = carteDuNiveau.createLayer("calque_3", tileset);
        const calque_4 = carteDuNiveau.createLayer("calque_4", tileset);
        calque_2.setCollisionByProperty({ estSolide: true }); 
        calque_3.setCollisionByProperty({ estSolide: true }); 
        calque_4.setCollisionByProperty({ estSolide: true }); 
    
        

    }
    update() {        
        if (clavier.left.isDown) {
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
          } else if (clavier.right.isDown) {
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