import { Scene } from "phaser";
import { GameHud } from "../entities/GameHud";
import { SoundManager } from "../utlis/SoundManager";
import { TileMap } from "../entities/map/TileMap";
import { Robot } from "../entities/robot/Robot";
import { SCALE_FACTOR } from "../constants";

export class GameScene extends Scene {
  private hud: GameHud;
  private map: TileMap;
  private robot: Robot;
  private keys: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
  };


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
    this.createInput();
  }

  public update() {
    this.checkInput();
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
    this.robot = new Robot(this, 1, 2);
    this.cameras.main.startFollow(this.robot);
  }

  private createMap() {
    this.map = new TileMap(this);
  }

  private createInput() {
    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    };
  }

  private checkInput() {
    if (this.keys.up.isDown || this.keys.w.isDown) {
      if (!this.map.hasSolid(this.robot.position.x, this.robot.position.y - 1)) {
        this.robot.move(0, -1);
        this.checkPortal();
      }
    }

    if (this.keys.down.isDown || this.keys.s.isDown) {
      if (!this.map.hasSolid(this.robot.position.x, this.robot.position.y + 1)) {
        this.robot.move(0, 1);
        this.checkPortal();
      }
    }

    if (this.keys.left.isDown || this.keys.a.isDown) {
      if (!this.map.hasSolid(this.robot.position.x - 1, this.robot.position.y)) {
        this.robot.move(-1, 0);
        this.checkPortal();
      }
    }

    if (this.keys.right.isDown || this.keys.d.isDown) {
      if (!this.map.hasSolid(this.robot.position.x + 1, this.robot.position.y)) {
        this.robot.move(1, 0);
        this.checkPortal();
      }
    }
  }

  private checkPortal() {
    const portal = this.map.getPortal(this.robot.position.x, this.robot.position.y);
    if (portal) {
      this.map.changeMap(portal.portal);
      this.robot.setGridPosition(portal.x, portal.y);
    }
  }

}