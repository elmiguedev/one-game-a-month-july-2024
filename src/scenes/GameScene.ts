import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { GameHud } from "../entities/GameHud";

export class GameScene extends Scene {
  private platforms: Phaser.Physics.Arcade.Group
  private player: Player;
  private jumpKey: Phaser.Input.Keyboard.Key;
  private hud: GameHud;
  private timer: number = 0;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create() {
    this.createPlatforms();
    this.createPlayer();
    this.createCollisions();
    this.createInput();
    this.createHud();
    this.createTimer();
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

  private createPlayer() {
    const x = this.game.canvas.width / 2;
    this.player = new Player(this, x, 500);
  }

  private createCollisions() {
    this.physics.add.collider(this.player, this.platforms);
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
}