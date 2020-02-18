import * as SCENES from '../constants/scenes.const';

export class GameScene extends Phaser.Scene {

  constructor() {
    super({key: SCENES.GAME});
  }

  preload(): void {
    //this.load.image("myImage", "../assets/phaser.png");
  }

  create(): void {
    //phaserSprite = this.add.sprite(400, 300, "myImage");
  }

  update(): void {

  }
}
