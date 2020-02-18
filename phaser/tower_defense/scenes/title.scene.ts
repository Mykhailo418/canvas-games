import * as SCENES from '../constants/scenes.const';
import * as ASSETS from '../constants/assets.const';

export class TitleScene extends Phaser.Scene {
  titleImage: Phaser.GameObjects.Image;
  blueBtn: Phaser.GameObjects.Sprite;
  playText: Phaser.GameObjects.Text;

  constructor() {
    super({key: SCENES.TITLE});
  }

  preload(): void {

  }

  create(): void {
    this.addTitle();
    this.addBtn();
  }

  centerGameObj(obj: any, offset = 0): void {
    const {width, height} = this.cameras.main;
    obj.x = width/2;
    obj.y = height/2 - offset * 100;
  }

  addTitle(): void {
    this.titleImage = this.add.image(0, 0, ASSETS.TITLE);
    this.centerGameObj(this.titleImage, 1);
  }

  addBtn(): void {
    this.blueBtn = this.add.sprite(0, 0, ASSETS.BLUE_BTN_1)
      .setInteractive();
    this.centerGameObj(this.blueBtn, -1);
    this.playText = this.add.text(0, 0, 'Play', {
      font: '32px',
      fill: '#fff'
    });

    // place element in center of another element
    Phaser.Display.Align.In.Center(this.playText, this.blueBtn);

    this.blueBtn.on('pointerdown', pointer => {
      this.scene.start(SCENES.GAME);
    });

    this.blueBtn.on('pointerover', pointer => {
      this.blueBtn.setTexture(ASSETS.BLUE_BTN_2);
    });

    this.blueBtn.on('pointerout', pointer => {
      this.blueBtn.setTexture(ASSETS.BLUE_BTN_1);
    });
  }
 }
