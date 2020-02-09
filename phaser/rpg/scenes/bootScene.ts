import * as ASSETS from '../constants/assets.const';
import * as SCENES from '../constants/scenes.const';

export class BootScene extends Phaser.Scene {

  constructor() {
    super({key: SCENES.BOOT});
  }

  preload(): void {
    this.load.tilemapTiledJSON(ASSETS.LEVEL1, 'assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON(ASSETS.LEVEL2, 'assets/tilemaps/level2.json');
    this.load.spritesheet(ASSETS.PACK_SHEET, 'assets/images/RPGpack_sheet.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet(ASSETS.CHATACTERS, 'assets/images/roguelikeChar_transparent.png', {
      frameWidth: 17,
      frameHeight: 17
    });
    this.load.image(ASSETS.PORTAL, 'assets/images/raft.png');
    this.load.image(ASSETS.COIN, 'assets/images/coin_01.png');
    this.load.image(ASSETS.BULLET, 'assets/images/ballBlack_04.png');
  }

  create(): void {
    this.scene.start(SCENES.GAME, {
      // extra properties
      level: 1,
      prevLevel: 0,
      newGame: true,
      levels: {
        1: ASSETS.LEVEL1,
        2: ASSETS.LEVEL2
      }
    });
  }
}
