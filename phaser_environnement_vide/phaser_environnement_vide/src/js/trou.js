export default class trou extends Phaser.Scene {
    constructor() {
        super({
            key: "trou"
        });
    }
    preload(){
        this.preload.image("img_ciel", "src/assets/background.png");
        this.preload.image("img_plateforme", "src/assets/platform.png");
    }
}