import { GameHud } from "../GameHud";
import { DailyRaid } from "./DailyRaid";
import { NormalRaid } from "./NormalRaid";
import { WorkRaid } from "./WorkRaid";

export type RaidType = "normal" | "daily" | "work";

export class RaidFactory {
  static createRaid(
    scene: Phaser.Scene,
    type: RaidType,
    obstacles: Phaser.Physics.Arcade.Group,
    velocity: number,
    gameHud: GameHud
  ) {
    switch (type) {
      case "normal":
        new NormalRaid(scene, obstacles, velocity);
        break;
      case "daily":
        new DailyRaid(scene, obstacles, velocity, gameHud);
        break;
      case "work":
        new WorkRaid(scene, obstacles, velocity);
        break;
      default:
        break;
    }
  }
}