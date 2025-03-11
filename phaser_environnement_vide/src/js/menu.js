var TitreDeJeu;
var ZoneJouer;
var ZoneQuitter;
var ZoneCredit;
var BoutonJouer;
var BoutonQuitter;
var BoutonCredit;
var BoutonEgypte;
var BoutonIndustrie;
var BoutonMoyenAge;
var zoneEgypte;
var zoneIndustrie;
var zoneMoyenAge;

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key : "menu"});
    }
    preload() { 
        this.load.image("background", "src/assets/Accueil.png");
        this.load.image("BoutonJouer", "src/assets/BoutonJouer.png");
        this.load.image("BoutonQuitter", "src/assets/BoutonQuitter.png");
        this.load.image("BoutonCredit", "src/assets/BoutonCredit.png");
    }
    create() {
        this.add.image(960, 540, "background");
        BoutonJouer = this.add.image(960, 920, "BoutonJouer");
        BoutonQuitter = this.add.image(960, 730, "BoutonQuitter");
        BoutonCredit = this.add.image(1750, 980, "BoutonCredit");
        //
        BoutonEgypte = this.add.image(400, 300, "BoutonJouer");
        BoutonIndustrie = this.add.image(400, 540, "BoutonJouer");
        BoutonMoyenAge = this.add.image(400, 780, "BoutonJouer");
        zoneEgypte = this.add.text(400, 300, "Egypte", {fontSize: "40px", color: "White", fontStyle: "bold"});
        zoneIndustrie = this.add.text(400, 540, "Industrie", {fontSize: "40px", color: "White", fontStyle: "bold"});
        zoneMoyenAge = this.add.text(400, 780, "Moyen Age", {fontSize: "40px", color: "White", fontStyle: "bold"});
        //
        TitreDeJeu = this.add.text(500, 100, "Les voyageurs du temps", {fontSize: "80px", color: "White", fontStyle: "bold", fontFamily: "Cooper Black"});
        ZoneJouer = this.add.text(750, 900, "Entrer dans le jeu", {fontSize: "40px", color: ("Black"), fontStyle: "bold"});
        ZoneQuitter = this.add.text(815 , 710, "Quitter le jeu", {fontSize: "35px", color:("Black"), fontStyle: "bold"});
        ZoneCredit = this.add.text(1705, 960, "Credits", {fontSize: "30px", color:("White"), fontStyle: "bold", fontFamily: "Sherif"});

        this.effetGlow(BoutonJouer);
        this.effetGlow(BoutonQuitter);
        this.effetGlow(BoutonCredit);
        //
        this.effetGlow(BoutonEgypte);
        this.effetGlow(BoutonIndustrie);
        this.effetGlow(BoutonMoyenAge);
        //
        BoutonCredit.on("pointerup", () => {
            this.scene.start("Credit");
        });
        BoutonJouer.on("pointerup", () => {
            this.scene.start("Industrie");
        });
        //
        BoutonEgypte.on("pointerup", () => {
            this.scene.start("Egypte");
        });
        BoutonIndustrie.on("pointerup", () => {
            this.scene.start("Industrie");
        });
        BoutonMoyenAge.on("pointerup", () => {
            this.scene.start("MoyenAge");
        });
        //
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
