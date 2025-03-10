// chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
import menu from "./js/menu.js";
import Moyen_age from "./js/Moyen_age.js";
import Egypte from "./js/Egypte.js";
import Industrie from "./js/Prehistoire.js";
// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
    scale: {
    mode: Phaser.Scale.FIT, // redimensionne le jeu pour qu'il rentre dans la fenetre
    autocenter: Phaser.Scale.CENTER, // centre le jeu
    width: 1920, // largeur en pixels
    height: 1080,// hauteur en pixels
    },
    physics: {
      // définition des parametres physiques
      default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
      arcade: {
        // parametres du mode arcade
        gravity: {
          y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
        },
        debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
      }
    },
  scene : [menu, Egypte, Moyen_age, Industrie] // liste des scenes du jeu
  };


// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("menu");
