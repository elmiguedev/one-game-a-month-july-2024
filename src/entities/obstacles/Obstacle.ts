export type ObstacleType = "aws" |
  "chat" |
  "slack" |
  "jira" |
  "changuito" |
  "octocat";

export class Obstacle extends Phaser.Physics.Arcade.Sprite {
  public obstacleType: string;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.obstacleType = texture;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // @ts-ignore
    this.setOrigin(0);
    this.setScale(10);
    this.anims.createFromAseprite(texture);
    this.anims.play("idle");
  }

  public static getRandomObstacleType(): ObstacleType {
    const random = Math.floor(Math.random() * 6);
    switch (random) {
      case 0:
        return "aws";
      case 1:
        return "chat";
      case 2:
        return "slack";
      case 3:
        return "jira";
      case 4:
        return "changuito";
      case 5:
        return "octocat";
    }
  }

}