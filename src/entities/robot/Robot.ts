import { ROBOT_DEPTH, SCALE_FACTOR, TILE_SIZE } from "../../constants";

export class Robot extends Phaser.GameObjects.Sprite {
  private isMoving = false;
  private moveTween: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "robot");
    this.scene.add.existing(this);
    this.setOrigin(0);
    this.setScale(SCALE_FACTOR);
    this.setDepth(ROBOT_DEPTH)
    this.setGridPosition(x, y);
    this.anims.createFromAseprite("robot");
  }

  public setGridPosition(x: number, y: number) {
    this.stopMove();
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

  public get position() {
    return {
      x: Math.floor(this.x / TILE_SIZE / SCALE_FACTOR),
      y: Math.floor(this.y / TILE_SIZE / SCALE_FACTOR)
    }
  }

  public move(dx: number, dy: number) {
    if (!this.isMoving) {
      this.anims.play("walk_x", true);
      this.isMoving = true;
      this.moveTween = this.scene.add.tween({
        targets: this,
        x: this.x + (dx * TILE_SIZE * SCALE_FACTOR),
        y: this.y + (dy * TILE_SIZE * SCALE_FACTOR),
        duration: 300,
        ease: 'Linear',
        onComplete: () => {
          this.isMoving = false;
        }
      })
    }
  }

  public stopMove() {
    this.isMoving = false;
    if (this.moveTween)
      this.moveTween.destroy();
  }


}