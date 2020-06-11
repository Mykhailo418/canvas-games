import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface ItemProperties extends PrefabProperties {
  item_texture: any;
}

export class Item extends Prefab {
  protected body_prefab: Phaser.Physics.Arcade.Body;
  item_texture: any;

  constructor(scene: any, name: string, position: any, properties: ItemProperties) {
    super(scene, name, position, properties);

    this.item_texture = properties.item_texture;
  }

}
