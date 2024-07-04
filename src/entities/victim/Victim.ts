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
    const distance = Phaser.Math.Distance.Between(this.x, this.y, victim.x, victim.y);
    if (distance <= 100) {
      victim.sane();
    }
  }

  public select() {
    this.setFrame(1);
  }

  public sane(value: number = 1) {
    this.insanity -= value;
    if (this.insanity < 0) {
      this.insanity = 0;
    }
    this.updateInsanityTint();
  }

  public insane(value: number = 1) {
    this.insanity += value;
    if (this.insanity > VICTIM_MAX_INSANITY) {
      this.insanity = VICTIM_MAX_INSANITY;
      this.shake();
    }
    this.updateInsanityTint();
  }

  private updateInsanityTint() {
    this.setTint(INSANITY_SCALE[this.insanity]);
  }

  public get isInsane() {
    return this.insanity >= VICTIM_MAX_INSANITY;
  }

  public shake() {
    if (this.shakeTween) {
      this.shakeTween.stop();
    }

    this.shakeTween = this.scene.tweens.add({
      targets: this,
      x: this.x + 2,
      duration: 100,
      yoyo: true,
      repeat: -1
    })
  }

}