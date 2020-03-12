import * as SCENES from '../constants/scenes.const';

export class TitleScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private bg_asset = "background_image";

  constructor() {
    super({key: SCENES.TITLE});
  }

  preload(): void {
    this.load.image(this.bg_asset, "assets/images/battle/background.png");
  }

  create(): void {
    const bg = this.add.sprite(0, 0, this.bg_asset);
    bg.setOrigin(0, 0);
  }

  update(): void {

  }
}
