import { Scene } from "phaser";

export class TypingText extends Phaser.GameObjects.Text {
  public onFinish: () => void
  private templateText: string;
  constructor(
    scene: Scene,
    x: number,
    y: number,
    textTemplate: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, "", style || {
      fontSize: '48px',
      color: "black",
      fontFamily: "bulkypix",
      align: "center"
    });
    this.scene.add.existing(this);
    this.templateText = textTemplate;;

  }

  public start() {
    let txt = "";
    this.scene.time.addEvent({
      delay: 50,
      repeat: this.templateText.length - 1,
      callback: () => {
        txt = txt + this.templateText[txt.length];
        this.setText(txt);
        if (txt.length == this.templateText.length) {
          if (this.onFinish)
            this.onFinish();
        }
      }
    })
  }

}