import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';
import { MagicalAttack } from './magicalAttack';

export interface MagicalAttackMenuProperties extends PrefabProperties {

}

export class MagicalAttackMenuItem extends MenuItem {
  MANA_COST = 10;

  constructor(scene: any, name: string, position: any, properties: MagicalAttackMenuProperties) {
    super(scene, name, position, properties);

  }

  select() {
    if (this.scene.current_unit.stats.mana >= this.MANA_COST) {
      this.scene.current_attack = new MagicalAttack(this.scene, `${this.scene.current_unit.name}_attack`,
        {
          x: 0,
          y: 0
        }, {
            group: 'attacks',
            owner: this.scene.current_unit,
            mana_cost: this.MANA_COST
        }
      );

      this.scene.sprites.actions_menu.enable(false);
      this.scene.sprites.enemy_units_menu.enable(true);
    }
  }
}
