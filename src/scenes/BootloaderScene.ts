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

    // this.loadAsepriteFiles();
    // this.loadTilesetsFiles();
    // this.loadMapsFiles();

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

  // private loadAsepriteFiles() {
  //   const assets = import.meta.glob("../assets/sprites/**/*.aseprite", { eager: true, query: "url" });
  //   for (const url in assets) {
  //     const key = url.split('/').pop().split('.')[0];
  //     const png = new URL(url.replace('.aseprite', '.png'), import.meta.url).href;
  //     const json = new URL(url.replace('.aseprite', '.json'), import.meta.url).href;
  //     this.load.aseprite(key, png, json);
  //   }
  // }

  // private loadTilesetsFiles() {
  //   const assets = import.meta.glob("../assets/tilesets/**/*.png", { eager: true });
  //   for (const url in assets) {
  //     const key = url.split('/').pop().split('.')[0];
  //     const png = new URL(url, import.meta.url).href;
  //     this.load.image(key, png);
  //   }
  // }

  // private loadMapsFiles() {
  //   const assets = import.meta.glob("../assets/maps/**/*.json", { eager: true });
  //   for (const url in assets) {
  //     const key = url.split('/').pop().split('.')[0];
  //     const map = new URL(url, import.meta.url).href;
  //     this.load.tilemapTiledJSON(key, map);
  //   }
  // }


  private loadAseprite(key: string) {
    const png = new URL(`../assets/sprites/${key}/${key}.png`, import.meta.url).href;
    const json = new URL(`../assets/sprites/${key}/${key}.json`, import.meta.url).href;
    this.load.aseprite(key, png, json);
  }

  private loadImage(key: string) {
    const png = new URL(`../assets/images/${key}/${key}.png`, import.meta.url).href;
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