import { GameHud } from "../GameHud";
import { BossRaid } from "./BossRaid";
import { DailyRaid } from "./DailyRaid";
import { NormalRaid } from "./NormalRaid";
import { PlatformRaid } from "./PlatformRaid";
import { WorkRaid } from "./WorkRaid";

export type RaidType = "normal" | "daily" | "work" | "platform" | "boss";

export class RaidFactory {
  static createRaid(
    scene: Phaser.Scene,
    type: RaidType,
    obstacles: Phaser.Physics.Arcade.Group,
    velocity: number,
    gameHud: GameHud,
    platforms: Phaser.Physics.Arcade.Group,
    items: Phaser.Physics.Arcade.Group
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
      case "platform":
        new PlatformRaid(scene, obstacles, velocity, platforms, items);
        break;
      case "boss":
        new BossRaid(scene, obstacles, velocity);
        break;
      default:
        break;
    }
  }
}