import { VICTIM_MAX_INSANITY, VICTIM_SANE_VALUE, VICTIM_VELOCITY } from "../../constants";
import { Window } from "../window/Window";

export class Victim extends Phaser.Physics.Arcade.Sprite {
  private target: Phaser.Types.Math.Vector2Like;
  public onClick: () => void;
  public insanity: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'victim');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setDrag(600);
    this.setBounce(100);
    this.anims.createFromAseprite('victim');
    this.setFrame(0);
    this.body.setCircle(this.width / 2);
    this.setInteractive({ cursor: 'pointer' });
    this.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick();
      }
    })
  }

  public update() {
    this.checkTarget();
  }

  public select() {
    this.setTint(0x86eaff);
  }

  public unselect() {
    this.setTint(0xffffff);
  }

  public repairWindow(window: Window) {
    window.repair()
  }

  public talkVictim(victim: Victim) {
    victim.sane(VICTIM_SANE_VALUE)
  }

  public move(x: number, y: number) {
    this.scene.physics.moveTo(this, x, y, VICTIM_VELOCITY);
    this.target = { x, y };
  }

  public moveToTarget() {
    if (this.target) {
      this.scene.physics.moveTo(this, this.target.x, this.target.y, VICTIM_VELOCITY);
    }
  }

  private checkTarget() {
    if (this.target) {
      const distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);
      if (distance < 10) {
        this.setVelocity(0);
      }
    }
  }

  private checkInsanity() {
    const insanityLevel = VICTIM_MAX_INSANITY / 4;
    if (this.insanity <= insanityLevel) {
      this.anims.play("sane");
    } else if (this.insanity <= insanityLevel * 2) {
      this.anims.play("normal");
    } else if (this.insanity <= insanityLevel * 3) {
      this.anims.play("worried");
    } else if (this.insanity >= VICTIM_MAX_INSANITY) {
      this.anims.play("insane");
    }
  }

  // public select() {
  //   this.setFrame(1);
  // }

  public sane(value: number = 1) {
    this.insanity -= value;
    if (this.insanity < 0) {
      this.insanity = 0;
    }
    this.checkInsanity();
  }

  public insane(value: number = 1) {
    this.insanity += value;
    if (this.insanity > VICTIM_MAX_INSANITY) {
      this.insanity = VICTIM_MAX_INSANITY;
    }
    this.checkInsanity();
  }


}