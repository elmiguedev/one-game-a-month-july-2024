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

  public playStormBackground() {
    this.scene.sound.play("wind2", {
      loop: true,
      volume: 0.3
    });
    this.scene.sound.play("wind1", {
      loop: true,
      volume: 0.1
    });

  }

  public playRepair() {
    this.scene.sound.play("repair");
  }

  public playTalk() {
    this.scene.sound.play("talk");
  }

  public playPanic() {
    const key = `panic${Phaser.Math.Between(1, 2)}`
    this.scene.sound.play(key, {
      volume: 0.1
    });
  }

  public playApocalypsis() {
    const key = `apocalypsis${Phaser.Math.Between(1, 8)}`
    const s = this.scene.sound.get(key);
    if (s && s.isPlaying) return;
    this.scene.sound.play(key, {
      volume: 0.1,
      loop: false
    });
  }

}