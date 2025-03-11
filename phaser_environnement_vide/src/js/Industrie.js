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
            "testGIM", "TuilesDeJeuIndustrie1", 32, 32
          );  
        const smog = carteDuNiveau.createLayer("smog", tileset);
        // const platerformes = carteDuNiveau.createLayer("platerformes", tileset);
        // const emeplan = carteDuNiveau.createLayer("fonds_1", tileset);
        // const fonds_2 = carteDuNiveau.createLayer("fonds_2", tileset);
        // const smog_2emeP = carteDuNiveau.createLayer("smog_2emeP", tileset);
        // const fonds_3 = carteDuNiveau.createLayer("fonds_3", tileset);
        // const soleil = carteDuNiveau.createLayer("soleil", tileset);
        const FONDS = carteDuNiveau.createLayer("FONDS", tileset);
        // platerformes.setCollisionByProperty({ estSolide: true }); 
        clavier = this.input.keyboard.createCursorKeys();
    }
    update() {
    }
    }