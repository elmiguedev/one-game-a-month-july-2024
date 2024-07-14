import { OnlyCoffeeRaid } from "./OnlyCoffeeRaid";

export class HighOnlyCoffeeRaid extends OnlyCoffeeRaid {
  constructor(scene: Phaser.Scene, items: Phaser.Physics.Arcade.Group, velocity: number) {
    super(scene, items, velocity, true);
  }
}