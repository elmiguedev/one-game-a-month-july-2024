import { Scene } from "phaser";
import { House } from "../entities/house/House";
import { Victim } from "../entities/victim/Victim";
import { Window } from "../entities/window/Window";
import { LEVELS, VICTIMS_COUNT } from "../constants";

export class GameScene extends Scene {
  private house: House;
  private victims: Phaser.Physics.Arcade.Group;
  private windows: Phaser.Physics.Arcade.Group;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.createHouse();
    this.createVictims();
    this.createWindows();
  }

  private createHouse() {
    this.house = new House(this, 0, 0);
  }

  private createVictims() {
    this.victims = this.physics.add.group({
      classType: Victim,

    });

    for (let i = 0; i < VICTIMS_COUNT; i++) {
      const x = Phaser.Math.Between(200, 1000);
      const y = Phaser.Math.Between(200, 500);
      const victim = this.victims.get(x, y);
    }
  }

  private createWindows() {
    this.windows = this.physics.add.group({
      classType: Window,
    });

    const level = LEVELS[0];

    level.windows.forEach((position: Phaser.Types.Math.Vector2Like) => {
      const window = this.windows.get(
        position.x,
        position.y
      );
    });
  }
}