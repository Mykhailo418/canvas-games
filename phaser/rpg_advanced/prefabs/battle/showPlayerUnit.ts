import { Prefab, PrefabProperties } from "../prefab";
import { TextPrefab } from '../textPrefab';
import * as SCENES from '../../constants/scenes.const';
import { ShowStatWithBar } from './showStatWithBar';

export interface ShowPlayerUnitProperties extends PrefabProperties {
  face_texture: any;
  text_style: any;
  prefab: any;
}

export class ShowPlayerUnit extends Prefab {
  face_texture: any;
  face_sprite: any;
  unit_data: any;
  player_unit_health: ShowStatWithBar;
  player_unit_mana: ShowStatWithBar;

  constructor(scene: any, name: string, position: any, properties: ShowPlayerUnitProperties) {
    super(scene, name, position, properties);
    this.face_texture = properties.face_texture;
    this.face_sprite = this.scene.add.sprite(this.x + 130, this.y, this.face_texture);
    this.face_sprite.setOrigin(0);

    this.unit_data = this.scene.sprites[properties.prefab];
    this.player_unit_health = new ShowStatWithBar(this.scene, `${this.name}_health`,
      {x: this.x, y: this.y},
      {
        group: 'hud',
        anchor: {x: 0, y: 0},
        text: 'HP',
        style: properties.text_style,
        prefab: properties.prefab,
        stat: 'health',
        bar_texture: 'healthbar_image'
      });
    this.player_unit_mana = new ShowStatWithBar(this.scene, `${this.name}_mana`,
      {x: this.x, y: this.y + 30},
      {
        group: 'hud',
        anchor: {x: 0, y: 0},
        text: 'MP',
        style: properties.text_style,
        prefab: properties.prefab,
        stat: 'mana',
        bar_texture: 'manabar_image'
      });
  }

  change_current_unit(new_prefab, new_face_texture) {
    this.unit_data = new_prefab;
    this.player_unit_health.unit_data = this.unit_data;
    this.player_unit_mana.unit_data = this.unit_data;

    this.face_sprite.setTexture(new_face_texture);
  }

  show(show) {
    this.player_unit_health.show(show);
    this.player_unit_mana.show(show);
    this.face_sprite.setVisible(show);
  }

}
