import * as SCENES from '../constants/scenes.const';

export interface LevelModel {
  key: string;
  path: string;
}

export interface Levels {
  [key: string]: LevelModel;
}

export class BootScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private levels: Levels;

  constructor() {
    super({key: SCENES.BOOT});

    this.levels = {
      title: {
        key: SCENES.TITLE,
        path: 'assets/levels/title_screen.json'
      }
    }
  }

  preload(): void {
    Object.keys(this.levels).forEach(levelName => {
      let level = this.levels[levelName];
      this.load.json(levelName, level.path);
    });
  }

  create(): void {
    console.log(this.cache.json.get('title'));
  }

  update(): void {

  }
}
