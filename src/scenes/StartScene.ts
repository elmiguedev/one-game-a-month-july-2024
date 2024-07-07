import { Scene } from "phaser";
import { House } from "../entities/house/House";
import { HouseStorm } from "../entities/wind/HouseStorm";
import { MenuButton } from "../entities/menu/MenuButton";
import { MENU_FADE_TIME } from "../constants";
import { ApocalypsisStorm } from "../entities/wind/ApocalypsisStorm";
import { SoundManager } from "../utlis/SoundManager";

export class StartScene extends Scene {
  private startButton: MenuButton;
  private creditsButton: MenuButton;
  private apocalypsisStorm: ApocalypsisStorm;

  constructor() {
    super({
      key: 'StartScene',
    });
  }

  public create() {
    const x = this.game.canvas.width / 2;
    const y = 300;

    const house = new House(this);
    const storm = new HouseStorm(this);

    this.apocalypsisStorm = new ApocalypsisStorm(this);
    this.apocalypsisStorm.onStartEnd = () => {
      this.apocalypsisStorm.end()
    }
    this.apocalypsisStorm.onEnd = () => {
      this.startGame();
    }

    this.startButton = new MenuButton(this, x, y, "start");
    this.creditsButton = new MenuButton(this, x, y + 150, "credits")

    this.startButton.on('pointerdown', () => {
      this.fadeEntities();
      this.apocalypsisStorm.start();
    });

    SoundManager.getInstance(this).playStormBackground();
  }

  public startGame() {
    this.scene.start('GameScene');

  }

  private fadeEntities() {
    this.tweens.add({
      targets: [this.startButton, this.creditsButton],
      duration: MENU_FADE_TIME,
      alpha: 0,
      // onComplete: () => {
      //   this.scene.start('GameScene');
      // }
    })
  }
}