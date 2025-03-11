var clavier;
export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
    }
    preload() {
        this.load.image("TuilesDeJeuIndustrie1", "src/assets/testGIM.png");
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAP_INDUSTRY.json"); 
    }
    create(){
        const carteDuNiveau = this.add.tilemap("Carte_Industrie");   
        const tileset = carteDuNiveau.addTilesetImage(
            "TUILES", "TuilesDeJeuIndustrie1", 32, 32
          );  
         const smog = carteDuNiveau.createLayer("smog", tileset);
        const calque_1 = carteDuNiveau.createLayer("calque_1", tileset);
        const calque_2 = carteDuNiveau.createLayer("calque_2", tileset);
        const calque_3 = carteDuNiveau.createLayer("calque_3", tileset);
        const calque_4 = carteDuNiveau.createLayer("calque_4", tileset);;
        // const fonds_3 = carteDuNiveau.createLayer("fonds_3", tileset);
        // const soleil = carteDuNiveau.createLayer("soleil", tileset);
        const background = carteDuNiveau.createLayer("background", tileset);
        // platerformes.setCollisionByProperty({ estSolide: true }); 
        clavier = this.input.keyboard.createCursorKeys();
    }
    update() {
    }
    }