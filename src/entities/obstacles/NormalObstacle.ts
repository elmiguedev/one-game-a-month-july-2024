import { ITEMS_HEIGHT } from "../../constants";
import { Obstacle } from "./Obstacle";

export class NormalObstacle {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number, up: boolean = false) {
    const y = up ? ITEMS_HEIGHT[1] : ITEMS_HEIGHT[0];
    const z = new Obstacle(
      scene,
      scene.game.canvas.width,
      y,
      texture
    );
    group.add(z);
    z.setVelocityX(velocity);
  }
}