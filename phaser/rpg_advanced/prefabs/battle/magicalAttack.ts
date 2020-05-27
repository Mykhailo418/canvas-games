import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface MagicalAttackProperties extends PrefabProperties {
  owner: any;
  mana_cost: number
}

export class MagicalAttack extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  owner: any;
  mana_cost: number;

  constructor(scene: any, name: string, position: any, properties: MagicalAttackProperties) {
    super(scene, name, position, properties);

    this.owner = properties.owner;
    this.mana_cost = properties.mana_cost;
  }

  hit(target: any) {
    const attack_coefficient = this.scene.rnd.realInRange(0.9, 1.3);
    const defense_coefficient = this.scene.rnd.realInRange(0.7, 1.1);

    const attack = attack_coefficient * this.owner.stats.magical_attack;
    const defense = defense_coefficient * target.stats.defense;

    let damage = Math.max(0, Math.round(attack - defense));

    target.receive_damage(damage);

    this.owner.stats.mana -= this.mana_cost;

    this.owner.anims.play(`${this.owner.name}_attack2`);
  }

}
