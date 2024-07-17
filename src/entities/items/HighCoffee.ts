import { ITEMS_HEIGHT } from "../../constants";
import { CoffeeItem } from "./CoffeeItem";

export class HighCoffee extends CoffeeItem {
  constructor(scene: Phaser.Scene, velocity: number, items: Phaser.Physics.Arcade.Group) {
    super(scene, scene.game.canvas.width, ITEMS_HEIGHT[1], velocity);
    items.add(this);
    this.setVelocityX(velocity);
  }
}