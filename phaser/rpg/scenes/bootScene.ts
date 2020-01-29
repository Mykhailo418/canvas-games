import * as ASSETS from '../constants/assets.const';
import * as SCENES from '../constants/scenes.const';

export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: SCENES.BOOT
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON(ASSETS.LEVEL1, 'assets/tilemaps/level1.json');
    this.load.spritesheet(ASSETS.PACK_SHEET, 'assets/images/RPGpack_sheet.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create(): void {
    this.scene.start(SCENES.GAME);
  }
}
