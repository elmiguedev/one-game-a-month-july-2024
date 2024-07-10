import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { GameHud } from "../entities/GameHud";
import { Platform } from "../entities/Platform";
import { Obstacle } from "../entities/obstacles/Obstacle";
import { TestObstacle } from "../entities/obstacles/TestObstacle";
import { CoffeeItem } from "../entities/items/CoffeeItems";
import { COFFEE_LEVEL, INITIAL_COFFEE_LEVEL, INITIAL_LEVEL_VELOCITY, SHADOW_VELOCITY } from "../constants";

export class GameScene extends Scene {
  private platforms: Phaser.Physics.Arcade.Group
  private obstacles: Phaser.Physics.Arcade.Group
  private items: Phaser.Physics.Arcade.Group
  private player: Player;
  private jumpKey: Phaser.Input.Keyboard.Key;
  private hud: GameHud;
  private timer: number = 0;
  private levelVelocity = INITIAL_LEVEL_VELOCITY;
  private coffeeLevel = INITIAL_COFFEE_LEVEL;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.initValues();
    this.createPlatforms();
    this.createPlayer();
    // this.createObstacles();
    this.createItems();
    this.createInput();
    this.createTimer();
    this.createCollisions();
    this.createShadow();
    this.createHud();
  }

  private initValues() {
    this.timer = 0;
    this.levelVelocity = INITIAL_LEVEL_VELOCITY;
    this.coffeeLevel = INITIAL_COFFEE_LEVEL;
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
        const y = baseY - 340;
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

  private createItems() {
    this.items = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    const baseY = this.game.canvas.height;
    const y = baseY - 240;
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.createItem(y, 'coffee');
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
    });
    this.physics.add.overlap(this.player, this.items, (p, i) => {
      if (i instanceof CoffeeItem) {
        // this.coffeeLevel += COFFEE_LEVEL;
        this.time.addEvent({
          repeat: COFFEE_LEVEL,
          delay: 1,
          callback: () => {
            this.coffeeLevel++;
          }
        })
        i.destroy();
      }
    })
  }

  private createInput() {
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.jumpKey.on('down', () => {
      this.player.jump();
    })
  }

  private createHud() {
    this.scene.run("GameHud");
    this.hud = this.scene.get("GameHud") as GameHud;
  }

  private createTimer() {
    this.time.addEvent({
      delay: 300,
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

  private createItem(y: number, type: string) {
    const x = this.game.canvas.width;
    const o = new CoffeeItem(this, x, y);
    this.items.add(o);
    o.setVelocityX(this.levelVelocity);
  }

  private gameOver() {
    this.scene.restart();
  }


  // TEST METHODS AND PROPS

  private spotlight: Phaser.GameObjects.Arc;

  private createShadow() {
    const shadow = this.add.rectangle(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      0x000000, 0.5
    ).setDepth(10).setOrigin(0, 0);

    this.spotlight = this.add.circle(
      this.player.x,
      this.player.y,
      1000,
      0x000000, 0.5)
      .setOrigin()
      .setVisible(false);

    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true;
    shadow.setMask(mask);

    this.time.addEvent({
      delay: SHADOW_VELOCITY,
      callback: () => {
        this.coffeeLevel--;
        this.spotlight.setRadius(this.coffeeLevel);
        if (this.coffeeLevel <= 0) {
          this.gameOver();
        }
      },
      loop: true
    })

  }



}