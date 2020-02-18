import * as SCENES from '../constants/scenes.const';
import * as ASSETS from '../constants/assets.const';

export class PreloadScene extends Phaser.Scene {
  private readyCount: number;
  private timedEvent: Phaser.Time.TimerEvent;

  constructor() {
    super({key: SCENES.PRELOAD});
  }

  init() {
    this.readyCount = 0;
  }

  preload(): void {
    const {width, height} = this.cameras.main;
    // add logo image
    this.add.image(width / 2, height / 2 - 100, 'logo');

    this.displayProgressBar(width, height);
    this.loadAssets();

    // tile map in JSON format
    this.load.tilemapTiledJSON(ASSETS.LEVEL_1, 'asssets/level/level1.json');
    this.load.spritesheet(ASSETS.TERRAIN, 'assets/level/terrainTiles_default.png', { frameWidth: 64, frameHeight: 64 });
  }

  create(): void {
  }

  private loadAssets(): void {
    this.load.image(ASSETS.BULLET, 'assets/level/bulletDark2_outline.png');
    this.load.image(ASSETS.TOWER, 'assets/level/tank_bigRed.png');
    this.load.image(ASSETS.ENEMY, 'assets/level/tank_sand.png');
    this.load.image(ASSETS.BASE, 'assets/level/tankBody_darkLarge_outline.png');
    this.load.image(ASSETS.TITLE, 'assets/ui/title.png');
    this.load.image(ASSETS.CURSOR, 'assets/ui/cursor.png');
    this.load.image(ASSETS.BLUE_BTN_1, 'assets/ui/blue_button02.png');
    this.load.image(ASSETS.BLUE_BTN_2, 'assets/ui/blue_button03.png');
  }

  private displayProgressBar(width: number, height: number): void {
    const progressBar = this.add.graphics(); // create sprite
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percenText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percenText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    this.load.on('progress', value => {
      const percent: number = Math.floor(value*100);
      percenText.setText(`${percent}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300*value, 30);
    });

    this.load.on('fileprogress', file => {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      assetText.destroy();
      loadingText.destroy();
      percenText.destroy();
      this.ready();
    });

    // time event for logo
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready(): void {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start(SCENES.TITLE);
    }
  }
}
