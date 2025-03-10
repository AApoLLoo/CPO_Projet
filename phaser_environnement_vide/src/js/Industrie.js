var clavier;
export default class Industrie extends Phaser.Scene {
    constructor() {
        super({key : "Industrie"});
    }
    preload() {
        this.load.image("Background", "src/assets/background.png");
        this.load.image("TuilesDeJeuIndustrie1", "src/assets/Box8.png");
        this.load.image("TuilesDeJeuIndustrie2", "src/assets/Fire-extinguisher1.png");
        this.load.image("TuilesDeJeuIndustrie3", "src/assets/IndustrialTile_18.png");
        this.load.image("TuilesDeJeuIndustrie4", "src/assets/IndustrialTile_19.png");
        this.load.image("TuilesDeJeuIndustrie5", "src/assets/IndustrialTile_55.png");
        this.load.image("TuilesDeJeuIndustrie6", "src/assets/IndustrialTile_56.png");
        this.load.image("TuilesDeJeuIndustrie7", "src/assets/Ladder1.png");
        this.load.image("TuilesDeJeuIndustrie8", "src/assets/light.png");
        this.load.image("TuilesDeJeuIndustrie9", "src/assets/minishop&callbox.png");
        this.load.image("TuilesDeJeuIndustrie10", "src/assets/Pointer1.png");
        this.load.image("TuilesDeJeuIndustrie11", "src/assets/smog1.png");
        this.load.image("TuilesDeJeuIndustrie12", "src/assets/smog2.png");
        this.load.image("TuilesDeJeuIndustrie13", "src/assets/sun.png");
        this.load.image("TuilesDeJeuIndustrie14", "src/assets/city1plan.png");
        this.load.image("TuilesDeJeuIndustrie15", "src/assets/city2plan.png");
        this.load.image("TuilesDeJeuIndustrie16", "src/assets/city3plan.png");
        this.load.image("TuilesDeJeuIndustrie17", "src/assets/city4plan.png");
        this.load.image("TuilesDeJeuIndustrie18", "src/assets/Fence1.png");
        this.load.image("TuilesDeJeuIndustrie19", "src/assets/Fence2.png");
        this.load.tilemapTiledJSON("Carte_Industrie", "src/assets/MAP_INDUSTRY.json"); 
    }
    create() {  
        console.log(Phaser.VERSION);

        const carteDuNiveau = this.add.tilemap("Carte_Industrie");
    
        const tileset1 = carteDuNiveau.addTilesetImage("Decor1", "TuilesDeJeuIndustrie1");
        const tileset2 = carteDuNiveau.addTilesetImage("IndustrialTile_18", "TuilesDeJeuIndustrie2");
        const tileset3 = carteDuNiveau.addTilesetImage("IndustrialTile_19", "TuilesDeJeuIndustrie3");
        const tileset4 = carteDuNiveau.addTilesetImage("IndustrialTile_55", "TuilesDeJeuIndustrie4");
        const tileset5 = carteDuNiveau.addTilesetImage("IndustrialTile_56", "TuilesDeJeuIndustrie5");
        const tileset6 = carteDuNiveau.addTilesetImage("Ladder1", "TuilesDeJeuIndustrie6");
        const tileset7 = carteDuNiveau.addTilesetImage("light", "TuilesDeJeuIndustrie7");
        const tileset8 = carteDuNiveau.addTilesetImage("minishop&callbox", "TuilesDeJeuIndustrie8");
        const tileset9 = carteDuNiveau.addTilesetImage("Pointer1", "TuilesDeJeuIndustrie9");
        const tileset10 = carteDuNiveau.addTilesetImage("smog1", "TuilesDeJeuIndustrie10");
        const tileset11 = carteDuNiveau.addTilesetImage("smog2", "TuilesDeJeuIndustrie11");
        const tileset12 = carteDuNiveau.addTilesetImage("sun", "TuilesDeJeuIndustrie12");
        const tileset13 = carteDuNiveau.addTilesetImage("city1plan", "TuilesDeJeuIndustrie13");
        const tileset14 = carteDuNiveau.addTilesetImage("city2plan", "TuilesDeJeuIndustrie14");
        const tileset15 = carteDuNiveau.addTilesetImage("city3plan", "TuilesDeJeuIndustrie15");
        const tileset16 = carteDuNiveau.addTilesetImage("city4plan", "TuilesDeJeuIndustrie16");
        const tileset17 = carteDuNiveau.addTilesetImage("Fence1", "TuilesDeJeuIndustrie17");
        const tileset18 = carteDuNiveau.addTilesetImage("Fence2", "TuilesDeJeuIndustrie18");
        const tileset19 = carteDuNiveau.addTilesetImage("Box8", "TuilesDeJeuIndustrie19");
        const tileset20 = carteDuNiveau.addTilesetImage("Background", "background");
        
        const calque = carteDuNiveau.createDynamicLayer("tiled_calque", 
            [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9, tileset10, tileset11, tileset12, tileset13, tileset14, tileset15, tileset16, tileset17, tileset18, tileset19, tileset20]
        );
        platerfomes_2emeP.setCollisionByProperty({ estSolide: true });
        platerformes_1erP.setCollisionByProperty({ estSolide: true });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(960, 540, "Ciel");
        this.player = this.physics.add.sprite(100, 450, "player");
        this.pants = this.physics.add.sprite(100, 450, "pants");
        this.shirt = this.physics.add.sprite(100, 450, "shirt");
        this.shoes = this.physics.add.sprite(100, 450, "shoes");
        this.player.direction = 'right';
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.shirt.setBounce(0.2);
        this.shirt.setCollideWorldBounds(true);
        this.shirt.direction = 'right';
        this.shoes.setBounce(0.2);
        this.shoes.setCollideWorldBounds(true);
        this.shoes.direction = 'right';
        this.anims.create({
            key: "anim_face",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20
            });
        this.anims.create({
            key: "anim_tourne_gauche",
            frames: this.anims.generateFrameNumbers("player", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite",
            frames: this.anims.generateFrameNumbers("player2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut",
            frames: this.anims.generateFrameNumbers("player", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_pants",
            frames: [{ key: "pants", frame: 4 }],
            frameRate: 20
            });
        this.anims.create({
            key: "anim_tourne_gauche_pants",
            frames: this.anims.generateFrameNumbers("pants", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_pants",
            frames: this.anims.generateFrameNumbers("pants2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({ 
            key: "anim_saut_pants",
            frames: this.anims.generateFrameNumbers("pants", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_shirt",
            frames: [{ key: "shirt", frame: 4 }],
            frameRate: 20
            });
        this.anims.create({
            key: "anim_tourne_gauche_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_shirt",
            frames: this.anims.generateFrameNumbers("shirt2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shirt",
            frames: this.anims.generateFrameNumbers("shirt", { start: 22, end: 24 }),
            frameRate: 4,
        });
        this.anims.create({
            key: "anim_face_shoes",
            frames: [{ key: "shoes", frame: 4 }],
            frameRate: 20
            });
        this.anims.create({
            key: "anim_tourne_gauche_shoes",
            frames: this.anims.generateFrameNumbers("shoes", { start: 14, end: 16 }),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_tourne_droite_shoes",
            frames: this.anims.generateFrameNumbers("shoes2", { start: 14, end: 16}),
            frameRate: 8,
        });
        this.anims.create({
            key: "anim_saut_shoes",
            frames: this.anims.generateFrameNumbers("shoes", { start: 22, end: 24 }),
            frameRate: 4,
        });
        clavier = this.input.keyboard.createCursorKeys();
    }
    update() {        
        if (clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.shirt.direction = 'left';
            this.shoes.direction = 'left';
            this.player.setVelocityX(-160);
            this.pants.setVelocityX(-160);
            this.shirt.setVelocityX(-160);
            this.shoes.setVelocityX(-160);
            this.player.anims.play("anim_tourne_gauche", true);
            this.pants.anims.play("anim_tourne_gauche_pants", true);
            this.shirt.anims.play("anim_tourne_gauche_shirt", true);
            this.shoes.anims.play("anim_tourne_gauche_shoes", true);
          } else if (clavier.right.isDown) {
            this.player.direction = 'right';
            this.pants.direction = 'right';
            this.shirt.direction = 'right';
            this.shoes.direction = 'right';
            this.player.setVelocityX(160);
            this.pants.setVelocityX(160);
            this.shirt.setVelocityX(160);
            this.shoes.setVelocityX(160);
            this.player.anims.play("anim_tourne_droite", true);
            this.pants.anims.play("anim_tourne_droite_pants", true);
            this.shirt.anims.play("anim_tourne_droite_shirt", true);
            this.shoes.anims.play("anim_tourne_droite_shoes", true);
          } else {
            this.player.setVelocityX(0);
            this.pants.setVelocityX(0);
            this.shirt.setVelocityX(0);
            this.shoes.setVelocityX(0);
            this.player.anims.play("anim_face");
            this.pants.anims.play("anim_face_pants");
            this.shirt.anims.play("anim_face_shirt");
            this.shoes.anims.play("anim_face_shoes");
          }
        
          if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.pants.anims.play("anim_saut_pants", true);
            this.shirt.anims.play("anim_saut_shirt", true);
            this.shoes.anims.play("anim_saut_shoes", true);
            this.pants.setVelocityY(-330);
            this.player.setVelocityY(-330);
            this.shirt.setVelocityY(-330);
            this.shoes.setVelocityY(-330);
          } }
}