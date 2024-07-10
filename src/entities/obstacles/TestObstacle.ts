import { Scene } from "phaser";
import { Obstacle } from "./Obstacle";

export class TestObstacle extends Obstacle {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'test');
  }
}