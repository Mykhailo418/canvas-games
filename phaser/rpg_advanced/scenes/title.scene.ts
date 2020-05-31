import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';

export class TitleScene extends JSONLevelScene {
  private bg_asset = "background_image";

  constructor() {
    super(SCENES.TITLE);
  }

  preload () {
      this.load.json('default_data', 'assets/levels/default_data.json');
  }

  create() {
    //this.addBackground();
    super.create();
    (<any>this.cache).game.party_data = this.cache.json.get('default_data');
  }

  /*update() {
    if (this.input.activePointer.isDown) {
      this.startGame();
    }
  }*/

  // private addBackground() {
  //   const bg = this.add.sprite(0, 0, this.bg_asset);
  //   bg.setOrigin(0, 0);
  // }

  login() {
    this.scene.start(SCENES.BOOT, {
      sceneName: SCENES.WORLD
    });
  }
}
