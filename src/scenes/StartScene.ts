import { Scene } from "phaser";
import { SoundManager } from "../utlis/SoundManager";

export class StartScene extends Scene {
  private skip: boolean = false;

  constructor() {
    super({
      key: 'StartScene',
    });
  }

  public init(data: any) {
    this.skip = data && data.skip;
  }

  public create() {
    this.createCamera();
    this.createMenu();
  }

  public startGame() {
    this.scene.start('GameScene');
  }

  private createCamera() {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  private createMenu() {
    this.add.text(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2, "press [SPACE] to start", {
      fontSize: '48px',
      color: "black",
      fontFamily: "bulkypix",
      align: "center"
    }).setWordWrapWidth(1100).setOrigin(0.5);

    const k = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    k.on('down', () => {
      this.scene.start('GameScene');
    })
  }

}