export class SoundManager {
  private static instance: SoundManager;

  constructor(private readonly scene: Phaser.Scene) {

  }

  public static getInstance(scene: Phaser.Scene): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager(scene);
    }
    return SoundManager.instance;
  }

  public play(sound: string) {
    this.scene.sound.play(sound);
  }

  playGameLoop() {
  }


}