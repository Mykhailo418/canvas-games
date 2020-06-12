import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { Item, ItemProperties } from './item';

export interface PotionProperties extends ItemProperties {
  health_power: number;
}

export class Potion extends Item {
  protected body_prefab: Phaser.Physics.Arcade.Body;
  health_power: number;

  constructor(scene: any, name: string, position: any, properties: PotionProperties) {
    super(scene, name, position, properties);

    this.health_power = properties.health_power;
  }

  use(target: any) {
    target.stats.health = Math.min(100, target.stats.health + this.health_power);
  }

}
