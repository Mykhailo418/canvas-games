import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Prefab, PrefabProperties } from "./prefab";
import * as SCENES from '../constants/scenes.const';

export interface EquipmentProperties extends PrefabProperties {
  next_level: string;
  unit_name: string;
  texture: string;
  body_part: any;
  stat: any;
  bonus: number;
}

export class Equipment extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  unit_name: string;
  texture_name: string;
  body_part: any;
  stat: any;
  bonus: number;

  constructor(scene: any, name: string, position: any, properties: EquipmentProperties) {
    super(scene, name, position, properties);
    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;

    this.setScale(0.3, 0.3);
    this.unit_name = properties.unit_name;
    this.body_part = properties.body_part;
    this.stat = properties.stat;
    this.bonus = +properties.bonus;
    this.texture_name = properties.texture;

    this.body_prefab.immovable = true;
    this.body_prefab.setSize(this.width * this.scaleX, this.height * this.scaleY);

    this.scene.physics.add.collider(this, this.scene.groups.players, this.collect, null, this);
  }

  collect() {
    const cache: any = this.scene.cache;
    const unit_data = cache.game.party_data[this.unit_name];

    if (unit_data.equipment[this.body_part].name !== this.name) {
      unit_data.equipment[this.body_part] = {
        name: this.name,
        texture: this.texture_name
      };
      unit_data.stats_bonus[this.stat] = this.bonus;

      firebase.database()
        .ref('users/' + firebase.auth().currentUser.uid + '/party_data')
        .set(cache.game.party_data);

      this.destroy();
    }
  }
}
