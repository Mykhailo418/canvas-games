import * as SCENES from '../constants/scenes.const';
import * as ASSETS from '../constants/assets.const';
import * as OBJECTS from '../constants/objects.const';
import gameMap from '../config/map';
import levelConfig from '../config/levelConfig';
import { deepCopy } from '../utils';
import { Enemy } from '../objects/Enemy';
import { Turret } from '../objects/Turret';
import { Bullet } from '../objects/Bullet';
import { UiScene } from './ui.scene';

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
  private bullets: Phaser.GameObjects.Group;
  private enemySpawnDelay: number;
  private score: number;
  private health: number;
  private availableTurrets: number;
  private remainingEnemies: number;
  private level: number;
  private roundStarted: boolean;
  private uiScene: UiScene;

  constructor() {
    super({key: SCENES.GAME});
  }

  init(): void {
    this.gameMap = deepCopy(gameMap);
    this.nextEnemy = 0;
    this.enemySpawnDelay = 2000;
    this.health = levelConfig.initial.baseHealth;
    this.score = 0;
    this.level = 1;
    this.availableTurrets = levelConfig.initial.numOfTurrets;
    this.roundStarted = false;
    this.remainingEnemies = levelConfig.initial.numOfEnemies + this.level * levelConfig.incremental.numOfEnemies;

    this.events.emit('displayUI');
    this.events.emit('updateScore', this.score);
    this.events.emit('updateHealth', this.health);
    this.events.emit('updateTurretsCount', this.availableTurrets);
    this.events.emit('updateEnemies', this.remainingEnemies);

    this.uiScene = <UiScene>this.scene.get(SCENES.UI);
  }

  preload(): void {
  }

  create(): void {
    this.events.emit('startRound', this.level);

    this.uiScene.events.on('roundReady', () =>{
      this.roundStarted = true;
    });

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
    return this.gameMap[j][i] === 0 && this.availableTurrets > 0;
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
    this.bullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

    this.setColissions();
  }

  setColissions() {
    this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy.bind(this));
  }

  spawnEnemies(time: number, delta: number): void {
    let enemy: Enemy;
    if (time > this.nextEnemy && this.roundStarted && this.enemies.countActive(true) < this.remainingEnemies) {
      enemy = this.enemies.getFirstDead(); // get first instance that is hidden(not active and not visible)
      if (!enemy) {
        enemy = new Enemy(this, 0, 0, this.path);
        this.enemies.add(enemy);
      }
      if (enemy) {
        enemy.showEnemy();
        enemy.startOnPath(this.level);
        this.nextEnemy = time + this.enemySpawnDelay;
      }
    }
  }

  getEnemy(x: number, y: number, distance: number): Enemy {
    const enemiesArr = this.enemies.getChildren();
    for (const enemy of enemiesArr) {
      if (enemy.active &&
        Phaser.Math.Distance.Between(x, y, (<Enemy>enemy).x, (<Enemy>enemy).y) <= distance
      ) {
        return <Enemy>enemy;
      }
    }
  }

  addBullet(x: number, y: number, angle: number) {
    let bullet = this.bullets.getFirstDead();
    if (!bullet) {
      bullet = new Bullet(this, x, y);
      this.bullets.add(bullet);
    }
    bullet.fire(x, y, angle);
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
      this.updateTurretsCount(-1);
    }
  }

  damageEnemy(enemy: Enemy, bullet: Bullet) {
    if (enemy.active && bullet.active) {
      enemy.receiveDamage(bullet.damage);
      bullet.hide();
    }
  }

  updateScore(point: number) {
    this.score += point;
    this.events.emit('updateScore', this.score);
  }

  updateHealth(loseHealth: number) {
    this.health -= loseHealth;
    this.events.emit('updateHealth', this.health);

    if (this.health <= 0) {
      this.events.emit('hideUI');
      this.scene.start(SCENES.TITLE);
    }
  }

  updateTurretsCount(numberOfTurrets) {
    this.availableTurrets += numberOfTurrets;
    this.events.emit('updateTurretsCount', this.availableTurrets);
  }

  updateEnemies(numberOfEnemies: number) {
    this.remainingEnemies += numberOfEnemies;
    this.events.emit('updateEnemies', this.remainingEnemies);
    if (this.remainingEnemies <= 0) {
      this.increaseLevel();
    }
  }

  increaseLevel() {
    // stop round
    this.roundStarted = false;
    // increment level
    this.level++;
    // increment number of turrets
    this.updateTurretsCount(levelConfig.incremental.numOfTurrets);
    // increment number of enemies
    this.updateEnemies(levelConfig.initial.numOfEnemies + this.level * levelConfig.incremental.numOfEnemies);
    this.events.emit('startRound', this.level);
  }
}
