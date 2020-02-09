import * as ASSETS from '../constants/assets.const';
import * as SCENES from '../constants/scenes.const';
import * as OBJECTS from '../constants/objects.const';
import { Player } from '../sprites/player';
import { Portal } from '../sprites/portal';
import { CoinsGroup } from '../groups/Coins';
import { EnemiesGroup } from '../groups/Enemies';

interface levelDataType {
  level: number;
  prevLevel: number;
  newGame: boolean;
  levels: {[key: number]: string};
};

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tiles: Phaser.Tilemaps.Tileset;
  private backgroundLayear: Phaser.Tilemaps.StaticTilemapLayer;
  private blockedLayear: Phaser.Tilemaps.StaticTilemapLayer;
  private player: Player;
  private portal: Portal;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private levelData: levelDataType;
  private levelLoading: boolean;
  private coins: Phaser.GameObjects.Sprite[];
  private coinsGroup: CoinsGroup;
  private enemies: Phaser.GameObjects.Sprite[];
  private enemiesGroup: EnemiesGroup;

  constructor() {
    super({key: SCENES.GAME});
  }

  init(data: levelDataType) {
    this.levelData = data;
    this.levelLoading = false;
    
    // emit even that new game is started
    if (this.levelData.newGame) {
      this.events.emit('newGame');
    }
  }

  preload(): void {}

  create(): void {
      this.scale.on('resize', this.resizeCamera, this);
    this.cursors = this.input.keyboard.createCursorKeys(); // listen for player input
    this.createMap();
    this.createPortal();
    this.createPlayer();
    this.createCoins();
    this.createEnemies();
    this.addCollisions();
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    this.player.playerControl(this.cursors);
  }

  resizeCamera({width, height}:{width: number, height: number}) {
    width = width ? width : Number(this.sys.game.config.width);
    height = height ? height : Number(this.sys.game.config.height);
    this.cameras.resize(width, height);
  }

  createMap(): void {
    this.add.tileSprite(0, 0, 8000, 8000, ASSETS.PACK_SHEET, 31); // add water background
    this.map = this.make.tilemap({key: this.getCurrentLevelTilemap()}); // create tilemap
    this.tiles = this.map.addTilesetImage(ASSETS.PACK_SHEET); // create tileset image

    // layears
    this.backgroundLayear = this.map.createStaticLayer(OBJECTS.BG, this.tiles, 0, 0);
    this.blockedLayear = this.map.createStaticLayer(OBJECTS.BLOCKED, this.tiles, 0, 0);
    this.blockedLayear.setCollisionByExclusion([-1]); // Sets collision on all tiles in the given layer, except for the IDs (-1 means to all)
  }

  getCurrentLevelTilemap(): string {
    const {levels, level} = this.levelData;
    return levels[level];
  }

  createPlayer(): void {
    // find data of objects in tilemap(it must have 'objects' property)
    this.map.findObject(OBJECTS.PLAYER, (obj: any) => {
      const {level, prevLevel} = this.levelData;
      if (prevLevel < level && obj.type === 'StartingPosition') {
        this.player = new Player(this, obj.x, obj.y);
      } else if (prevLevel > level && obj.type === 'StartingPositionPortal') {
        this.player = new Player(this, obj.x, obj.y);
      }
    });
  }

  createPortal(): void {
    this.map.findObject(OBJECTS.PORTAL, (obj: any) => {
      let positionY = obj.y;
      switch (this.levelData.level) {
        case 1: positionY -= 68; break;
        case 2: positionY += 70; break;
      }
      this.portal = new Portal(this, obj.x, positionY);
    });
  }

  createCoins(): void {
    this.coins = this.map.createFromObjects(
      'Coins', // name of layer in tilemap
      'Coin', // name of object in layer in tilemap
      {key: ASSETS.COIN}
    );
    this.coinsGroup = new CoinsGroup(this.physics.world, this, [], this.coins);
  }

  createEnemies(): void {
    this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {});
    this.enemiesGroup = new EnemiesGroup(this.physics.world, this, [], this.enemies);
  }

  addCollisions(): void {
    this.physics.add.collider(this.player, this.blockedLayear);
    this.physics.add.collider(this.enemiesGroup, this.blockedLayear);

    this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
    this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup));
    this.physics.add.overlap(this.enemiesGroup, this.player, this.player.enemyCollision.bind(this.player));
  }

  loadNextLevel(): void {
    let level;
    switch(this.levelData.level) {
      case 1: level = 2; break;
      case 2: level = 1; break;
    }
    this.restartGame({
      ...this.levelData,
      level: level,
      prevLevel: this.levelData.level,
      newGame: false
    });
  }

  restartToFirstLevel(): void {
    this.restartGame({
      ...this.levelData,
      level: 1,
      prevLevel: 0,
      newGame: true,
    });
  }

  private restartGame(levelData: levelDataType): void {
    if(this.levelLoading) return;

    this.cameras.main.fade(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.restart(levelData);
    });
    this.levelLoading = true;
  }
}
