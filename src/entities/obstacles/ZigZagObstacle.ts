import { ITEMS_HEIGHT } from "../../constants";
import { Obstacle } from "./Obstacle";

export class ZigZagObstacle {
  constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, texture: string, velocity: number, alternate: boolean = false) {
    const y1 = alternate ? ITEMS_HEIGHT[1] : ITEMS_HEIGHT[0];
    const y2 = alternate ? ITEMS_HEIGHT[0] : ITEMS_HEIGHT[1];
    const z = new Obstacle(
      scene,
      scene.game.canvas.width,
      y1,
      texture
    );
    group.add(z);
    z.setVelocityX(velocity);
    scene.add.tween({
      targets: z,
      y: {
        from: y1,
        to: y2
      },
      ease: 'Linear',
      duration: 500,
      repeat: -1,
      yoyo: true
    });
  }
}