import { Scene } from "phaser";
import { House } from "../entities/house/House";
import { Victim } from "../entities/victim/Victim";
import { Window } from "../entities/window/Window";
import { LEVELS, VICTIM_VELOCITY, VICTIMS_COUNT } from "../constants";

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

    this.createCollisions();

    this.input.on('pointerdown', (e: any, g: any) => {
      if (this.selectedVictim && g.length === 0) {
        this.selectedVictim.move(e.worldX, e.worldY);
      }
    })
  }

  private createHouse() {
    this.house = new House(this);
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
        this.victims.getChildren().forEach((w: Victim) => {
          w.unselect();
        })
        this.selectedVictim = victim;
        this.selectedVictim.select();
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
          const distance = Phaser.Math.Distance.Between(this.selectedVictim.x, this.selectedVictim.y, window.x, window.y);
          if (distance < 100) {
            this.selectedVictim.repairWindow(window);
          } else {
            this.selectedVictim.move(window.x, window.y);
          }
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
          // w.insane();
        });
      },
      loop: true
    })
  }

  private createCollisions() {
    this.physics.add.collider(this.victims, this.house.walls, (v1: Victim, w: any) => {
      v1.setVelocity(0)
    })
    this.physics.add.collider(this.victims, this.victims, (v1: Victim, v2: Victim) => {
      if (v2 === this.selectedVictim || v1 === this.selectedVictim) {
        const other = v1 === this.selectedVictim ? v2 : v1;
        const angle = Phaser.Math.Angle.Between(this.selectedVictim.x, this.selectedVictim.y, other.x, other.y) + Math.PI / 2;
        this.selectedVictim.setVelocity(Math.cos(angle) * VICTIM_VELOCITY, Math.sin(angle) * VICTIM_VELOCITY);

        // Opcional: recalcular la trayectoria al destino después de esquivar
        this.time.delayedCall(100, () => {
          this.selectedVictim.moveToTarget();
        });
      }
    });
    // this.physics.add.collider(this.house, this.windows);
  }
}