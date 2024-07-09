import { Scene } from "phaser";
import { SoundManager } from "../utlis/SoundManager";

export class StartScene extends Scene {

  constructor() {
    super({
      key: 'StartScene',
    });
  }

  public create() {
    const x = this.game.canvas.width / 2;
    const y = 300;
  }

  public startGame() {
    this.scene.start('GameScene');
  }

}