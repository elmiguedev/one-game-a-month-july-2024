import { ITEMS_HEIGHT } from "../../constants";
import { Obstacle } from "./Obstacle";

const OBSTACLES_COUNT = 3;

export class TrailObstacles {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number,) {
    scene.time.addEvent({
      delay: 1000,
      repeat: OBSTACLES_COUNT,
      callback: () => {
        const c = new Obstacle(
          scene,
          scene.game.canvas.width,
          ITEMS_HEIGHT[0],
          texture
        );
        group.add(c);
        c.setVelocityX(velocity);
      },
    })
  }
}