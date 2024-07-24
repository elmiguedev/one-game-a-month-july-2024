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

    this.loadAsepriteFiles();
    this.loadTilesetsFiles();
    this.loadMapsFiles();

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

  private loadAsepriteFiles() {
    const assets = import.meta.glob("../assets/sprites/**/*.aseprite", { as: "url" });
    for (const url in assets) {
      const key = url.split('/').pop().split('.')[0];
      const png = new URL(url.replace('.aseprite', '.png'), import.meta.url).href;
      const json = new URL(url.replace('.aseprite', '.json'), import.meta.url).href;
      this.load.aseprite(key, png, json);
    }
  }

  private loadTilesetsFiles() {
    const assets = import.meta.glob("../assets/tilesets/**/*.png", { as: "url" });
    for (const url in assets) {
      const key = url.split('/').pop().split('.')[0];
      const png = new URL(url, import.meta.url).href;
      this.load.image(key, png);
    }
  }

  private loadMapsFiles() {
    const assets = import.meta.glob("../assets/maps/**/*.json", { as: "url" });
    for (const url in assets) {
      const key = url.split('/').pop().split('.')[0];
      const map = new URL(url, import.meta.url).href;
      this.load.tilemapTiledJSON(key, map);
    }
  }





}