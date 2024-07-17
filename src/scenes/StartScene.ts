import { Scene } from "phaser";
import { SoundManager } from "../utlis/SoundManager";
import { Player } from "../entities/Player";
import { CoffeeItem } from "../entities/items/CoffeeItem";

export class StartScene extends Scene {
  private player: Player;
  private platforms: Phaser.Physics.Arcade.Group;
  private spotlight: Phaser.GameObjects.Arc;
  private coffee: CoffeeItem;

  constructor() {
    super({
      key: 'StartScene',
    });
  }

  public create() {
    this.createCamera();
    this.createPlatforms();
    this.createPlayer();
    this.createCoffee();
    this.createCollisions();
    this.createShadow();
  }

  public startGame() {
    this.scene.start('GameScene');
  }

  private createCamera() {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  private createPlayer() {
    const x = 200;
    this.player = new Player(this, x, 500);
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
  }

  private createCollisions() {
    this.physics.add.collider(this.player, this.platforms);
  }

  private createShadow() {
    const shadow = this.add.rectangle(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      0x000000, 1
    ).setDepth(10).setOrigin(0, 0);

    this.spotlight = this.add.circle(
      this.player.x,
      this.player.y + 100,
      0,
      0x000000, 0.5)
      .setOrigin()
      .setVisible(false);

    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true;
    shadow.setMask(mask);

    this.add.tween({
      targets: this.spotlight,
      radius: 200,
      duration: 1000,
      ease: 'Linear',
      onComplete: () => {
        this.walkCenter();
      }
    });


    // this.time.addEvent({
    //   delay: SHADOW_VELOCITY,
    //   callback: () => {
    //     this.coffeeLevel--;
    //     this.spotlight.setRadius(this.coffeeLevel);
    //     if (this.coffeeLevel <= 0) {
    //       this.gameOver();
    //     }
    //   },
    //   loop: true
    // })

  }

  private walkCenter() {
    const x = this.game.canvas.width / 2;
    this.add.tween({
      targets: [this.player, this.spotlight],
      x: x,
      duration: 2000,
      ease: 'Linear',
    })
  }

  private createCoffee() {
    this.coffee = new CoffeeItem(
      this,
      (this.game.canvas.width / 2) - 50,
      500,
      0
    );

    this.physics.add.collider(this.player, this.coffee, () => {
      SoundManager.getInstance(this).playCoffee();
      this.coffee.destroy();
      this.openSpotlight();
    })
  }

  private openSpotlight() {
    this.add.tween({
      targets: this.spotlight,
      radius: 1200,
      duration: 2000,
      ease: 'Linear',
      onComplete: () => {
        this.walkCenter();
      }
    });
  }

  private createInstructions() {
    const coffeText = "Drink coffee to avoid falling asleep at work"
  }

}