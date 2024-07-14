import { Scene } from "phaser";
import { NormalObstacle } from "../obstacles/NormalObstacle";
import { Obstacle } from "../obstacles/Obstacle";

/**
 * A normal raid which send 3 obstacles with 
 * normal velocity
 */

const RAID_TIME = 3000;

export class NormalRaid {
  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
    new NormalObstacle(scene, obstacles, Obstacle.getRandomObstacleType(), velocity);
    scene.time.addEvent({
      delay: RAID_TIME,
      repeat: 1,
      callback: () => {
        new NormalObstacle(scene, obstacles, Obstacle.getRandomObstacleType(), velocity);
      }
    })
  }
}