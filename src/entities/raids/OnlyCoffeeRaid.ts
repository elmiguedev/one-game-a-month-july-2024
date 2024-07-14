import { Scene } from "phaser";
import { CoffeeItem } from "../items/CoffeeItem";
import { ITEMS_HEIGHT } from "../../constants";

export class OnlyCoffeeRaid {
  constructor(scene: Scene, items: Phaser.Physics.Arcade.Group, velocity: number, up: boolean = false) {
    console.log("coffee raid")
    const y = up ? ITEMS_HEIGHT[1] : ITEMS_HEIGHT[0];
    const c = new CoffeeItem(
      scene,
      scene.game.canvas.width,
      y,
      velocity
    );
    items.add(c);
    c.setVelocityX(velocity);
  }
}