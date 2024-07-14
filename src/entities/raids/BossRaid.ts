import { Scene } from "phaser";
import { BossObstacle } from "../obstacles/BossObstacle";
import { TrailObstacles } from "../obstacles/TrailObstacles";
import { AlternateTrailObstacles } from "../obstacles/AlternateTrailObstacles";
import { AlternateZigZagObstacles } from "../obstacles/AlternateZigZagObstacle";
import { Obstacle } from "../obstacles/Obstacle";

export class BossRaid {

  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number) {
    const x = scene.game.canvas.width - 240;
    const y = scene.game.canvas.height - 450;
    const boss = new BossObstacle(scene, x, y);
    obstacles.add(boss);

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


  }
}