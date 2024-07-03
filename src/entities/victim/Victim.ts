export class Victim extends Phaser.GameObjects.Container {

  private victimImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.victimImage = this.scene.add.image(0, 0, 'victim');
    this.victimImage.setOrigin(0, 0);
    this.add(this.victimImage);
    this.scene.add.existing(this);

    this.victimImage.setInteractive({ cursor: 'pointer' });
    this.victimImage.on('pointerdown', () => {
      console.log("tuc victim")
    })

  }

}