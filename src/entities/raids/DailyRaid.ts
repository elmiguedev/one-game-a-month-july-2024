import { Scene } from "phaser";
import { TrailObstacles } from "../obstacles/TrailObstacles";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";

/**
 * A raid sent on a daily metting 
 */

const RAID_TIME = 3000;

export class DailyRaid {
  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
    console.log("crea daily raid")
    let i = 0;
    new TrailObstacles(scene, obstacles, "jira", velocity);
    scene.time.addEvent({
      delay: RAID_TIME,
      repeat: 1,
      callback: () => {
        switch (++i) {
          case 1:
            new AlternateTrailObstacles(scene, obstacles, "chat", velocity);
            break;
          case 2:
            new TrailObstacles(scene, obstacles, "changuito", velocity);
          default:
            break;
        }
      }
    })
  }
}