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
      [SCENES.TITLE]: {
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

  // params come from "this.scene.start(SCENES.BOOT, {sceneName: SCENES.TITLE})"
  create(params: {sceneName: string}): void {
    const levelData = this.cache.json.get(params.sceneName);
    this.scene.start(SCENES.LOADING, {levelData});
  }

  update(): void {

  }
}