import { Scene } from "phaser";
import { GameHud } from "../entities/GameHud";
import { SoundManager } from "../utlis/SoundManager";
import { TileMap } from "../entities/map/TileMap";
import { Robot } from "../entities/robot/Robot";

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
    this.createMap();
    this.createRobot();
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

  private createRobot() {
    const robot = new Robot(this, 1600, 1600);
    this.cameras.main.startFollow(robot);

    const left = this.input.keyboard.addKey("LEFT");
    const right = this.input.keyboard.addKey("RIGHT");
    const up = this.input.keyboard.addKey("UP");
    const down = this.input.keyboard.addKey("DOWN");

    left.on('down', () => {
      robot.x -= 160;
    });
    right.on('down', () => {
      robot.x += 160;
    });
    up.on('down', () => {
      robot.y -= 160;
    });
    down.on('down', () => {
      robot.y += 160;
    });
  }

  private createMap() {
    const map = new TileMap(this);
  }



}