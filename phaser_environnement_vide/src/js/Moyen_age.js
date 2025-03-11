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

        const carteDuNiveau3 = this.add.tilemap("MAPmoyenage");   
        const tileset = carteDuNiveau.addTilesetImage( "Sanstitre", "tuilemoyenage",32,32);  
        const calque_background = carteDuNiveau.createLayer("calque_background", tileset);
        const calque_2 = carteDuNiveau3.createLayer("calque_2", tileset);
        const calque_3 = carteDuNiveau3.createLayer("calque_3", tileset);
        const calque_4 = carteDuNiveau3.createLayer("calque_4", tileset);
        calque_2.setCollisionByProperty({ estSolide: true }); 
        calque_3.setCollisionByProperty({ estSolide: true }); 
        calque_4.setCollisionByProperty({ estSolide: true }); 
    }
    update() {       
}
}