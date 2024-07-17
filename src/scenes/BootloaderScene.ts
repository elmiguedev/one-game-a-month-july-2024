import { Scene } from "phaser";
import DotPng from "../assets/sprites/dot.png";
import PlayerPng from "../assets/sprites/player/player.png";
import PlayerJson from "../assets/sprites/player/player.json";
import TestPng from "../assets/sprites/obtacles/test/test.png";
import TestJson from "../assets/sprites/obtacles/test/test.json";
import CoffeePng from "../assets/sprites/items/coffee/coffee.png";
import CoffeeJson from "../assets/sprites/items/coffee/coffee.json";
import AwsPng from "../assets/sprites/obtacles/aws/aws.png";
import AwsJson from "../assets/sprites/obtacles/aws/aws.json";
import CalendarPng from "../assets/sprites/obtacles/calendar/calendar.png";
import CalendarJson from "../assets/sprites/obtacles/calendar/calendar.json";
import ChanguitoPng from "../assets/sprites/obtacles/changuito/changuito.png";
import ChanguitoJson from "../assets/sprites/obtacles/changuito/changuito.json";
import ChatPng from "../assets/sprites/obtacles/chat/chat.png";
import ChatJson from "../assets/sprites/obtacles/chat/chat.json";
import JiraPng from "../assets/sprites/obtacles/jira/jira.png";
import JiraJson from "../assets/sprites/obtacles/jira/jira.json";
import OctocatPng from "../assets/sprites/obtacles/octocat/octocat.png";
import OctocatJson from "../assets/sprites/obtacles/octocat/octocat.json";
import SlackPng from "../assets/sprites/obtacles/slack/slack.png";
import SlackJson from "../assets/sprites/obtacles/slack/slack.json";
import JumpMp3 from "../assets/sounds/jump.ogg";
import CoffeeMp3 from "../assets/sounds/coffee.ogg";
import GameMp3 from "../assets/sounds/game.ogg";
import HitMp3 from "../assets/sounds/hit.ogg";
import { Loader } from "../entities/loader/Loader";

export class BootloaderScene extends Scene {
  private loader: Loader;

  constructor() {
    super({
      key: 'BootloaderScene',
    });
  }

  public preload() {
    this.loader = new Loader(this);


    this.load.image('dot', DotPng);

    this.load.aseprite("player", PlayerPng, PlayerJson);
    this.load.aseprite("test", TestPng, TestJson);
    this.load.aseprite("coffee", CoffeePng, CoffeeJson);

    this.load.aseprite("aws", AwsPng, AwsJson);
    this.load.aseprite("calendar", CalendarPng, CalendarJson);
    this.load.aseprite("changuito", ChanguitoPng, ChanguitoJson);
    this.load.aseprite("chat", ChatPng, ChatJson);
    this.load.aseprite("jira", JiraPng, JiraJson);
    this.load.aseprite("octocat", OctocatPng, OctocatJson);
    this.load.aseprite("slack", SlackPng, SlackJson);

    this.load.audio("jump", JumpMp3);
    this.load.audio("coffee", CoffeeMp3);
    this.load.audio("game", GameMp3);
    this.load.audio("hit", HitMp3);

    this.load.on('progress', (value: number) => {
      this.loader.update(value);
    });

    this.load.once('complete', () => {
      this.startGame();
    });
  }

  public startGame() {
    let alpha = 1;
    this.time.addEvent({
      delay: 10,
      loop: true,
      callback: () => {
        alpha -= 0.01;
        this.loader.setAlpha(alpha);
        if (alpha <= 0) {
          this.scene.start('StartScene');
        }
      }
    })
  }


}