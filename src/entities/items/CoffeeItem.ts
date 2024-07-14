import { Item } from "./Item";

export class CoffeeItem extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, velocity: number) {
    super(scene, x, y, 'coffee');
    this.setVelocityX(velocity);
  }
}