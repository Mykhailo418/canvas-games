import * as SCENES from '../constants/scenes.const';
import { Prefab } from '../prefabs/prefab';
import { TextPrefab } from '../prefabs/textPrefab';
import { UserInput } from '../plugins/UserInput';

export class JSONLevelScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  protected levelData: any;
  public sprites: any;
  public groups: any;
  public prefabClasses: any = {};
  userInput: any;
  userInputData: any;
  userInputs: any;

  constructor(key) {
    super({key});
  }

  init(data: any) {
    this.levelData = data.levelData;
    this.userInputs = [];
    this.userInputData = [];
    this.input.keyboard.removeAllListeners('keydown');
    this.input.keyboard.removeAllListeners('keyup');
  }

  create(): void {
    this.addGroupsOfSprites();
    this.addSprites();
    this.setupUserInput();
  }

  update(): void {
    Object.keys(this.sprites).forEach(key => {
      const sprite = this.sprites[key];
      sprite && sprite.update && sprite.update();
    });
  }

  protected addGroupsOfSprites() {
    this.groups = {};
    this.levelData.groups.forEach(groupName => {
      this.groups[groupName] = this.physics.add.group();
    });
  }

  public create_prefab(spriteName: string, spriteData: any): any {
    let sprite;
    const {type, position, properties} = spriteData;
    if (type === 'background') {
      sprite = this.addBackground(properties.texture);
    } else {
      const PrefabClass: any = this.getPrefabClass(type);
      if (PrefabClass) {
        sprite = new PrefabClass(this, spriteName, position, properties);
      }
    }
    return sprite;
  }

  protected addSprites() {
    this.sprites = {};
    if (this.levelData.sprites) {
      Object.keys(this.levelData.sprites).forEach(spriteName => {
        let sprite = this.create_prefab(spriteName, this.levelData.sprites[spriteName]);
        this.sprites[spriteName] = sprite;
      });
    }
  }

  protected getPrefabClass(type: string, ): any {
    if (this.prefabClasses[type]) {
      return this.prefabClasses[type];
    }
    switch (type) {
      case 'background':
      case 'sprite': return Prefab.prototype.constructor;
      case 'text': return TextPrefab.prototype.constructor;
    }
  }

  protected setupUserInput() {
    if (!this.levelData.user_input) return;
    //this.userInput = new UserInput(this);
    this.userInputs = {};
    Object.keys(this.levelData.user_input).forEach((key, index) => {
      /*this.userInputs.push(new UserInput(this));
      this.userInputData.push(this.cache.json.get(key));
      this.userInputs[index].set_input(this.userInputData[index]);*/

      this.userInputs[key] = this.cache.json.get(key);
    });

    this.userInput = new UserInput(this);
    this.userInputData = this.cache.json.get(this.levelData.initial_user_input);
    this.userInput.set_input(this.userInputData);
  }

  private addBackground(key: string) {
    const bg = this.add.sprite(0, 0, key);
    bg.setOrigin(0, 0);
    return bg;
  }
}
