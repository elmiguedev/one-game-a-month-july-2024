import { Scene } from "phaser";
import DotPng from "../assets/sprites/dot.png";
import { Loader } from "../entities/loader/Loader";

export class BootloaderScene extends Scene {
  private loader: Loader;

  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.loader = new Loader(this);
    this.load.image('dot', DotPng);

    this.load.on('progress', (value: number) => {
      this.loader.update(value);
    });

    this.load.once('complete', () => {
      this.startGame();
    });
  }

  public startGame() {
    let alpha = 1;
    this.time.addEvent({
      delay: 2,
      loop: true,
      callback: () => {
        alpha -= 0.01;
        this.loader.setAlpha(alpha);
        if (alpha <= 0) {
          this.scene.start('StartScene');
        }
      }
    })
  }


}