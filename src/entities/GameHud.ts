import { Scene } from "phaser";

export class GameHud extends Scene {
  private timerTxt: Phaser.GameObjects.Text;

  constructor() {
    super("GameHud");
  }

  public create() {
    this.createTimerText();
  }

  public updateTimer(timer: number) {
    const minutes = 9 + Math.floor(timer / 60);
    const seconds = timer % 60;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;
    this.timerTxt.setText(minutesStr + ":" + secondsStr);
  }

  private createTimerText() {
    this.timerTxt = this.add.text(20, 20, "09:00", {
      color: "#000000",
      fontSize: "72px",
      fontFamily: "origami",
      fontStyle: "normal",
      backgroundColor: "#ffffff",
      padding: {
        x: 8,
        y: 10
      }
    }).setDepth(20)
  }


}