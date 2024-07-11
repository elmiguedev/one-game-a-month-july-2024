
import { ZigZagObstacle } from "./ZigZagObstacle";

const OBSTACLES_COUNT = 3;

export class AlternateZigZagObstacles {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number,) {
    let alternate = false;
    scene.time.addEvent({
      delay: 1000,
      repeat: OBSTACLES_COUNT,
      callback: () => {
        const z = new ZigZagObstacle(
          scene,
          group,
          texture,
          velocity,
          alternate
        );
        alternate = !alternate;
      },
    })
  }
}