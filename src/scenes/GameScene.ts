import { Scene } from "phaser";
import { GameHud } from "../entities/GameHud";
import { SoundManager } from "../utlis/SoundManager";
import { TileMap } from "../entities/map/TileMap";
import { Robot } from "../entities/robot/Robot";
import { SCALE_FACTOR } from "../constants";

export class GameScene extends Scene {
  private hud: GameHud;
  private map: TileMap;
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
    const robot = new Robot(this, 1, 2);
    this.cameras.main.startFollow(robot);

    const left = this.input.keyboard.addKey("LEFT");
    const right = this.input.keyboard.addKey("RIGHT");
    const up = this.input.keyboard.addKey("UP");
    const down = this.input.keyboard.addKey("DOWN");

    left.on('down', () => {
      const position = robot.getGridPosition();
      if (!this.map.hasSolid(position.x - 1, position.y)) {
        robot.move(-1, 0);
      }
    });
    right.on('down', () => {
      const position = robot.getGridPosition();
      if (!this.map.hasSolid(position.x + 1, position.y)) {
        robot.move(1, 0);
      }
    });
    up.on('down', () => {
      const position = robot.getGridPosition();
      if (!this.map.hasSolid(position.x, position.y - 1)) {
        robot.move(0, -1);
      }
    });
    down.on('down', () => {
      const position = robot.getGridPosition();
      if (!this.map.hasSolid(position.x, position.y + 1)) {
        robot.move(0, 1);
      }
    });

    this.physics.add.collider(robot, this.map.walls);
  }

  private createMap() {
    this.map = new TileMap(this);
  }



}