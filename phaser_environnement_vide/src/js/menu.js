var TitreDeJeu;
var ZoneJouer;
var ZoneQuitter;
var BoutonJouer;
var BoutonQuitter;

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key : "menu"});
    }
    preload() { 
        this.load.image("background", "src/assets/Accueil.png");
        this.load.image("BoutonJouer", "src/assets/BoutonJouer.png");
        this.load.image("BoutonQuitter", "src/assets/BoutonQuitter.png");
    }
    create() {
        this.add.image(960, 540, "background");
        BoutonJouer = this.add.image(960, 920, "BoutonJouer");
        BoutonQuitter = this.add.image(960, 730, "BoutonQuitter");
        TitreDeJeu = this.add.text(500, 100, "Les voyageurs du temps", {fontSize: "80px", color: "yellow"});
        ZoneJouer = this.add.text(750, 900, "Entrer dans le jeu", {fontSize: "40px", color: ("Black"), fontStyle: "bold"});
        ZoneQuitter = this.add.text(815 , 710, "Quitter le jeu", {fontSize: "35px", color:("Black"), fontStyle: "bold"});
        this.effetGlow(BoutonJouer);
        this.effetGlow(BoutonQuitter);
        BoutonJouer.on("pointerup", () => {
            this.scene.switch("Egypte");
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
