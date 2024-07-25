import { Scene } from "phaser";
import { FLOOR_DEPTH, SCALE_FACTOR, TILE_SIZE, WALL_DEPTH } from "../../constants";



export class TileMap {

  public floor: Phaser.Tilemaps.TilemapLayer;
  public walls: Phaser.Tilemaps.TilemapLayer;
  public objects: Phaser.Tilemaps.ObjectLayer;
  public map: Phaser.Tilemaps.Tilemap;
  public tileset: Phaser.Tilemaps.Tileset;

  constructor(
    private scene: Scene
  ) {
    this.createMap("world");
  }

  public hasSolid(x: number, y: number) {
    const tile = this.walls.getTileAt(x, y);
    return !!tile?.properties?.solid;
  }

  public getPortal(x: number, y: number) {
    // const tile = this.floor.getTileAt(x, y);
    // console.log("el tile", tile)
    // if (tile?.properties?.portal) {
    //   return {
    //     portal: tile.properties.portal,
    //     x: tile.properties.portal_x,
    //     y: tile.properties.portal_y
    //   }
    // }
    const objects = this.map.getObjectLayer("objects");
    for (let i = 0; i < objects.objects.length; i++) {
      const object = objects.objects[i];
      const tileX = Math.floor(object.x / TILE_SIZE);
      const tileY = Math.floor(object.y / TILE_SIZE);
      if (x === tileX && y === tileY) {
        console.log("PROPS", object.properties)
        return {
          portal: object.properties.find(prop => prop.name === "portal").value,
          x: object.properties.find(prop => prop.name === "portal_x").value,
          y: object.properties.find(prop => prop.name === "portal_y").value
        }
      }

    }
  }

  public changeMap(key: string) {
    this.walls.destroy();
    this.floor.destroy();
    this.map.destroy();

    this.createMap(key);
  }


  private createMap(key: string) {
    this.map = this.scene.add.tilemap(key, 16, 16);
    if (!this.tileset)
      this.tileset = this.map.addTilesetImage("terrain", "terrain");

    this.floor = this.map.createLayer("floor", this.tileset, 0, 0)
      .setOrigin(0, 0)
      .setDepth(FLOOR_DEPTH)
      .setScale(SCALE_FACTOR);
    this.walls = this.map.createLayer("walls", this.tileset, 0, 0)
      .setOrigin(0, 0)
      .setDepth(WALL_DEPTH)
      .setScale(SCALE_FACTOR)

  }


}