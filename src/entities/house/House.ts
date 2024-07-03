export class House extends Phaser.GameObjects.Container {

  private houseImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.houseImage = this.scene.add.image(0, 0, 'house');
    this.houseImage.setOrigin(0, 0);
    this.add(this.houseImage);
    this.scene.add.existing(this);

  }

}