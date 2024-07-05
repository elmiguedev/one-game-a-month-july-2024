import { Utils } from "~/src/utlis/Utils";
import { INSANITY_SCALE, VICTIM_MAX_INSANITY, VICTIM_VELOCITY } from "../../constants";
import { Window } from "../window/Window";

export class Victim extends Phaser.Physics.Arcade.Sprite {
  private target: Phaser.Types.Math.Vector2Like;
  private shakeTween: Phaser.Tweens.Tween;

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
    this.setFrame(1);
  }

  public unselect() {
    this.setFrame(0);
  }

  public repairWindow(window: Window) {
  }

  public talkVictim(victim: Victim) {
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

  // public repairWindow(window: Window) {
  //   const distance = Phaser.Math.Distance.Between(this.x, this.y, window.x, window.y);
  //   if (distance <= 100) {
  //     window.repair();
  //   }
  // }

  // public talkVictim(victim: Victim) {
  //   const distance = Phaser.Math.Distance.Between(this.x, this.y, victim.x, victim.y);
  //   if (distance <= 100) {
  //     victim.sane();
  //   }
  // }

  // public select() {
  //   this.setFrame(1);
  // }

  // public sane(value: number = 1) {
  //   this.insanity -= value;
  //   if (this.insanity < 0) {
  //     this.insanity = 0;
  //   }
  //   this.updateInsanityTint();
  // }

  // public insane(value: number = 1) {
  //   this.insanity += value;
  //   if (this.insanity > VICTIM_MAX_INSANITY) {
  //     this.insanity = VICTIM_MAX_INSANITY;
  //     this.shake();
  //   }
  //   this.updateInsanityTint();
  // }

  // private updateInsanityTint() {
  //   this.setTint(INSANITY_SCALE[this.insanity]);
  // }

  // public get isInsane() {
  //   return this.insanity >= VICTIM_MAX_INSANITY;
  // }

  // public move(x: number, y: number) {
  //   this.scene.physics.moveTo(this, x, y, VICTIM_VELOCITY);
  // }

  // public shake() {
  //   // if (this.shakeTween) {
  //   //   this.shakeTween.stop();
  //   // }

  //   // this.shakeTween = this.scene.tweens.add({
  //   //   targets: this,
  //   //   x: this.x + 2,
  //   //   duration: 100,
  //   //   yoyo: true,
  //   //   repeat: -1
  //   // })
  // }

}