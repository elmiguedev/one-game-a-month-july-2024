import { Scene } from "phaser";
import { PLAYER_JUMP_VELOCITY } from "../constants";
import { SoundManager } from "../utlis/SoundManager";

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
      SoundManager.getInstance(this.scene).playJump();
      this.setVelocityY(PLAYER_JUMP_VELOCITY)
    }
  }


}