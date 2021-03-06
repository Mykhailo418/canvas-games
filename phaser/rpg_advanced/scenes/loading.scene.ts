import * as SCENES from '../constants/scenes.const';

export class LoadingScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private levelData: any;

  constructor() {
    super({key: SCENES.LOADING});
  }

  init(data: any) {
    console.log('loading', data);
    this.levelData = data.levelData;
    const loadingMsg = this.add.text(320, 240, "Loading", {
      font: "48px Kells",
      fill: '#fff'
    });
  }

  preload() {
    const {assets, user_input} = this.levelData;
    Object.keys(assets).forEach(assetKey => {
      const asset = assets[assetKey];
      switch (asset.type) {
          case 'image':
              this.load.image(assetKey, asset.source);
              break;
          case 'spritesheet':
              this.load.spritesheet(assetKey, asset.source, {
                frameWidth: asset.frame_width,
                frameHeight: asset.frame_height,
                margin: asset.margin,
                spacing: asset.spacing
              });
              break;
          case 'tilemap':
              this.load.tilemapTiledJSON(assetKey, asset.source);
              break;
      }
    });
    if (user_input) {
      Object.keys(user_input).forEach(key => {
          this.load.json(key, user_input[key]);
      });
    }
  }

  create(params: {levelData: any, scene: string, extra_parameters: any}) {
      this.scene.start(params.scene, {
        levelData: this.levelData,
        extra_parameters: params.extra_parameters
      });
  }
}
