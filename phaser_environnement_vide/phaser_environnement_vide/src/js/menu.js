var zone_texte;
var zone_texte_2;
export default class menu extends Phaser.Scene {
    constructor() {
        super({ key: "menu" });
    }
    preload() {
        this.load.image("Menu", "src/assets/background.png");
        this.load.image("ImageBouton", "src/assets/pngegg.png");          
    }

    create() { 
        this.add
        .image(400, 300, "Menu")
        .setOrigin(0.5, 0.5)
        .setDepth(0);
        zone_texte = this.add.text(200, 20, "Bienvenue dans le jeu !!", { fontSize: "32px", fill: "#8633ff" });
        zone_texte_2 = this.add.text(50, 350, "Cliquez sur le bouton pour commencer", { fontSize: "20px", fill: "#8633ff" });
        var BoutonPlay = this.add.image(600, 350, "ImageBouton").setDepth(1);
        BoutonPlay.setInteractive();
        BoutonPlay.on("pointerover", () => {
            BoutonPlay.setTint(0xff0000);
        });
        BoutonPlay.on("pointerout", () => {
            BoutonPlay.clearTint();
        });
        BoutonPlay.on("pointerup", () => {
            this.scene.start("selection");
        });
    }
}