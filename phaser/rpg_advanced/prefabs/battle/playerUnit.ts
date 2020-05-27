import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { Unit } from './unit';

export interface PlayerUnitProperties extends PrefabProperties {
  stats: any;
  animations: any;
  target_units: any;
}

export class PlayerUnit extends Unit {
  target_units: any;

  constructor(scene: any, name: string, position: any, properties: PlayerUnitProperties) {
    super(scene, name, position, properties);
  }

  act() {
    this.scene.sprites.actions_menu.enable(true);
  }

}
