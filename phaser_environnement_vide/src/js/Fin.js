export default class Fin extends Phaser.Scene {
    constructor() {
        super({ key: "Fin" });
    }

    preload() {
        this.load.image("Paradis", "src/assets/Paradis.png");
        this.load.audio("music", "src/assets/Musique_Fin.mp3");
    }

    create() {
        this.add.image(960, 540, "Paradis");
        this.add.audio("music", { loop: true }).play();
        const creditsText = `
        Merci d'avoir joué à notre jeu !
        Nous espérons que vous avez apprécié votre expérience
        et que vous avez appris des choses 
        sur les différentes époques historiques.
        Nous avons été ravis de créer ce jeu pour vous et nous espérons 
        que vous avez apprécié le parcourir.
        
        Créateurs :
        - Girel ANTOINE
        - Sortais CASSANDRA
        - Prevot NINON
        - Pommier ANTOINE   
        
        Musique :
        - Google.INC
        
        Graphismes :
        - Itch.io 
        - Tiled.inc
        
        -Partenaires :
        - EPF Montpellier 
        - EPF
        - Dartis BENOIT
        - Fragale ENZO

        Date de création : 13-03-2025

        www.epf.fr/
        Merci pour votre soutien !
        `;

        const credits = this.add.text(960, 1080, creditsText, {
            font: "60px SP Marker",
            fill: "#FFDE06",
            align: "center",
            wordWrap: { width: 800, useAdvancedWrap: true }
        }).setOrigin(0.5);

        this.tweens.add({
            targets: credits,
            y: -credits.height,
            duration: 30000,
            ease: "Linear",
            repeat: -1,
            onComplete: () => {
                // Optionally, you can add code here to transition to another scene or restart the game
            }
        });
    }

    update() {
    }
}