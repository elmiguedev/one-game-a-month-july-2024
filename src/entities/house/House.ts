import { Scene } from "phaser";

export class House {
  private scene: Scene;
  private houseImage: Phaser.GameObjects.Image;
  public walls: Phaser.Physics.Arcade.StaticGroup;

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.houseImage = this.scene.add.image(0, 0, 'house');
    this.houseImage.setOrigin(0, 0);
    this.createWalls();
  }

  private createWalls() {
    this.walls = this.scene.physics.add.staticGroup();
    const topWall = this.scene.add.rectangle(0, 60, 1280, 10, 0x000000).setOrigin(0, 0);
    const bottomWall = this.scene.add.rectangle(0, 660, 1280, 10, 0x000000).setOrigin(0, 0);
    const leftWall = this.scene.add.rectangle(60, 0, 10, 720, 0x000000).setOrigin(0, 0);
    const rightWall = this.scene.add.rectangle(1210, 0, 10, 720, 0x000000).setOrigin(0, 0);
    this.walls.add(topWall);
    this.walls.add(leftWall);
    this.walls.add(rightWall);
    this.walls.add(bottomWall);
    this.walls.setDepth(1);
  }

}