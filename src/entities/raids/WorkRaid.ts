import { Scene } from "phaser";
import { ZigZagObstacle } from "../obstacles/ZigZagObstacle";
import { AlternateZigZagObstacles } from "../obstacles/AlternateZigZagObstacle";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";

/**
 * A work raid which send trails of
 * PRs and Slaks 
 */

const RAID_TIME = 4000;

export class WorkRaid {
  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
    console.log("work raid")
    new AlternateTrailObstacles(scene, obstacles, 'slack', velocity);
    scene.time.addEvent({
      delay: RAID_TIME,
      repeat: 1,
      callback: () => {
        new AlternateZigZagObstacles(scene, obstacles, "octocat", velocity);
      }
    })
  }
}