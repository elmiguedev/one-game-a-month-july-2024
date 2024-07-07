import { Scene } from "phaser";

export class MenuButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, type: 'start' | 'credits') {
    super(scene, x, y, 'start');
    this.scene.add.existing(this);
    this.anims.createFromAseprite(type);
    this.setInteractive({ cursor: 'pointer' });
    this.anims.play({
      key: 'idle',
      repeat: -1
    }, true)
  }
}