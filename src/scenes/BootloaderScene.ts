import { Scene } from "phaser";
import HousePng from "../assets/sprites/house/house.png";
import VictimPng from "../assets/sprites/victim/victim.png";
import VictimJson from "../assets/sprites/victim/victim.json";
import WindowPng from "../assets/sprites/window/window.png";
import WindPng from "../assets/sprites/wind/wind.png";
import WindJson from "../assets/sprites/wind/wind.json";

export class BootloaderScene extends Scene {
  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.load.image('house', HousePng);
    this.load.aseprite('victim', VictimPng, VictimJson);
    this.load.aseprite('wind', WindPng, WindJson);
    this.load.image('window', WindowPng);

    this.load.once('complete', () => {
      this.scene.start('GameScene');
    });
  }

  public create() {
  }
}