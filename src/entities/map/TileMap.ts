import { Scene } from "phaser";
import { SCALE_FACTOR } from "../../constants";

export class TileMap {
  constructor(
    private scene: Scene
  ) {

    const map = this.scene.add.tilemap("world", 16, 16);
    const tileset = map.addTilesetImage("terrain", "terrain");
    const floor = map.createLayer("floor", tileset, 0, 0).setScale(SCALE_FACTOR);
    const walls = map.createLayer("walls", tileset, 0, 0).setScale(SCALE_FACTOR);

  }


}