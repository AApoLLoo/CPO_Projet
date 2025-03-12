var zoneCredit;
var zoneRetour;
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
        zoneRetour = this.add.text(960, 920, "Retour", { fontSize: "50px", color: "#af5252", fontStyle: "bold"});
        zoneRetour.setOrigin(0.5);
        this.effetGlow(this.BoutonRetour);
        this.BoutonRetour.on("pointerup", () => {
            this.sound.play("BoutonMenu");
            this.scene.switch("menu");
        });
        zoneCredit = this.add.text(960, 400, `Chef de projet : \n\n- Antoine P.\n\nCarte de l'Egypte : \n\n- Cassandra S.\n\nCarte du Moyen-Age : \n\n- Ninon P.\n\nCarte de l'Industrie : \n\n- Antoine G.`, { fontSize: "50px", color: "#ffffff", align: "center" });
        zoneCredit.setOrigin(0.5);
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