import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface ItemProperties extends PrefabProperties {

}

export class Item extends Prefab {
  protected body_prefab: Phaser.Physics.Arcade.Body;

  constructor(scene: any, name: string, position: any, properties: ItemProperties) {
    super(scene, name, position, properties);
  }

}
