import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { Unit } from './unit';

export interface PlayerUnitProperties extends PrefabProperties {
  stats: any;
  animations: any;
  target_units: any;
}

export class PlayerUnit extends Unit {
  target_units: any;
  experience = 0;
  current_level = 0;

  constructor(scene: any, name: string, position: any, properties: PlayerUnitProperties) {
    super(scene, name, position, properties);
  }

  act() {
    this.scene.sprites.actions_menu.enable(true);
  }

  receive_experience(experience: number) {
    this.experience += experience;

    let next_level_data = this.scene.experience_table[this.current_level];

    if (this.experience >= next_level_data.required_exp) {
      this.current_level ++;
      this.experience = 0;
      for (let stat of next_level_data.stats_increase) {
        this.stats[stat] += next_level_data.stats_increase[stat];
      }
    }
  }

}
