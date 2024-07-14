import { PLATFORM_NORMAL_HEIGHT } from "../../constants";
import { CoffeeItem } from "../items/CoffeeItem";
import { Item } from "../items/Item";
import { Platform } from "./Platform";

export class NormalPlatform {
  public platform: Platform;
  constructor(private scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, velocity: number) {
    const y = PLATFORM_NORMAL_HEIGHT
    this.platform = new Platform(
      scene,
      scene.game.canvas.width,
      y,
      6);
    group.add(this.platform);
    //@ts-ignore
    this.platform.body.setVelocityX(velocity);
  }

}