import { Wind } from "./Wind";

export class ApocalypsisStorm {
  private scene: Phaser.Scene;
  private storm: Phaser.Physics.Arcade.Group;
  private windCount: number = 500;
  public onStartEnd: () => void;
  public onEnd: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.storm = this.scene.physics.add.group({
      classType: Wind,
    });
  }

  public start() {
    this.scene.time.addEvent({
      delay: 5,
      repeat: this.windCount,
      callback: () => {
        const x = Phaser.Math.Between(0, 1280);
        const y = Phaser.Math.Between(0, 720);
        const wind = this.storm.get(x, y) as Wind;
        wind.setType('apocalypsis');

        if (this.storm.countActive() >= this.windCount) {
          if (this.onStartEnd) {
            this.onStartEnd();
          }
        }
      },

    })
  }

  public end() {
    this.scene.time.addEvent({
      delay: 5,
      repeat: this.windCount,
      callback: () => {
        const wind = this.storm.getFirstAlive();
        if (wind) {
          wind.destroy(true);
          wind.setActive(false);
        }
        if (this.storm.countActive() <= 1) {
          if (this.onEnd) {
            this.onEnd();
          }
        }
      },
    })
  }
}