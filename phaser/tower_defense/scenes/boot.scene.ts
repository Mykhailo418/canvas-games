import * as SCENES from '../constants/scenes.const';

export class BootScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({key: SCENES.BOOT});
  }

  preload(): void {
    this.load.image('logo', 'assets/logo/zenva_logo.png')
  }

  create(): void {
    this.scene.start(SCENES.PRELOAD);
  }
}
