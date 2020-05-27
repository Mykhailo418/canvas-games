import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { Attack } from './attack';
import { Unit } from './unit';

export interface EnemyUnitProperties extends PrefabProperties {
  stats: any;
  animations: any;
  target_units: any;
}

export class EnemyUnit extends Unit {
  target_units: any;
  attack: Attack;

  constructor(scene: any, name: string, position: any, properties: EnemyUnitProperties) {
    super(scene, name, position, properties);

    this.target_units = properties.target_units;

    this.attack = new Attack(this.scene, `${this.name}_attack`,
      {
        x: 0,
        y: 0
      }, {
          group: 'attacks',
          owner: this
      }
    );
  }

  act() {
    const target = this.choose_target();

    this.attack.hit(target);
  }

  choose_target() {
    let target;
    let activeTargetUnits = this.scene.groups[this.target_units].countActive();
    let targetIndex = this.scene.rnd.between(0, activeTargetUnits - 1);
    let active_player_unit_index = 0;
    this.scene.groups[this.target_units].children.each(unit => {
      if (unit.active) {
        if (active_player_unit_index === targetIndex) {
          target = unit;
        }
        active_player_unit_index ++;
      }
    });
    return target;
  }

}
