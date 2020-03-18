import * as SCENES from '../constants/scenes.const';

export class JSONLevelScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private levelData: any;
  private sprites: any;
  private groups: any;

  constructor(key) {
    super({key});
  }

  init(data: any) {
    this.levelData = data.levelData;
  }

  create(): void {
    this.addGroupsOfSprites();
    this.addSprites();
  }

  protected addGroupsOfSprites() {
    this.groups = {};
    this.levelData.groups.forEach(groupName => {
      this.groups[groupName] = this.add.group();
    });
  }

  protected addSprites() {
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
