import { PLATFORM_HIGH_HEIGHT } from "../../constants";
import { Platform } from "./Platform";

export class HighPlatform {
  public platform: Platform;
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, velocity: number, up: boolean = false) {
    const y = PLATFORM_HIGH_HEIGHT
    this.platform = new Platform(
      scene,
      scene.game.canvas.width,
      y,
      6);
    group.add(this.platform);
    //@ts-ignore
    this.platform.body.setVelocityX(velocity);
  }

  public get x() {
    return this.platform.x
  }

  public get y() {
    return this.platform.y
  }

  public get width() {
    return this.platform.width
  }
}