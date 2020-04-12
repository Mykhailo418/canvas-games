import { Prefab, PrefabProperties } from "./prefab";
import * as SCENES from '../constants/scenes.const';

export interface DoorProperties extends PrefabProperties {
  next_level: string;
}

export class Door extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  next_level: string;
  constructor(scene: any, name: string, position: any, properties: DoorProperties) {
    super(scene, name, position, properties);
    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;
    this.next_level = properties.next_level;

    this.body_prefab.immovable = true;

    this.scene.physics.add.collider(this, this.scene.groups.players, this.collisionDetect, null, this);
  }

  collisionDetect() {
    this.scene.scene.start(SCENES.BOOT, {sceneName: this.next_level});
  }
}
