import * as SCENES from '../constants/scenes.const';
import { Prefab } from '../prefabs/prefab';
import { TextPrefab } from '../prefabs/textPrefab';

export class JSONLevelScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  protected levelData: any;
  public sprites: any;
  public groups: any;

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
    if (this.levelData.sprites) {
      Object.keys(this.levelData.sprites).forEach(spriteName => {
        const {type, position, properties} = this.levelData.sprites[spriteName];
        const PrefabClass: any = this.getPrefabClass(type);
        let sprite = new PrefabClass(this, spriteName, position, properties);
      });
    }
  }

  protected getPrefabClass(type: string, ...props): any {
    switch (type) {
      case 'background':
      case 'sprite': return Prefab;
      case 'text': return TextPrefab;
    }
  }
}
