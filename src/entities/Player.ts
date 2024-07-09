import { Scene } from "phaser";
import { PLAYER_JUMP_VELOCITY } from "../constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.anims.createFromAseprite("player");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(10);
    this.anims.play({
      key: 'walk',
      repeat: -1,
      frameRate: 10
    })
  }

  public jump() {
    if (this.body.blocked.down) {
      this.setVelocityY(PLAYER_JUMP_VELOCITY)
    }
  }


}