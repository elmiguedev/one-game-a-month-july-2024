import { Scene } from "phaser";
import { SoundManager } from "../utlis/SoundManager";
import { Player } from "../entities/Player";
import { CoffeeItem } from "../entities/items/CoffeeItem";
import { NormalObstacle } from "../entities/obstacles/NormalObstacle";

export class StartScene extends Scene {
  private player: Player;
  private platforms: Phaser.Physics.Arcade.Group;
  private spotlight: Phaser.GameObjects.Arc;
  private coffee: CoffeeItem;
  private skip: boolean = false;


  constructor() {
    super({
      key: 'StartScene',
    });
  }

  public init(data: any) {
    this.skip = data && data.skip;
  }

  public create() {
    this.createCamera();
    this.createPlatforms();
    this.createPlayer();
    this.createCoffee();
    this.createCollisions();
    if (!this.skip) {
      this.createShadow();
    } else {
      this.createMainStartScene();
    }
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

  }

  private walkCenter() {
    const x = this.game.canvas.width / 2;
    this.add.tween({
      targets: [this.player, this.spotlight],
      x: x,
      duration: 2000,
      ease: 'Linear'
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
      this.createInstructions();

    })
  }

  private openSpotlight() {
    this.add.tween({
      targets: this.spotlight,
      radius: 1200,
      duration: 2000,
      ease: 'Linear',
    });
  }

  private createInstructions() {
    const x = 100;
    const y = 100;
    const coffeText = "Drink coffee to avoid falling asleep at work";
    const obstaclesText = "Dodge work to arrive safely until 18:00 hs";

    const instructionImage = this.add.image(x, y, 'coffee').setScale(10);

    const coffeInstructions = this.add.text(x + 120, y - 50, "", {
      fontSize: '48px',
      color: "black",
      fontFamily: "bulkypix",
    }).setWordWrapWidth(1100);

    let i = 0;
    let text = "";
    this.time.addEvent({
      delay: 50,
      repeat: coffeText.length - 1,
      callback: () => {
        text = text + coffeText[i];
        coffeInstructions.setText(text);
        i++;
      },

    })

    this.time.delayedCall(6500, () => {
      this.player.jump();
    })
    this.time.delayedCall(6000, () => {
      instructionImage.setTexture("slack");
      i = 0;
      text = ""
      this.time.addEvent({
        delay: 50,
        repeat: obstaclesText.length - 1,
        callback: () => {
          text = text + obstaclesText[i];
          coffeInstructions.setText(text);
          i++;
        },

      })

      const obstacleExample = this.add.image(1300, 600, 'slack').setScale(10);
      this.add.tween({
        targets: obstacleExample,
        x: -100,
        duration: 2000,
        ease: 'Linear',
        onComplete: () => {
          obstacleExample.destroy();

          this.time.delayedCall(5000, () => {
            coffeInstructions.destroy();
            instructionImage.destroy();
            this.createMainStartScene();
          })
        }
      })

    })


  }

  private createMainStartScene() {
    this.player.setPosition(this.game.canvas.width / 2, 594);
    this.coffee.destroy();
    this.add.text(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 100, "- Coffee at work -", {
      fontSize: '48px',
      color: "black",
      fontFamily: "bulkypix",
      align: "center"
    }).setWordWrapWidth(1100).setOrigin(0.5);
    this.add.text(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2, "press [SPACE] to start", {
      fontSize: '48px',
      color: "black",
      fontFamily: "bulkypix",
      align: "center"
    }).setWordWrapWidth(1100).setOrigin(0.5);

    const k = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    k.on('down', () => {
      this.scene.start('GameScene');
    })
  }
}