import { DailyRaid } from "./DailyRaid";
import { NormalRaid } from "./NormalRaid";

export type RaidType = "normal" | "daily";

export class RaidFactory {
  static createRaid(scene: Phaser.Scene, type: RaidType, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
    switch (type) {
      case "normal":
        new NormalRaid(scene, obstacles, velocity);
        break;
      case "daily":
        new DailyRaid(scene, obstacles, velocity);
        break;
      default:
        break;
    }
  }
}