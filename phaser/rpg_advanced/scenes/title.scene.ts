import * as SCENES from '../constants/scenes.const';

export class TitleScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private bg_asset = "background_image";
  private levelData: any;
  private sprites: any;
  private groups: any;

  constructor() {
    super({key: SCENES.TITLE});
  }

  init(data: any) {
    this.levelData = data.levelData;
  }

  preload(): void {
  }

  create(): void {
    this.addBackground();
    this.addGroupsOfSprites();
    this.addSprites();
  }

  update(): void {

  }

  private addBackground() {
    const bg = this.add.sprite(0, 0, this.bg_asset);
    bg.setOrigin(0, 0);
  }

  private addGroupsOfSprites() {
    this.groups = {};
    this.levelData.groups.forEach(groupName => {
      this.groups[groupName] = this.add.group();
    });
  }

  private addSprites() {
    this.sprites = {};
    Object.keys(this.levelData.sprites).forEach(spriteName => {
      const spriteData = this.levelData.sprites[spriteName];
      let sprite;
      switch (spriteData.type) {
        case 'background':
        case 'sprite':
          sprite = this.add.sprite(spriteData.position.x, spriteData.position.y,
            spriteData.position.texture);
          break;
        case 'text':
          sprite = this.add.text(spriteData.position.x, spriteData.position.y,
            spriteData.properties.text, spriteData.properties.style);
          break;
      }
      this.sprites[spriteName] = sprite;
      this.groups[spriteData.properties.group].add(sprite);
    });
  }
}
