export default class Credit extends Phaser.Scene {
    constructor() {
        super({key : "Credit"});
    }
    preload() {
        this.load.image("Fond", "src/assets/Fond_Credit.png");
        this.load.image("BoutonRetour", "src/assets/BoutonRetour.png");
    }
    create() {
        this.add.image(960, 540, "Fond");
        this.BoutonRetour = this.add.image(960, 920, "BoutonRetour");
        this.effetGlow(this.BoutonRetour);
        this.BoutonRetour.on("pointerup", () => {
            this.scene.start("menu");
        });
    }
    udpate() {
    }
    effetGlow(bouton) {
        bouton.setInteractive();
        bouton.on("pointerover", () => {
            bouton.setTint(0x00ff00);
        });
        bouton.on("pointerout", () => {
            bouton.clearTint();
        });
    }
}