var clavier;
export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
    }
    preload() {
        this.load.image("Background", "src/assets/background.png");
        this.load.image("TuilesDeJeuIndustrie1", "src/assets/Box8.png");
        this.load.image("TuilesDeJeuIndustrie2", "src/assets/Fire-extinguisher1.png");
        this.load.image("TuilesDeJeuIndustrie3", "src/assets/IndustrialTile_18.png");
        this.load.image("TuilesDeJeuIndustrie4", "src/assets/IndustrialTile_19.png");
        this.load.image("TuilesDeJeuIndustrie5", "src/assets/IndustrialTile_55.png");
        this.load.image("TuilesDeJeuIndustrie6", "src/assets/IndustrialTile_56.png");
        this.load.image("TuilesDeJeuIndustrie7", "src/assets/Ladder1.png");
        this.load.image("TuilesDeJeuIndustrie8", "src/assets/light.png");
        this.load.image("TuilesDeJeuIndustrie9", "src/assets/minishop&callbox.png");
        this.load.image("TuilesDeJeuIndustrie10", "src/assets/Pointer1.png");
        this.load.image("TuilesDeJeuIndustrie11", "src/assets/smog1.png");
        this.load.image("TuilesDeJeuIndustrie12", "src/assets/smog2.png");
        this.load.image("TuilesDeJeuIndustrie13", "src/assets/sun.png");
        this.load.image("TuilesDeJeuIndustrie14", "src/assets/city1plan.png");
        this.load.image("TuilesDeJeuIndustrie15", "src/assets/city2plan.png");
        this.load.image("TuilesDeJeuIndustrie16", "src/assets/city3plan.png");
        this.load.image("TuilesDeJeuIndustrie17", "src/assets/city4plan.png");
        this.load.image("TuilesDeJeuIndustrie18", "src/assets/Fence1.png");
        this.load.image("TuilesDeJeuIndustrie19", "src/assets/Fence2.png");
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAP_INDUSTRY.json"); 
    }
    create() {  
        console.log(Phaser.VERSION);

        const carteDuNiveau = this.add.tilemap("Carte_Industrie");
    
        const tileset1 = carteDuNiveau.addTilesetImage("Decor1", "TuilesDeJeuIndustrie1");
        const tileset2 = carteDuNiveau.addTilesetImage("IndustrialTile_18", "TuilesDeJeuIndustrie2");
        const tileset3 = carteDuNiveau.addTilesetImage("IndustrialTile_19", "TuilesDeJeuIndustrie3");
        const tileset4 = carteDuNiveau.addTilesetImage("IndustrialTile_55", "TuilesDeJeuIndustrie4");
        const tileset5 = carteDuNiveau.addTilesetImage("IndustrialTile_56", "TuilesDeJeuIndustrie5");
        const tileset6 = carteDuNiveau.addTilesetImage("Ladder1", "TuilesDeJeuIndustrie6");
        const tileset7 = carteDuNiveau.addTilesetImage("light", "TuilesDeJeuIndustrie7");
        const tileset8 = carteDuNiveau.addTilesetImage("minishop&callbox", "TuilesDeJeuIndustrie8");
        const tileset9 = carteDuNiveau.addTilesetImage("Pointer1", "TuilesDeJeuIndustrie9");
        const tileset10 = carteDuNiveau.addTilesetImage("smog1", "TuilesDeJeuIndustrie10");
        const tileset11 = carteDuNiveau.addTilesetImage("smog2", "TuilesDeJeuIndustrie11");
        const tileset12 = carteDuNiveau.addTilesetImage("sun", "TuilesDeJeuIndustrie12");
        const tileset13 = carteDuNiveau.addTilesetImage("city1plan", "TuilesDeJeuIndustrie13");
        const tileset14 = carteDuNiveau.addTilesetImage("city2plan", "TuilesDeJeuIndustrie14");
        const tileset15 = carteDuNiveau.addTilesetImage("city3plan", "TuilesDeJeuIndustrie15");
        const tileset16 = carteDuNiveau.addTilesetImage("city4plan", "TuilesDeJeuIndustrie16");
        const tileset17 = carteDuNiveau.addTilesetImage("Fence1", "TuilesDeJeuIndustrie17");
        const tileset18 = carteDuNiveau.addTilesetImage("Fence2", "TuilesDeJeuIndustrie18");
        const tileset19 = carteDuNiveau.addTilesetImage("Box8", "TuilesDeJeuIndustrie19");
        const tileset20 = carteDuNiveau.addTilesetImage("Background", "background");
        
        const calque = carteDuNiveau.createDynamicLayer("tiled_calque", 
            [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9, tileset10, tileset11, tileset12, tileset13, tileset14, tileset15, tileset16, tileset17, tileset18, tileset19, tileset20]
        );
        platerfomes_2emeP.setCollisionByProperty({ estSolide: true });
        platerformes_1erP.setCollisionByProperty({ estSolide: true });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
    }
}