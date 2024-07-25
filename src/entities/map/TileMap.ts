import { Scene } from "phaser";
import { SCALE_FACTOR } from "../../constants";



export class TileMap {

  public walls: Phaser.Tilemaps.TilemapLayer;

  constructor(
    private scene: Scene
  ) {

    const map = this.scene.add.tilemap("world", 16, 16);
    const tileset = map.addTilesetImage("terrain", "terrain");
    const floor = map.createLayer("floor", tileset, 0, 0)
      .setOrigin(0, 0)
      .setScale(SCALE_FACTOR);
    this.walls = map.createLayer("walls", tileset, 0, 0)
      .setOrigin(0, 0)
      .setScale(SCALE_FACTOR)

    this.scene.physics.add.existing(this.walls);
  }

  public hasSolid(x: number, y: number) {
    const tile = this.walls.getTileAt(x, y);
    return !!tile?.properties?.solid;
  }



}