import { Scene } from "phaser";
import { BossObstacle } from "../obstacles/BossObstacle";
import { TrailObstacles } from "../obstacles/TrailObstacles";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";
import { AlternateZigZagObstacles } from "../obstacles/AlternateZigZagObstacle";
import { Obstacle } from "../obstacles/Obstacle";
import { CoffeeItem } from "../items/CoffeeItem";
import { HighCoffee } from "../items/HighCoffee";

export class BossRaid {
  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number, items: Phaser.Physics.Arcade.Group, onBossDeath: () => void) {
    const x = scene.game.canvas.width - 240;
    const initialX = x + 500;
    const y = scene.game.canvas.height - 450;
    const boss = new BossObstacle(scene, initialX, y);
    obstacles.add(boss);

    scene.add.tween({
      targets: boss,
      x: x,
      duration: 4000,
      ease: "Power1",
      onComplete: () => {
        new TrailObstacles(scene, obstacles, "slack", velocity, items);

        scene.time.delayedCall(4000, () => {
          new AlternateTrailObstacles(scene, obstacles, "chat", velocity);
        });

        scene.time.delayedCall(8000, () => {
          new AlternateZigZagObstacles(scene, obstacles, "octocat", velocity);
        });

        scene.time.delayedCall(12000, () => {
          new HighCoffee(scene, velocity, items);
        })
        scene.time.delayedCall(12700, () => {
          new HighCoffee(scene, velocity, items);
        })

        scene.time.delayedCall(14000, () => {
          new TrailObstacles(scene, obstacles, "changuito", velocity, items);
        });

        scene.time.delayedCall(18000, () => {
          scene.add.tween({
            targets: boss,
            x: x + 500,
            duration: 4000,
            ease: "Power1",
            onComplete: () => {
              boss.destroy();
              onBossDeath();
            }
          })
        });
      }
    })





  }
}