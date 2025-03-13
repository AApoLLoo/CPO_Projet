var zoneRetour;
export default class Guide extends Phaser.Scene {
    constructor() {
        super({ key: "Guide" });
    }
    preload() {
        this.load.image("BoutonRetour", "src/assets/BoutonRetour.png");

    }
    create() {
        this.add.text(960, 540, "Guide", { fontSize: "80px", color: "White", fontStyle: "bold", fontFamily: "Cooper Black" }).setOrigin(0.5);
        this.add.text(960, 740, "WIP", { fontSize: "80px", color: "White", fontStyle: "bold", fontFamily: "Cooper Black" }).setOrigin(0.5);
        this.BoutonRetour = this.add.image(960, 920, "BoutonRetour");
        zoneRetour = this.add.text(960, 920, "Retour", { fontSize: "50px", color: "#af5252", fontStyle: "bold" });
        zoneRetour.setOrigin(0.5);
        this.cameras.main.fadeIn(200);
        this.effetGlow(this.BoutonRetour);
        this.BoutonRetour.on("pointerup", () => {
            this.sound.play("BoutonMenu");
            this.cameras.main.fadeOut(200);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.switch("menu");
            });
        });

    }
    update() {
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