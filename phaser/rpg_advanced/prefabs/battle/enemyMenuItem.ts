import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';

export interface EnemyMenuItemProperties extends PrefabProperties {
  enemy_name: string;
}

export class EnemyMenuItem extends MenuItem {
  enemy: any;

  constructor(scene: any, name: string, position: any, properties: EnemyMenuItemProperties) {
    super(scene, name, position, properties);

    this.enemy = this.scene.sprites[properties.enemy_name]
  }

  select() {
    this.scene.current_attack.hit(this.enemy);
    this.scene.sprites.enemy_units_menu.enable(false);
  }
}
