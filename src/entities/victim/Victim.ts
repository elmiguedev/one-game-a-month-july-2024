import { VICTIM_VELOCITY } from "../../constants";
import { Window } from "../window/Window";

export class Victim extends Phaser.Physics.Arcade.Sprite {

  private targetWindow: Window;
  private targetVictim: Victim;
  private target: Phaser.Types.Math.Vector2Like;

  public onClick: () => void;
  public isInsane: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'victim');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.anims.createFromAseprite('victim');
    this.setOrigin(0, 0);
    this.setFrame(0);
    this.setInteractive({ cursor: 'pointer' });
    this.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick();
      }
    })
  }

  public update() {
    if (this.target) {
      const { x, y } = this.target;
      this.goto(x, y);

      const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
      if (distance < 30) {
        this.target = undefined;
        this.setVelocity(0);
      }
    }

  }

  public unselect() {
    this.setFrame(0);
  }

  public goto(x: number, y: number) {
    this.target = { x, y };
    this.scene.physics.moveTo(this, x, y, VICTIM_VELOCITY);
  }

  public repairWindow(window: Window) {
    const distance = Phaser.Math.Distance.Between(this.x, this.y, window.x, window.y);
    if (distance <= 100) {
      window.repair();
    }
  }

  public talkVictim(victim: Victim) {
    this.targetWindow = undefined;
    this.targetVictim = victim;
  }

  public select() {
    this.setFrame(1);
  }

}