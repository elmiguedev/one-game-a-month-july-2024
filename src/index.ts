import { Game } from "phaser";
import { BootloaderScene } from "./scenes/BootloaderScene";
import { GameScene } from "./scenes/GameScene";
import { StartScene } from "./scenes/StartScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { CreditsScene } from "./scenes/CreditsScene";
import { GameHud } from "./entities/GameHud";

export default new Game({
  type: Phaser.AUTO,
  parent: "#canvas",
  width: 1280,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 4000,
        x: 0
      }
    }
  },
  render: {
    pixelArt: true
  },
  backgroundColor: "#ffffff",
  scene: [
    BootloaderScene,
    GameScene,
    GameHud,
    StartScene,
    GameOverScene,
    CreditsScene,
  ]
})