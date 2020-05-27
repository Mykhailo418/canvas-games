import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';

export interface RunMenuItemProperties extends PrefabProperties {
  run_chance: number;
}

export class RunMenuItem extends MenuItem {
  run_chance: number;

  constructor(scene: any, name: string, position: any, properties: RunMenuItemProperties) {
    super(scene, name, position, properties);

    this.run_chance = properties.run_chance;
  }

  select() {
    let random_number = this.scene.rnd.frac();
    if (random_number < this.run_chance) {
      this.scene.back_to_world();
    } else {
      this.scene.next_turn();
    }
  }
}
