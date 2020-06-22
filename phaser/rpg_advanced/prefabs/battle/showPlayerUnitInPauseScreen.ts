import { Prefab, PrefabProperties } from "../prefab";
import { TextPrefab } from '../textPrefab';
import * as SCENES from '../../constants/scenes.const';
import { ShowStatWithBar } from './showStatWithBar';
import { ShowPlayerUnit, ShowPlayerUnitProperties } from './showPlayerUnit';

export interface ShowPlayerUnitInPauseProperties extends ShowPlayerUnitProperties {

}

export class ShowPlayerUnitInPauseScreen extends ShowPlayerUnit {
  private statsToShow = [
    {stat: 'attack', name: 'Attack', x: 250, y: 0},
    {stat: 'defense', name: 'Defense', x: 250, y: 50},
    {stat: 'magic_attack', name: 'Magic', x: 400, y: 0},
    {stat: 'speed', name: 'Speed', x: 400, y: 50},
  ];
  show_unit_attack: any;
  show_unit_defense: any;
  show_unit_magic_attack: any;
  show_unit_speed: any;
  level_text: any;

  constructor(scene: any, name: string, position: any, properties: ShowPlayerUnitInPauseProperties) {
    super(scene, name, position, properties);

    const cache: any = this.scene.cache;
    let prefab_data = cache.game.party_data[properties.prefab];
    this.setupStatsToShow(prefab_data, properties.text_style);

    let level = prefab_data.current_level + 1;
    this.level_text = this.scene.add.text(this.x + 130, this.y + 100, `Level: \n ${level}`, properties.text_style);
    this.level_text.setOrigin(0);
  }

  private setupStatsToShow(prefab_data: any, text_style: any) {
    this.statsToShow.forEach(statToShow => {
      let {stat, name, x, y} = statToShow;
      let value = prefab_data.stats[stat] + prefab_data.stats_bonus[stat];
      this[`show_unit_${stat}`] = this.scene.add.text(this.x + x, this.y + y, `${name}: \n ${value}`, text_style);
      this[`show_unit_${stat}`].setOrigin(0);
    });
  }

  change_current_unit(new_prefab, new_face_texture) {
    super.change_current_unit(new_prefab, new_face_texture);
  }

  show(show) {
    super.show(show);
    this.statsToShow.forEach(statToShow => {
      let {stat} = statToShow;
      this[`show_unit_${stat}`].setVisible(show);
    });
    this.level_text.setVisible(show);
  }

}
