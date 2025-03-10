export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
    }
    preload() {
        this.load.image("TuilesDeJeuIndustrie1", "src/assets/Fire-extinguisher1.png");
        this.load.image("TuilesDeJeuIndustrie2", "src/assets/IndustrialTile_18.png");
        this.load.image("TuilesDeJeuIndustrie3", "src/assets/IndustrialTile_19.png");
        this.load.image("TuilesDeJeuIndustrie4", "src/assets/IndustrialTile_55.png");
        this.load.image("TuilesDeJeuIndustrie5", "src/assets/IndustrialTile_56.png");
        this.load.image("TuilesDeJeuIndustrie6", "src/assets/Ladder1.png");
        this.load.image("TuilesDeJeuIndustrie7", "src/assets/light.png");
        this.load.image("TuilesDeJeuIndustrie8", "src/assets/minishop&callbox.png");
        this.load.image("TuilesDeJeuIndustrie9", "src/assets/Pointer1.png");
        this.load.image("TuilesDeJeuIndustrie10", "src/assets/smog1.png");
        this.load.image("TuilesDeJeuIndustrie11", "src/assets/smog2.png");
        this.load.image("TuilesDeJeuIndustrie12", "src/assets/sun.png");
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAPINDUSTRY.json"); 
    }
    create(){
        const carteDuNiveau = this.add.tilemap("Carte_Industrie");   
        const tileset = carteDuNiveau.addTilesetImage(
            "tuiles_de_Jeu",
            "Phaser_tuilesdejeu"
          );  
        const calque_background = carteDuNiveau.createLayer("Calque_Background", tileset);
        const calque_background2 = carteDuNiveau.createLayer("Calque_Background2", tileset);
        const calque_plateformes = carteDuNiveau.createLayer("Calque_Plateformes", tileset);
        calque_plateformes.setCollisionByProperty({ estSolide: true }); 
    }
    update() {
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