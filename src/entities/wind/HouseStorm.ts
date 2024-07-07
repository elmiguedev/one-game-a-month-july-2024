import { Wind } from "./Wind";

export class HouseStorm {
  private scene: Phaser.Scene;
  private storm: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.storm = this.scene.physics.add.group({
      classType: Wind,
    });

    for (let i = 0; i < 14; i++) {
      this.storm.get(100 * i, 20)
      this.storm.get(100 * i, 700)
      this.storm.get(20, 100 * i)
      this.storm.get(1270, 100 * i)
    }
  }
}