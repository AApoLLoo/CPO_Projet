var TitreDeJeu;
var ZoneJouer;
var ZoneQuitter;
var ZoneCredit;
var BoutonJouer;
var BoutonQuitter;
var BoutonCredit;
var BoutonGuide;
var BoutonEgypte;
var BoutonIndustrie;
var BoutonMoyenAge;
var zoneEgypte;
var zoneIndustrie;
var zoneMoyenAge;
var ZoneGuide;
var Soundtrack;

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key : "menu"});
    }
    preload() { 
        this.load.image("background", "src/assets/Accueil.png");
        this.load.image("BoutonJouer", "src/assets/BoutonJouer.png");
        this.load.image("BoutonQuitter", "src/assets/BoutonQuitter.png");
        this.load.image("BoutonCredit", "src/assets/BoutonCredit.png");
        this.load.audio("Soundtrack", "src/assets/SoundtrackMenu.mp3");
        this.load.audio("BoutonMenu", "src/assets/BoutonMenu.mp3");
    }
    create() {
        this.add.image(960, 540, "background");
        Soundtrack = this.sound.add("Soundtrack"), {volume: 0.05, loop: true};
        Soundtrack.play();
        //
        BoutonJouer = this.add.image(960, 920, "BoutonJouer");
        BoutonQuitter = this.add.image(960, 730, "BoutonQuitter");
        BoutonCredit = this.add.image(1750, 980, "BoutonCredit");
        BoutonGuide = this.add.image(175, 980, "BoutonCredit");
        //
        TitreDeJeu = this.add.text(500, 100, "Les voyageurs du temps", {fontSize: "80px", color: "White", fontStyle: "bold", fontFamily: "Cooper Black"});
        ZoneJouer = this.add.text(750, 900, "Entrer dans le jeu", {fontSize: "40px", color: ("Black"), fontStyle: "bold"});
        ZoneQuitter = this.add.text(815 , 710, "Quitter le jeu", {fontSize: "35px", color:("Black"), fontStyle: "bold"});
        ZoneCredit = this.add.text(1705, 960, "Credits", {fontSize: "30px", color:("White"), fontStyle: "bold", fontFamily: "Sherif"});
        ZoneGuide = this.add.text(140, 960, "Guide", {fontSize: "30px", color:("White"), fontStyle: "bold", fontFamily: "Sherif"});


        this.effetGlow(BoutonJouer);
        this.effetGlow(BoutonQuitter);
        this.effetGlow(BoutonCredit);
        this.effetGlow(BoutonGuide);
        //
        BoutonCredit.on("pointerup", () => {
            this.sound.play("BoutonMenu");
            this.cameras.main.fadeOut(200);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                console.log("Credit lancé");
                this.scene.start("Credit");
            });
        });
        BoutonJouer.on("pointerup", () => {
            this.sound.play("BoutonMenu");
        
            // Position de zoom (centré un peu plus haut)
            let targetZoom = 12; // Zoom x10
            let targetY = -80;  // Décale la caméra vers le haut
            let targetAngle = 360; // Rotation complète
        
            // Tween pour zoom + rotation en même temps
            this.tweens.add({
                targets: this.cameras.main,
                zoom: targetZoom,
                scrollY: targetY,
                angle: targetAngle,
                duration: 1000, // Durée en ms
                ease: "Sine.easeInOut",
                onComplete: () => {
                    this.scene.stop("menu");
                    Soundtrack.stop();
                    this.scene.start("Egypte");
                }
            });
        });    
        BoutonQuitter.on("pointerup", () => {
            this.sound.play("BoutonMenu");
            // Affiche un message expliquant qu'il faut fermer l'onglet
            alert("Merci d'avoir joué ! Fermez l'onglet pour quitter.");
            location.reload();
        });
        
        
        BoutonGuide.on("pointerup", () => {
            this.sound.play("BoutonMenu");
            this.cameras.main.fadeOut(200);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("Guide");
            });
        });    
        //
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
