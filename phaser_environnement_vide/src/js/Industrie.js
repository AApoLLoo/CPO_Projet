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
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAP_INDUSTRY.json"); 
    }
    create(){
        const carteDuNiveau = this.add.tilemap("Carte_Industrie");   
        const tileset = carteDuNiveau.addTilesetImage(
            "Fire-extinguisher1",
            "IndustrialTile_18",
            "IndustrialTile_19",
            "IndustrialTile_55",
            "IndustrialTile_56",
            "Ladder1",
            "light",
            "minishop&callbox",
            "Pointer1",
            "smog1",
            "smog2",
            "sun",
            "TuilesDeJeuIndustrie1",
            "TuilesDeJeuIndustrie2",
            "TuilesDeJeuIndustrie3",
            "TuilesDeJeuIndustrie4",
            "TuilesDeJeuIndustrie5",
            "TuilesDeJeuIndustrie6",
            "TuilesDeJeuIndustrie7",
            "TuilesDeJeuIndustrie8",
            "TuilesDeJeuIndustrie9",
            "TuilesDeJeuIndustrie10",
            "TuilesDeJeuIndustrie11",
            "TuilesDeJeuIndustrie12"
          );  
        const smog_1erP = carteDuNiveau.createLayer("smog_1erP", tileset);
        const platerformes_1erP = carteDuNiveau.createLayer("platerformes_1erP", tileset);
        const platerfomes_2emeP = carteDuNiveau.createLayer("platerfomes_2emeP", tileset);
        const fonds_1 = carteDuNiveau.createLayer("fonds_1", tileset);
        const fonds_2 = carteDuNiveau.createLayer("fonds_2", tileset);
        const smog_2emeP = carteDuNiveau.createLayer("smog_2emeP", tileset);
        const fonds_3 = carteDuNiveau.createLayer("fonds_3", tileset);
        const soleil = carteDuNiveau.createLayer("soleil", tileset);
        const fonds_4 = carteDuNiveau.createLayer("fonds_4", tileset);
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