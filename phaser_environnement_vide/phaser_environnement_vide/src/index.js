// chargement des librairies
// import Phaser from "phaser";
import menu from "./js/menu.js"; // import de la classe menu
import selection from "./js/selection.js"; // import de la classe selection
import niveau1 from "./js/niveau1.js"; // import de la classe niveau1
import niveau2 from "./js/niveau2.js";
import niveau3 from "./js/niveau3.js";
/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
    scale: {
    mode: Phaser.Scale.FIT, // redimensionne le jeu pour qu'il rentre dans la fenetre
    autocenter: Phaser.Scale.CENTER, // centre le jeu
    width: 800, // largeur en pixels
    height: 600,// hauteur en pixels
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
  scene : [menu, selection, niveau1, niveau2, niveau3] // liste des scenes du jeu
  };

// création et lancement du jeu à partir de la configuration config
var game = new Phaser.Game(config);
game.scene.start("menu"); // lancement de la scene selection


/***********************************************************************/
/** FONCTION CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */



/***********************************************************************/
/** FONCTION UPDATE 
/***********************************************************************/

// /***********************************************************************/
// /** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
// /***********************************************************************/
// var groupe_plateformes;
// var player;
// var clavier; 
// var groupe_etoiles;
// var score = 0;
// var zone_texte_score;
// var groupe_etoiles;
// var game_over = false;
// // configuration générale du jeu
// var config = {
//   type: Phaser.AUTO,
//   scale: {
//   mode: Phaser.Scale.FIT, // redimensionne le jeu pour qu'il rentre dans la fenetre
//   parent: "jeu", // le parent dans lequel le jeu sera affiché
//   width: 800, // largeur en pixels
//   height: 600,// hauteur en pixels
//   },
//   physics: {
//     // définition des parametres physiques
//     default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
//     arcade: {
//       // parametres du mode arcade
//       gravity: {
//         y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
//       },
//       debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
//     }
//   },
//   scene: {
//     // une scene est un écran de jeu. Pour fonctionner il lui faut 3 fonctions  : create, preload, update
//     preload: preload, // la phase preload est associée à la fonction preload, du meme nom (on aurait pu avoir un autre nom)
//     create: create, // la phase create est associée à la fonction create, du meme nom (on aurait pu avoir un autre nom)
//     update: update // la phase update est associée à la fonction update, du meme nom (on aurait pu avoir un autre nom)
//   }
// };

// // création et lancement du jeu
// new Phaser.Game(config);
  
// /***********************************************************************/
// /** FONCTION PRELOAD 
// /***********************************************************************/

// /** La fonction preload est appelée une et une seule fois,
//  * lors du chargement de la scene dans le jeu.
//  * On y trouve surtout le chargement des assets (images, son ..)
//  */
// function preload() {
//   this.load.image("img_ciel", "src/assets/background.png");
//   this.load.image("img_sol", "src/assets/platform.png");
//   this.load.image("img_etoile", "src/assets/star.png");
//   this.load.image("img_bombe", "src/assets/bomb.png");
//   this.load.image("img_personnage", "src/assets/dude.png");
//   this.load.spritesheet("img_personnage", "src/assets/dude.png", {
//     frameWidth: 32,
//     frameHeight: 48
//   });
//   this.load.image("img_game_over", "src/assets/gameOver.png");
//   this.load.image("Phaser_tuilesdejeu", "src/assets/tuilesJeu.png");

//   // chargement de la carte
//   this.load.tilemapTiledJSON("carte", "src/assets/map.json");  
// }

// /***********************************************************************/
// /** FONCTION CREATE 
// /***********************************************************************/

// /* La fonction create est appelée lors du lancement de la scene
//  * si on relance la scene, elle sera appelée a nouveau
//  * on y trouve toutes les instructions permettant de créer la scene
//  * placement des peronnages, des sprites, des platesformes, création des animations
//  * ainsi que toutes les instructions permettant de planifier des evenements
//  *  Ancien Code :
//  * this.add.image(400, 300, "img_ciel");
//  * groupe_plateformes = this.physics.add.staticGroup();
//   groupe_plateformes.create(200, 600, "img_sol");
//   groupe_plateformes.create(50, 300, "img_sol");
//   groupe_plateformes.create(600, 600, "img_sol");
//   groupe_plateformes.create(600, 450, "img_sol");
//   groupe_plateformes.create(750, 270, "img_sol");
//   groupe_etoiles = this.physics.add.group();
//   for (var i = 0; i < 10; i++) {
//     var coordX = 70 + 70 * i;
//     groupe_etoiles.create(coordX, 10, "img_etoile");
//   }
//   this.physics.add.collider(groupe_etoiles, groupe_plateformes);
//   groupe_etoiles.children.iterate(function iterateur(etoile_i) {
//     // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
//     var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
//     etoile_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i
//   }); 
//   this.physics.add.overlap(player, groupe_etoiles, ramasserEtoile, null, this); 
//   zone_texte_score = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#79f8f8" });
//   groupe_bombes = this.physics.add.group();
//   this.physics.add.collider(groupe_bombes, groupe_plateformes);
//   this.physics.add.collider(player, groupe_bombes, chocAvecBombe, null, this);
//  */
// function create() {
//   const carteDuNiveau = this.add.tilemap("carte");   
//   // chargement du jeu de tuiles
//   const tileset = carteDuNiveau.addTilesetImage(
//             "tuiles_de_Jeu",
//             "Phaser_tuilesdejeu"
//           );  
//   const calque_background = carteDuNiveau.createLayer("Calque_Background", tileset);
//   const calque_background2 = carteDuNiveau.createLayer("Calque_Background2", tileset);
//   const calque_plateformes = carteDuNiveau.createLayer("Calque_Plateformes", tileset);
//   calque_plateformes.setCollisionByProperty({ estSolide: true }); 
//   player = this.physics.add.sprite(100, 300, "img_personnage");
//   player.setCollideWorldBounds(true); 
//   this.physics.add.collider(player, calque_plateformes);
//   player.setBounce(0.2);
//   clavier = this.input.keyboard.createCursorKeys();
//   this.anims.create({
//     key: "anim_touche_gauche",
//     frames: this.anims.generateFrameNumbers("img_personnage", {
//       start: 0,
//       end: 3
//     }),
//     frameRate: 10,
//     repeat: -1 //-1 = infini
//   });
//   this.anims.create({
//     key : "anim_touche_droite",
//     frames : this.anims.generateFrameNumbers("img_personnage", {  
//       start: 5, 
//       end: 8
//     }),
//     frameRate: 10,
//     repeat: -1
//   });
//   this.anims.create({
//   key: "anim_face",
//     frames: [{ key: "img_personnage", frame: 4 }],
//     frameRate: 20,
//     repeat: -1
//   });
//   this.physics.world.setBounds(0, 0, 3200, 640);
//   this.cameras.main.setBounds(0, 0, 3200, 640);
//   this.cameras.main.startFollow(player);
// }

// /***********************************************************************/
// /** FONCTION UPDATE 
// /***********************************************************************/
// // function ramasserEtoile(un_joueur, une_etoile) {
// //   une_etoile.disableBody(true, true);
// //   if (groupe_etoiles.countActive(true) === 0) {
// //     groupe_etoiles.children.iterate(function iterateur(etoile_i) {
// //       etoile_i.enableBody(true, etoile_i.x, 0, true, true);
// //     }); 
// //     var une_bombe = groupe_bombes.create(x, 16, "img_bombe");
// //     une_bombe.setBounce(1);
// //     une_bombe.setCollideWorldBounds(true);
// //     une_bombe.setVelocity(Phaser.Math.Between(-200, 200), 20);
// //     une_bombe.allowGravity = false;
// // } 
// //   score += 10;
// //   zone_texte_score.setText("Score: " + score);
// // var x;
// // if (player.x < 400) {
// //   x = Phaser.Math.Between(400, 800);
// // } else {
// //   x = Phaser.Math.Between(0, 400);
// // }
// // }
// // function chocAvecBombe(){
// //   this.physics.pause();
// //   player.setTint(0xff0000);
// //   player.anims.play('anim_face');
// //   game_over = true;
// //   this.add.image(400, 300, "img_game_over");
// //   }
// function update() {
//   if (clavier.right.isDown == true){
//     player.setVelocityX(200);
//     player.anims.play('anim_touche_droite', true);
//   }
//   else if (clavier.left.isDown == true){
//     player.setVelocityX(-200);
//     player.anims.play('anim_touche_gauche', true); 
//   } else {
//     player.setVelocityX(0);
//     player.anims.play('anim_face', true);
//   } 
//   if (clavier.up.isDown && player.body.blocked.down) {
//     player.setVelocityY(-300);
//   }  
//   if (game_over) {
//     return;
// }
// }


