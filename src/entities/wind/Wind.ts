export class Wind extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'wind');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.anims.createFromAseprite('wind');
    this.setType('outside');
    this.setAlpha(0.5);
    this.anims.play({
      key: 'idle',
      repeat: -1,
      timeScale: Math.random() * 0.5 + 0.5

    }, true);
  }

  public setType(type: 'outside' | 'apocalypsis') {
    switch (type) {
      case 'outside': this.setTint(0x639bff); break;
      case 'apocalypsis': this.setTint(0xff0000); break;
    }
  }
}
