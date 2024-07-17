import { Scene } from "phaser";
import { TrailObstacles } from "../obstacles/TrailObstacles";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";
import { GameHud } from "../GameHud";

/**
 * A raid sent on a daily metting 
 */

const RAID_TIME = 4000;

export class DailyRaid {
  constructor(
    private scene: Scene,
    private obstacles: Phaser.Physics.Arcade.Group,
    private velocity: number,
    private gameHud: GameHud,
    private items: Phaser.Physics.Arcade.Group
  ) {
    this.setMeetingMode();
    let i = 0;
    new TrailObstacles(scene, obstacles, "jira", velocity, items);
    scene.time.addEvent({
      delay: RAID_TIME,
      repeat: 1,
      callback: () => {
        switch (++i) {
          case 1:
            new AlternateTrailObstacles(scene, obstacles, "chat", velocity);
            break;
          case 2:
            new TrailObstacles(scene, obstacles, "changuito", velocity, items);
          default:
            break;
        }
      }
    })
  }

  private setMeetingMode() {
    this.gameHud.setMeetingMode("Daily");
    this.scene.cameras.main.setBackgroundColor(0x94baff);
    this.scene.time.delayedCall(12000, () => {
      this.gameHud.endMeeting();
      this.scene.cameras.main.setBackgroundColor(0xffffff);
    })
  }
}