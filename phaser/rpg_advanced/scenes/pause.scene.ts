import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import { UnitStats } from '../prefabs/unitStats.ts';

export class PauseScene extends JSONLevelScene {
  private bg_asset = "background_image";
  previous_level: any;

  constructor() {
    super(SCENES.PAUSE);

    this.prefabClasses = {
      unit_stats: UnitStats.prototype.constructor
    }
  }

  init (data) {
    super.init(data);
    this.previous_level = data.extra_parameters.previous_level;
  }

  create() {
    super.create();
    /*for (let player_unit_name in this.game.party_data) {
        let unit_data = this.game.party_data[player_unit_name];
        this.sprites[player_unit_name].stats = {};
        for (let stat_name in unit_data.stats) {
            this.sprites[player_unit_name].stats[stat_name] = unit_data.stats[stat_name] +
              unit_data.stats_bonus[stat_name];
        }
        this.sprites[player_unit_name].experience = unit_data.experience;
        this.sprites[player_unit_name].current_level = unit_data.current_level;
    }*/
  }

  start_game() {
    this.scene.start(SCENES.BOOT, {
      sceneName: SCENES.TOWN
    });
  }

  back_to_world() {
    this.scene.start(SCENES.BOOT, {sceneName: SCENES.TOWN});
  }

}
