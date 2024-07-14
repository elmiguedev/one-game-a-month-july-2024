import { ITEMS_HEIGHT } from "../../constants";
import { Platform } from "../platforms/Platform";
import { Obstacle } from "./Obstacle";

export class PlatformObstacle {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number, platform: Platform) {
    const y = platform.y - 160;
    const z = new Obstacle(
      scene,
      scene.game.canvas.width + platform.width / 2,
      y,
      texture
    );
    group.add(z);
    z.setVelocityX(velocity);
  }
}