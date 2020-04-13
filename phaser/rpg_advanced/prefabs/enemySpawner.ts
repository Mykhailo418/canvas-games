import { Prefab, PrefabProperties } from "./prefab";
import * as SCENES from '../constants/scenes.const';

export interface EnemySpawnerProperties extends PrefabProperties {

}

export class EnemySpawner extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;

  constructor(scene: any, name: string, position: any, properties: EnemySpawnerProperties) {
    super(scene, name, position, properties);

    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;

    this.body_prefab.immovable = true;

    this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
  }

  spawn() {
    this.scene.scene.start(SCENES.BOOT, {sceneName: SCENES.BATTLE});
  }
}
