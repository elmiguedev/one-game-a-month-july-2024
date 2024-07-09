import { Scene } from "phaser";

const WIDTH: number = 120;
const HEIGHT: number = 40;
const COLOR: number = 0x000000;

export class Platform extends Phaser.GameObjects.Rectangle {


  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, WIDTH, HEIGHT, COLOR);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // @ts-ignore
    this.body.allowGravity = false;
  }
}