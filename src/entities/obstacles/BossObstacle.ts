import { Obstacle } from "./Obstacle";

export class BossObstacle extends Obstacle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "changuito");
    this.setVelocity(0);
    this.setScale(26)
    // @ts-ignore
    this.allowGravity = false;
  }
}