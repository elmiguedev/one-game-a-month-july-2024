import { Scene } from "phaser";
import DotPng from "../assets/sprites/dot.png";
import PlayerPng from "../assets/sprites/player/player.png";
import PlayerJson from "../assets/sprites/player/player.json";

export class BootloaderScene extends Scene {
  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.load.image('dot', DotPng);
    this.load.aseprite("player", PlayerPng, PlayerJson);

    this.load.once('complete', () => {
      // this.scene.start('StartScene');
      this.scene.start('GameScene');
    });
  }

  public create() {
  }
}