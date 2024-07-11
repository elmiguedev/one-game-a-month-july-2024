

import { ITEMS_HEIGHT } from "../../constants";
import { Obstacle } from "./Obstacle";

const OBSTACLES_COUNT = 3;

export class AlternateTrailObstacles {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number,) {
    let last_y = 0;
    scene.time.addEvent({
      delay: 1000,
      repeat: OBSTACLES_COUNT,
      callback: () => {
        const c = new Obstacle(
          scene,
          scene.game.canvas.width,
          ITEMS_HEIGHT[last_y],
          texture
        );
        group.add(c);
        c.setVelocityX(velocity);
        last_y = last_y === 0 ? 1 : 0
      },
    })
  }
}