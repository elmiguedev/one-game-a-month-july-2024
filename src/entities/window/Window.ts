export class Window extends Phaser.GameObjects.Container {

  private windowImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.windowImage = this.scene.add.image(0, 0, 'window');
    this.windowImage.setOrigin(0, 0);
    this.add(this.windowImage);
    this.scene.add.existing(this);

    this.windowImage.setInteractive({ cursor: 'pointer' });
    this.windowImage.on('pointerdown', () => {
      console.log("tuc window")
    })

  }

}