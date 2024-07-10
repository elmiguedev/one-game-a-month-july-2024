import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { GameHud } from "../entities/GameHud";
import { Platform } from "../entities/Platform";
import { Obstacle } from "../entities/obstacles/Obstacle";
import { TestObstacle } from "../entities/obstacles/TestObstacle";

export class GameScene extends Scene {
  private platforms: Phaser.Physics.Arcade.Group
  private obstacles: Phaser.Physics.Arcade.Group
  private player: Player;
  private jumpKey: Phaser.Input.Keyboard.Key;
  private hud: GameHud;
  private timer: number = 0;
  private levelVelocity = -1000;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.initValues();
    this.createPlatforms();
    this.createPlayer();
    this.createObstacles();
    this.createInput();
    this.createHud();
    this.createTimer();
    this.createCollisions();
    this.testMethod();
  }

  private initValues() {
    this.timer = 0;
    this.levelVelocity = -800;
  }


  private createPlatforms() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height - 40;

    this.platforms = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    const floor = this.add.rectangle(
      x,
      y,
      this.game.canvas.width,
      12,
      0x16171a
    );

    this.platforms.add(floor);

    const baseY = this.game.canvas.height;
    this.time.addEvent({
      delay: 6000,
      callback: () => {
        const y = baseY - 240;
        this.createPlatform(y);
      },
      loop: true
    })
  }

  private createObstacles() {
    this.obstacles = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    const baseY = this.game.canvas.height;
    const y = baseY - 140;
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.createObstacle(y);
      },
      loop: true
    })
  }

  private createPlayer() {
    const x = this.game.canvas.width / 2;
    this.player = new Player(this, x, 500);
  }

  private createCollisions() {
    this.physics.add.collider(this.player, this.platforms, () => {
      if (this.player.body.blocked.right) {
        this.gameOver();
      }
    });
    this.physics.add.collider(this.player, this.obstacles, () => {
      this.gameOver();
    })
  }

  private createInput() {
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.jumpKey.on('down', () => {
      this.player.jump();
    })
  }

  private fadeOut() {
    this.cameras.main.fade(500);
  }

  private createHud() {
    this.scene.run("GameHud");
    this.hud = this.scene.get("GameHud") as GameHud;
  }

  private createTimer() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer++;
        this.hud.updateTimer(this.timer);
      },
      loop: true
    })
  }

  private createObstacle(y: number) {
    const x = this.game.canvas.width;
    const o = new TestObstacle(this, x, y);
    this.obstacles.add(o);
    o.setVelocityX(this.levelVelocity);
  }

  private createPlatform(y: number) {
    const x = this.game.canvas.width;
    const p = new Platform(this, x, y, 5);
    this.platforms.add(p);
    // @ts-ignore
    p.body.setVelocityX(this.levelVelocity);
  }

  private gameOver() {
    this.scene.restart();
  }


  // TEST METHODS AND PROPS

  private spotlight: Phaser.GameObjects.Arc;

  private testMethod() {
    const shadow = this.add.rectangle(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      0x000000
    ).setDepth(10).setOrigin(0, 0);

    this.spotlight = this.add.circle(
      this.player.x,
      this.player.y,
      600,
      0x000000)
      .setOrigin()
      .setVisible(false);

    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true;
    shadow.setMask(mask);

    this.add.tween({
      targets: [this.spotlight],
      radius: 10,
      duration: 10000
    })
  }



}