import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface AttackProperties extends PrefabProperties {
  owner: any;
}

export class Attack extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  owner: any

  constructor(scene: any, name: string, position: any, properties: AttackProperties) {
    super(scene, name, position, properties);

    this.owner = properties.owner;
  }

  hit(target: any) {
    const attack_coefficient = this.scene.rnd.realInRange(0.8, 1.2);
    const defense_coefficient = this.scene.rnd.realInRange(0.8, 1.2);

    const attack = attack_coefficient * this.owner.stats.attack;
    const defense = defense_coefficient * target.stats.defense;

    let damage = Math.max(0, Math.round(attack - defense));

    target.receive_damage(damage);

    this.owner.anims.play(`${this.owner.name}_attack1`);
  }

}
