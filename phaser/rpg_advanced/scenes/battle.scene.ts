import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import { Prefab } from '../prefabs/index'

export class BattleScene extends JSONLevelScene {

  constructor() {
    super(SCENES.BATTLE);
    this.prefabClasses = {
      background: Prefab.prototype.constructor,
      player_unit: Prefab.prototype.constructor,
      enemy_unit: Prefab.prototype.constructor
    };
  }

}
