export class Robot extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "robot");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0);
    this.setScale(10);
  }
}