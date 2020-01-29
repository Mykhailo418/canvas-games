import * as ASSETS from '../constants/assets.const';
import * as SCENES from '../constants/scenes.const';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tiles: Phaser.Tilemaps.Tileset;
  private backgroundLayear: Phaser.Tilemaps.StaticTilemapLayer;
  private blockedLayear: Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super({
      key: SCENES.GAME
    });
  }

  preload(): void {}

  create(): void {
    this.createMap();
  }

  update(): void {

  }

  createMap(): void {
    this.map = this.make.tilemap({key: ASSETS.LEVEL1}); // create tilemap
    this.tiles = this.map.addTilesetImage(ASSETS.PACK_SHEET); // create tileset image

    // layears
    this.backgroundLayear = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayear = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
  }
}
