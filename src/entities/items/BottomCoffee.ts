import { ITEMS_HEIGHT } from "../../constants";
import { CoffeeItem } from "./CoffeeItem";

export class BottomCoffee extends CoffeeItem {
  constructor(scene: Phaser.Scene, velocity: number, items: Phaser.Physics.Arcade.Group) {
    super(scene, scene.game.canvas.width, ITEMS_HEIGHT[0], velocity);
    items.add(this);
    this.setVelocityX(velocity);
  }
}