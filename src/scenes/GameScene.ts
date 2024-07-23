import { Scene } from "phaser";
import { GameHud } from "../entities/GameHud";
import { SoundManager } from "../utlis/SoundManager";

export class GameScene extends Scene {
  private hud: GameHud;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.initValues();
    this.createCamera();
    this.createHud();
    this.createMusic();
  }



  private initValues() {

  }

  private createCamera() {
    this.cameras.main.setBackgroundColor(0xffffff);
  }


  private createHud() {
    this.scene.run("GameHud");
    this.hud = this.scene.get("GameHud") as GameHud;
  }

  private createMusic() {
    this.sound.stopAll();
    SoundManager.getInstance(this).playGameLoop();
  }


}