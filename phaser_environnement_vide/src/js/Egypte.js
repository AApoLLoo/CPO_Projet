var clavier;
var player;
export default class Egypte extends Phaser.Scene {
    constructor() {
        super({key : "Egypte"});
    }
    preload() {
        this.load.image("Ciel", "src/assets/Ciel.png");
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("player2", "src/assets/Personnage - Copie.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants", "src/assets/Pants.png", { frameWidth: 80, frameHeight: 64 });
        this.load.spritesheet("pants2", "src/assets/Pants - Copie.png", { frameWidth: 80, frameHeight: 64 });
    }
    create(){
        this.add.image(960, 540, "Ciel");
        this.player = this.physics.add.sprite(100, 450, "player");
        this.pants = this.physics.add.sprite(100, 450, "pants");
        this.pants.setBounce(0.2);
        this.pants.setCollideWorldBounds(true);
        this.pants.direction = 'right';
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.direction = 'right';
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
            frameRate: 8,
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
            frameRate: 8,
        });
        clavier = this.input.keyboard.createCursorKeys();
    }
    update() {        
        if (clavier.left.isDown) {
            this.player.direction = 'left';
            this.pants.direction = 'left';
            this.player.setVelocityX(-160);
            this.pants.setVelocityX(-160);
            this.player.anims.play("anim_tourne_gauche", true);
            this.player.anims.play("anim_tourne_gauche_pants", true);
          } else if (clavier.right.isDown) {
            this.player.direction = 'right';
            this.pants.direction = 'right';
            this.player.setVelocityX(160);
            this.pants.setVelocityX(160);
            this.player.anims.play("anim_tourne_droite", true);
            this.player.anims.play("anim_tourne_droite_pants", true);
          } else {
            this.player.setVelocityX(0);
            this.pants.setVelocityX(0);
            this.player.anims.play("anim_face");
            this.player.anims.play("anim_face_pants");
          }
        
          if (clavier.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)) {
            this.player.anims.play("anim_saut", true);
            this.player.anims.play("anim_saut", true);
            this.pants.setVelocityY(-330);
            this.player.setVelocityY(-330);
          } }
        
    }