import { Item } from "./Item";

export class CoffeeItem extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'coffee');
  }
}