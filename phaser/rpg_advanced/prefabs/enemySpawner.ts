import { Prefab, PrefabProperties } from "./prefab";
import * as SCENES from '../constants/scenes.const';

export interface EnemySpawnerProperties extends PrefabProperties {
  encounter: any;
}

export class EnemySpawner extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  encounter: any;

  constructor(scene: any, name: string, position: any, properties: EnemySpawnerProperties) {
    super(scene, name, position, properties);

    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;

    this.body_prefab.immovable = true;

    this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);

    this.encounter = this.scene.cache.json.get(properties.encounter);
    console.log('11111111',properties.encounter, this.encounter);
  }

  spawn() {
    this.scene.scene.start(SCENES.BOOT, {
      sceneName: SCENES.BATTLE,
      extra_parameters: {
        previous_level: this.scene.levelData.level,
        encounter: this.encounter
      }
    });
  }
}
