import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';
import { Attack } from './attack';

export interface PhysicalAttackMenuProperties extends PrefabProperties {

}

export class PhysicalAttackMenuItem extends MenuItem {

  constructor(scene: any, name: string, position: any, properties: PhysicalAttackMenuProperties) {
    super(scene, name, position, properties);

  }

  select() {
    this.scene.current_attack = new Attack(this.scene, `${this.scene.current_unit.name}_attack`,
      {
        x: 0,
        y: 0
      }, {
          group: 'attacks',
          owner: this.scene.current_unit
      }
    );

    this.scene.sprites.actions_menu.enable(false);
    this.scene.sprites.enemy_units_menu.enable(true);
  }
}
