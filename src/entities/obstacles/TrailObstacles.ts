import { ITEMS_HEIGHT } from "../../constants";
import { CoffeeItem } from "../items/CoffeeItem";
import { Obstacle } from "./Obstacle";

const OBSTACLES_COUNT = 3;

export class TrailObstacles {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number, items: Phaser.Physics.Arcade.Group) {
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
    });
    scene.time.delayedCall(3000, () => {
      const coffee = new CoffeeItem(
        scene,
        scene.game.canvas.width,
        ITEMS_HEIGHT[1],
        velocity
      );
      items.add(coffee);
      coffee.setVelocityX(velocity);
    });
  }
}