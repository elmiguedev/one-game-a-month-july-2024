import { Scene } from "phaser";
import { House } from "../entities/house/House";
import { Victim } from "../entities/victim/Victim";
import { Window } from "../entities/window/Window";
import { LEVELS, VICTIMS_COUNT } from "../constants";

export class GameScene extends Scene {
  private house: House;
  private victims: Phaser.Physics.Arcade.Group;
  private windows: Phaser.Physics.Arcade.Group;

  private selectedVictim: Victim;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.createHouse();
    this.createVictims();
    this.createWindows();
    this.createApocalypsis();

    this.input.on('pointerdown', (e: any) => {
      if (this.selectedVictim) {
        this.selectedVictim.goto(e.worldX, e.worldY);
      }
    })
  }

  private createHouse() {
    this.house = new House(this, 0, 0);
  }

  private createVictims() {
    this.victims = this.physics.add.group({
      classType: Victim,
      runChildUpdate: true,
    });

    for (let i = 0; i < VICTIMS_COUNT; i++) {
      const x = Phaser.Math.Between(200, 1000);
      const y = Phaser.Math.Between(200, 500);
      const victim = this.victims.get(x, y) as Victim;
      victim.onClick = () => {
        if (this.selectedVictim) {
          if (victim.isInsane) {
            this.selectedVictim.talkVictim(victim)
          } else {
            this.selectedVictim = victim;
            this.selectedVictim.select();
            this.victims.getChildren().forEach((v: Victim) => {
              if (this.selectedVictim !== v)
                v.unselect();
            })

          }
          this.selectedVictim.talkVictim(victim)
        } else {
          this.selectedVictim = victim;
          this.selectedVictim.select();
          this.victims.getChildren().forEach((v: Victim) => {
            if (this.selectedVictim !== v)
              v.unselect();
          })

        }
      }
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
      ) as Window;
      window.onClick = () => {
        if (this.selectedVictim) {
          this.selectedVictim.repairWindow(window);
        }
      }
    });
  }

  private repairWindow(window: Window) {
    if (this.selectedVictim) {
      this.selectedVictim.repairWindow(window);
    }
  }

  private createApocalypsis() {
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.windows.getChildren().forEach((w: Window) => {
          w.damage();
        });
      },
      loop: true
    })
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.victims.getChildren().forEach((w: Victim) => {
          w.insane();
        });
      },
      loop: true
    })
  }
}