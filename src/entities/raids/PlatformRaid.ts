import { Scene } from "phaser";
import { NormalPlatform } from "../platforms/NormalPlatform";
import { HighPlatform } from "../platforms/HighPlatform";
import { CoffeeItem } from "../items/CoffeeItem";
import { NormalObstacle } from "../obstacles/NormalObstacle";
import { Obstacle } from "../obstacles/Obstacle";
import { PlatformObstacle } from "../obstacles/PlatformObstacle";

/**
 * A raid obstacles and platforms 
 */

const RAID_TIME = 1000;

export class PlatformRaid {
  constructor(scene: Scene, obstacles: Phaser.Physics.Arcade.Group, velocity: number, platforms: Phaser.Physics.Arcade.Group, items: Phaser.Physics.Arcade.Group) {
    const platform = new NormalPlatform(scene, platforms, velocity);
    scene.time.delayedCall(RAID_TIME, () => {
      const p = new HighPlatform(scene, platforms, velocity);
      const c = new CoffeeItem(scene, p.x + p.width / 2, p.y - 160, velocity);
      items.add(c);
      c.setVelocityX(velocity);
    })
    scene.time.delayedCall(RAID_TIME * 3, () => {
      const p = new NormalPlatform(scene, platforms, velocity);
    })

    scene.time.delayedCall(RAID_TIME * 4, () => {
      const p = new HighPlatform(scene, platforms, velocity);
      const o = new PlatformObstacle(scene, obstacles, Obstacle.getRandomObstacleType(), velocity, p.platform);
    })


  }
}