import * as SCENES from '../constants/scenes.const';

export class GameScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({key: SCENES.GAME});
  }
}
