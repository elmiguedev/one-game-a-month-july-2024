import { SCALE_FACTOR, TILE_SIZE } from "../../constants";

export class Robot extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "robot");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0);
    this.setScale(SCALE_FACTOR);
    this.setGridPosition(x, y);
  }

  public setGridPosition(x: number, y: number) {
    const worldX = x * TILE_SIZE * SCALE_FACTOR;
    const worldY = y * TILE_SIZE * SCALE_FACTOR;
    this.x = worldX;
    this.y = worldY;
  }

  public getGridPosition() {
    return {
      x: Math.floor(this.x / TILE_SIZE / SCALE_FACTOR),
      y: Math.floor(this.y / TILE_SIZE / SCALE_FACTOR)
    }
  }

  public move(dx: number, dy: number) {
    const position = this.getGridPosition();
    this.setGridPosition(position.x + dx, position.y + dy);
    // this.scene.add.tween({
    //   targets: this,
    //   x: this.x + dx * TILE_SIZE * SCALE_FACTOR,
    //   y: this.y + dy * TILE_SIZE * SCALE_FACTOR,
    //   duration: 100,
    //   ease: 'Linear',
    //   onComplete: () => {
    //     this.setGridPosition(position.x + dx, position.y + dy);
    //   }
    // })
  }


}