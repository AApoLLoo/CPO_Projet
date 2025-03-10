export default class Egypte extends Phaser.Scene {
    constructor() {
        super({key : "Egypte"});
    }
    preload() {
        this.load.image("Ciel", "src/assets/Ciel.png");
        this.load.spritesheet("player", "src/assets/Personnage.png", { frameWidth: 80, frameHeight: 64 });
    }
    create(){
        this.add.image(960, 540, "Ciel");
        this.player = this.physics.add.sprite(100, 450, "player");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (clavier.left.isDown) {
            player.direction = 'left';
            player.setVelocityX(-160);
            player.anims.play("anim_tourne_gauche", true);
          } else if (clavier.right.isDown) {
            player.direction = 'right';
            player.setVelocityX(160);
            player.anims.play("anim_tourne_droite", true);
          } else {
            player.setVelocityX(0);
            player.anims.play("anim_face");
          }
        
          if (clavier.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
          } }
        
        
    }