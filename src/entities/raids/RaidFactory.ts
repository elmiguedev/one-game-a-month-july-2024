import { GameHud } from "../GameHud";
import { BossRaid } from "./BossRaid";
import { DailyRaid } from "./DailyRaid";
import { HighOnlyCoffeeRaid } from "./HighOnlyCoffeeRaid";
import { NormalRaid } from "./NormalRaid";
import { OnlyCoffeeRaid } from "./OnlyCoffeeRaid";
import { PlanningRaid } from "./PlanningRaid";
import { PlatformRaid } from "./PlatformRaid";
import { WorkRaid } from "./WorkRaid";

export type RaidType = "normal" | "daily" | "work" | "platform" | "boss" | "coffee" | "high-coffee" | "planning";

export class RaidFactory {
  static createRaid(
    scene: Phaser.Scene,
    type: RaidType,
    obstacles: Phaser.Physics.Arcade.Group,
    velocity: number,
    gameHud: GameHud,
    platforms: Phaser.Physics.Arcade.Group,
    items: Phaser.Physics.Arcade.Group,
    onBossDeath: () => void
  ) {
    switch (type) {
      case "normal":
        new NormalRaid(scene, obstacles, velocity);
        break;
      case "daily":
        new DailyRaid(scene, obstacles, velocity, gameHud, items);
        break;
      case "planning":
        new PlanningRaid(scene, obstacles, velocity, gameHud, items);
        break;
      case "work":
        new WorkRaid(scene, obstacles, velocity);
        break;
      case "platform":
        new PlatformRaid(scene, obstacles, velocity, platforms, items);
        break;
      case "boss":
        new BossRaid(scene, obstacles, velocity, items, onBossDeath);
        break;
      case "coffee":
        new OnlyCoffeeRaid(scene, items, velocity);
        break;
      case "high-coffee":
        new HighOnlyCoffeeRaid(scene, items, velocity);
        break;
      default:
        break;
    }
  }
}