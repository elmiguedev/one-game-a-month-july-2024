import { Scene } from "phaser";
import HousePng from "../assets/sprites/house/house.png";
import VictimPng from "../assets/sprites/victim/victim.png";
import VictimJson from "../assets/sprites/victim/victim.json";
import WindowPng from "../assets/sprites/window/window.png";
import WindPng from "../assets/sprites/wind/wind.png";
import WindJson from "../assets/sprites/wind/wind.json";
import StartPng from "../assets/sprites/menu/start.png";
import StartJson from "../assets/sprites/menu/start.json";
import CreditsPng from "../assets/sprites/menu/credits.png";
import CreditsJson from "../assets/sprites/menu/credits.json";

import Wind1Mp3 from "../assets/sounds/wind1.mp3";
import Wind2Mp3 from "../assets/sounds/wind2.mp3";
import Panic1Mp3 from "../assets/sounds/panic1.mp3";
import Panic2Mp3 from "../assets/sounds/panic2.mp3";
import RepairMp3 from "../assets/sounds/repair.mp3";
import TalkMp3 from "../assets/sounds/talk.mp3";
import Apocalypsis1Mp3 from "../assets/sounds/apocalypsis1.mp3";
import Apocalypsis2Mp3 from "../assets/sounds/apocalypsis2.mp3";
import Apocalypsis3Mp3 from "../assets/sounds/apocalypsis3.mp3";
import Apocalypsis4Mp3 from "../assets/sounds/apocalypsis4.mp3";
import Apocalypsis5Mp3 from "../assets/sounds/apocalypsis5.mp3";
import Apocalypsis6Mp3 from "../assets/sounds/apocalypsis6.mp3";
import Apocalypsis7Mp3 from "../assets/sounds/apocalypsis7.mp3";
import Apocalypsis8Mp3 from "../assets/sounds/apocalypsis8.mp3";

import RepairPng from "../assets/sprites/menu/repair.png";
import CalmarPng from "../assets/sprites/menu/calmar.png";
import InstructionsPng from "../assets/sprites/menu/instructions.png";
import InstructionsJson from "../assets/sprites/menu/instructions.json";

export class BootloaderScene extends Scene {
  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.load.image('house', HousePng);
    this.load.aseprite('victim', VictimPng, VictimJson);
    this.load.aseprite('wind', WindPng, WindJson);
    this.load.aseprite("start", StartPng, StartJson);
    this.load.aseprite("credits", CreditsPng, CreditsJson);
    this.load.image('window', WindowPng);
    this.load.image("repair", RepairPng);
    this.load.image("calmar", CalmarPng);
    this.load.aseprite("instructions", InstructionsPng, InstructionsJson);

    this.load.audio('wind1', [Wind1Mp3]);
    this.load.audio('wind2', [Wind2Mp3]);
    this.load.audio('panic1', [Panic1Mp3]);
    this.load.audio('panic2', [Panic2Mp3]);
    this.load.audio('repair', [RepairMp3]);
    this.load.audio('talk', [TalkMp3]);
    this.load.audio('apocalypsis1', [Apocalypsis1Mp3]);
    this.load.audio('apocalypsis2', [Apocalypsis2Mp3]);
    this.load.audio('apocalypsis3', [Apocalypsis3Mp3]);
    this.load.audio('apocalypsis4', [Apocalypsis4Mp3]);
    this.load.audio('apocalypsis5', [Apocalypsis5Mp3]);
    this.load.audio('apocalypsis6', [Apocalypsis6Mp3]);
    this.load.audio('apocalypsis7', [Apocalypsis7Mp3]);
    this.load.audio('apocalypsis8', [Apocalypsis8Mp3]);

    this.load.once('complete', () => {
      this.scene.start('StartScene');
    });
  }

  public create() {
  }
}