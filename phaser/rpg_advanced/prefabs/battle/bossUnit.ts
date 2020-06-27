import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { Attack } from './attack';
import { MagicalAttack } from './magicalAttack';
import { Unit } from './unit';
import { EnemyUnit, EnemyUnitProperties } from './enemyUnit';

export interface BossUnitProperties extends EnemyUnitProperties {

};

enum BossStates {
    Default = "default",
    Enraged = "enraged",
    Special = "special",
};

export class BossUnit extends EnemyUnit {
  SPECIAL_ATTACK_THRESHOLD = 0.5;
  special_attack: MagicalAttack;
  max_health: any;
  enraged = false;
  current_state = BossStates.Default;

  constructor(scene: any, name: string, position: any, properties: BossUnitProperties) {
    super(scene, name, position, properties);

    this.special_attack = new MagicalAttack(this.scene, `${this.name}_special_attack`,
      {x: 0, y: 0},
      {
          group: 'attacks',
          owner: this,
          mana_cost: 0
      }
    );
    this.max_health = this.stats.health;
  }

  act() {
    switch (this.current_state) {
      case BossStates.Default: this.default_act(); break;
      case BossStates.Special: this.special_act(); break;
      case BossStates.Enraged: this.enraged_act(); break;
    }
    this.next_state();
  }

  next_state() {
    switch (this.current_state) {
      case BossStates.Default:
        if (this.stats.health < 0.5 * this.max_health && !this.enraged) {
          this.enraged = true;
          this.current_state = BossStates.Enraged;
        } else {
          let rand_number = this.scene.rnd.frac();
          if (rand_number < this.SPECIAL_ATTACK_THRESHOLD) {
            this.current_state = BossStates.Special;
          }
        }
        break;
      case BossStates.Special:
        this.current_state = BossStates.Default;
        break;
      case BossStates.Enraged:
        this.current_state = BossStates.Default;
        break;
    }
  }

  default_act() {
    super.act();
  }

  special_act() {
    this.scene.sprites.show_player_unit.show(false);
    const target = this.choose_target();

    this.special_attack.hit(target);
  }

  enraged_act() {
    this.scene.groups[this.target_units].children.each(target => {
      if (target.active) {
        this.special_attack.hit(target);
      }
    });
  }

}
