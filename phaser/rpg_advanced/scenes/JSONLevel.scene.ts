import * as SCENES from '../constants/scenes.const';
import { Prefab } from '../prefabs/prefab';
import { TextPrefab } from '../prefabs/textPrefab';
import { UserInput } from '../plugins/UserInput';

export class JSONLevelScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  protected levelData: any;
  public sprites: any;
  public groups: any;
  userInputs: UserInput[];
  userInputData: any[];

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
      sprite.update && sprite.update();
    });
  }

  protected addGroupsOfSprites() {
    this.groups = {};
    this.levelData.groups.forEach(groupName => {
      this.groups[groupName] = this.physics.add.group();
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

  protected setupUserInput() {
    //this.userInput = new UserInput(this);
    Object.keys(this.levelData.user_input).forEach((key, index) => {
      this.userInputs.push(new UserInput(this));
      this.userInputData.push(this.cache.json.get(key));
      this.userInputs[index].set_input(this.userInputData[index]);
    });
  }
}
