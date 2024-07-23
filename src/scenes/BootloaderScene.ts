import { Scene } from "phaser";
import { Loader } from "../entities/loader/Loader";

export class BootloaderScene extends Scene {
  private loader: Loader;

  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public async preload() {
    this.loader = new Loader(this);
    this.loadTileset('terrain');
    this.loadAseprite("robot");
    this.loadTilemap("world");

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

  private loadAseprite(key: string) {
    const png = new URL(`../assets/sprites/${key}/${key}.png`, import.meta.url).href;
    const json = new URL(`../assets/sprites/${key}/${key}.json`, import.meta.url).href;
    this.load.aseprite(key, png, json);
  }

  private loadImage(key: string) {
    const png = new URL(`../assets/sprites/${key}/${key}.png`, import.meta.url).href;
    this.load.image(key, png);
  }

  private loadTileset(key: string) {
    const png = new URL(`../assets/tilesets/${key}/${key}.png`, import.meta.url).href;
    this.load.image(key, png);
  }

  private loadTilemap(key: string) {
    const json = new URL(`../assets/maps/${key}.json`, import.meta.url).href;
    this.load.tilemapTiledJSON(key, json);
  }


}