import * as SCENES from '../constants/scenes.const';
import * as ASSETS from '../constants/assets.const';
import * as OBJECTS from '../constants/objects.const';
import gameMap from '../config/map';
import { deepCopy } from '../utils';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tiles: Phaser.Tilemaps.Tileset;
  private backgroundLayear: Phaser.Tilemaps.StaticTilemapLayer;
  private graphics: Phaser.GameObjects.Graphics;
  private path: Phaser.Curves.Path;
  private cursor: Phaser.GameObjects.Image;
  private cursorSize: number
  private gameMap: number[][];

  constructor() {
    super({key: SCENES.GAME});
  }

  init(): void {
    this.gameMap = deepCopy(gameMap);
  }

  preload(): void {
  }

  create(): void {
    this.createTilemapObjects();
    this.createPath();
    this.createTower();
    this.createCursor();
  }

  update(): void {

  }

  createTilemapObjects(): void {
    this.map = this.make.tilemap({key: ASSETS.LEVEL_1});
    this.tiles = this.map.addTilesetImage(ASSETS.TERRAIN);
    this.backgroundLayear = this.map.createStaticLayer(OBJECTS.BG, this.tiles, 0, 0);
  }

  createPath(): void {
    this.graphics = this.add.graphics();
    this.path = this.add.path(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 544);

    // only for debugging
    this.graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(this.graphics);
  }

  createTower(): void {
    this.add.image(480, 480, ASSETS.BASE);
  }

  createCursor(): void {
    this.cursor = this.add.image(480, 480, ASSETS.CURSOR);
    this.cursor.setScale(2);
    this.cursor.alpha = 0;
    this.cursorSize = 64;

    this.input.on('pointermove', pointer => {
      const i = Math.floor(pointer.x / this.cursorSize);
      const j = Math.floor(pointer.y / this.cursorSize);
      if (this.canPlaceTurret(i, j)) {
        this.cursor.setPosition(i * this.cursorSize + 32, j * this.cursorSize + 32);
        this.cursor.alpha = 0.8;
      } else {
        this.cursor.alpha = 0;
      }
    });
  }

  canPlaceTurret(i: number, j: number): boolean {
    return this.gameMap[j][i] === 0;
  }
}
