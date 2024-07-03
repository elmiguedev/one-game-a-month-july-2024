import { Scene } from "phaser";
import HousePng from "../assets/sprites/house/house.png";
import VictimPng from "../assets/sprites/victim/victim.png";
import WindowPng from "../assets/sprites/window/window.png";

export class BootloaderScene extends Scene {
  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.load.image('house', HousePng);
    this.load.image('victim', VictimPng);
    this.load.image('window', WindowPng);

    this.load.once('complete', () => {
      this.scene.start('GameScene');
    });
  }

  public create() {
  }
}