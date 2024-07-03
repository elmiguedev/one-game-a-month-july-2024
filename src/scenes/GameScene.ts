import { Scene } from "phaser";

export class GameScene extends Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.add.text(20, 20, 'Hello, World!');
  }
}