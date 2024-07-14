import { Scene } from "phaser";
import { BossObstacle } from "../obstacles/BossObstacle";
import { TrailObstacles } from "../obstacles/TrailObstacles";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";
import { AlternateZigZagObstacles } from "../obstacles/AlternateZigZagObstacle";
import { Obstacle } from "../obstacles/Obstacle";

export class BossRaid {

  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
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
        new TrailObstacles(scene, obstacles, "octocat", velocity);

        scene.time.delayedCall(4000, () => {
          new AlternateTrailObstacles(scene, obstacles, Obstacle.getRandomObstacleType(), velocity);
        });

        scene.time.delayedCall(8000, () => {
          new AlternateZigZagObstacles(scene, obstacles, Obstacle.getRandomObstacleType(), velocity);
        });

        scene.time.delayedCall(12000, () => {
          new TrailObstacles(scene, obstacles, "changuito", velocity);
        });

        scene.time.delayedCall(15000, () => {
          scene.add.tween({
            targets: boss,
            x: x + 500,
            duration: 4000,
            ease: "Power1",
            onComplete: () => {
              boss.destroy();
            }
          })
        });
      }
    })





  }
}