import * as SCENES from '../constants/scenes.const';
import * as ASSETS from '../constants/assets.const';
import * as OBJECTS from '../constants/objects.const';
import gameMap from '../config/map';
import { deepCopy } from '../utils';
import { Enemy } from '../objects/Enemy';
import { Turret } from '../objects/Turret';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tiles: Phaser.Tilemaps.Tileset;
  private backgroundLayear: Phaser.Tilemaps.StaticTilemapLayer;
  private graphics: Phaser.GameObjects.Graphics;
  private path: Phaser.Curves.Path;
  private cursor: Phaser.GameObjects.Image;
  private cursorSize: number
  private gameMap: number[][];
  private nextEnemy: number;
  private enemies: Phaser.GameObjects.Group;
  private turrets: Phaser.GameObjects.Group;
  private enemySpawnDelay: number;

  constructor() {
    super({key: SCENES.GAME});
  }

  init(): void {
    this.gameMap = deepCopy(gameMap);
    this.nextEnemy = 0;
    this.enemySpawnDelay = 2000;
  }

  preload(): void {
  }

  create(): void {
    this.createTilemapObjects();
    this.createPath();
    this.createTower();
    this.createCursor();
    this.createGroups();

    this.input.on('pointerdown', this.placeTurret.bind(this));
  }

  update(time: number, delta: number): void {
    this.spawnEnemies(time, delta);
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

  createGroups(): void {
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true // run update method of class 'Enemy'
    });
    this.turrets = this.physics.add.group({
      classType: Turret,
      runChildUpdate: true
    });
  }

  spawnEnemies(time: number, delta: number): void {
    let enemy: Enemy;
    if (time > this.nextEnemy) {
      enemy = this.enemies.getFirstDead(); // get first instance that is hidden(not active and not visible)
      if (!enemy) {
        enemy = new Enemy(this, 0, 0, this.path);
        this.enemies.add(enemy);
      }
      if (enemy) {
        enemy.showEnemy();
        enemy.startOnPath();
        this.nextEnemy = time + this.enemySpawnDelay;
      }
    }
  }

  getEnemy(x: number, y: number, range: number) {

  }

  addBullet(x: number, y: number, angle: number) {

  }

  placeTurret(pointer) {
    const i = Math.floor(pointer.x / this.cursorSize);
    const j = Math.floor(pointer.y / this.cursorSize);
    if (this.canPlaceTurret(i, j)) {
      let turret = this.turrets.getFirstDead();
      if (!turret) {
        turret = new Turret(this, 0, 0, this.gameMap);
        this.turrets.add(turret);
        turret.setBodyScaleToNormal();
      }
      turret.showTurret();
      turret.place(i, j);
    }
  }
}
