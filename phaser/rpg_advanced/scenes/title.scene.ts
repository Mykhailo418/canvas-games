import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';

export class TitleScene extends JSONLevelScene {
  private bg_asset = "background_image";

  constructor() {
    super(SCENES.TITLE);
  }

  create() {
    this.addBackground();
    super.create();
  }

  update() {
  }

  private addBackground() {
    const bg = this.add.sprite(0, 0, this.bg_asset);
    bg.setOrigin(0, 0);
  }
}