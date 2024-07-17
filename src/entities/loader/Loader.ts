import { Scene } from "phaser";

export class Loader {
  private value = 0;
  private maxValue = 1;
  private bar: Phaser.GameObjects.Rectangle;
  private barMaxWidth = 360;
  private border: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  constructor(private scene: Scene) {
    const x = this.scene.game.canvas.width / 2;
    const y = this.scene.game.canvas.height / 2;

    this.border = this.scene.add.rectangle(
      x,
      y,
      400,
      60,
      0xffffff
    )

    this.scene.add.rectangle(
      x,
      y,
      380,
      40,
      0x000000
    )

    this.bar = this.scene.add.rectangle(
      x - 180,
      y,
      0,
      20,
      0xffffff
    ).setOrigin(0, 0.5)
  }

  public update(value: number) {
    this.bar.width = this.barMaxWidth * value;
  }

  public setAlpha(alpha: number) {
    this.border.setAlpha(alpha);
    this.bar.setAlpha(alpha);
  }
}