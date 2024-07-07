import { WINDOW_HP, WINDOW_REPAIR_VALUE } from "../../constants";

export class Window extends Phaser.GameObjects.Container {

  private windowImage: Phaser.GameObjects.Image;
  private hp: number = WINDOW_HP;
  private alert: Phaser.GameObjects.Image;
  private alertTimer: Phaser.Time.TimerEvent;
  private breakTimer: Phaser.Time.TimerEvent;

  public onBreak: () => void;
  public onClick: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.windowImage = this.scene.add.image(0, 0, 'window');

    this.add(this.windowImage);
    this.scene.add.existing(this);

    this.windowImage.setInteractive({ cursor: 'pointer' });
    this.windowImage.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick();
      }
    })

  }

  public repair(value: number = WINDOW_HP) {
    this.hideAlert();
  }

  public damage(value: number = 1) {
    if (this.breakTimer) return;
    this.showAlert();
    this.breakTimer = this.scene.time.delayedCall(8000, () => {
      if (this.onBreak) {
        this.onBreak();
      }
    })
  }

  private showAlert() {
    if (!this.alert) {
      this.alert = this.scene.add.image(
        this.x,
        this.y - 30,
        'repair'
      ).setVisible(false).setScale(0.5);
      this.alertTimer = this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.alert.setVisible(!this.alert.visible)
        },
        loop: true
      })
    }

    this.alertTimer.reset({
      delay: 1000,
      callback: () => {
        this.alert.setVisible(!this.alert.visible)
      },
      loop: true
    });



  }

  private hideAlert() {
    if (this.alertTimer) {
      this.alertTimer.destroy();
      this.breakTimer.destroy();
      this.breakTimer = undefined;
    }

    this.alert.setVisible(false);
  }

}