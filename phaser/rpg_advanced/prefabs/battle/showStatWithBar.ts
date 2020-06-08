import { Prefab, PrefabProperties } from "../prefab";
import { TextPrefab } from '../textPrefab';
import * as SCENES from '../../constants/scenes.const';

export interface ShowStatWithBarProperties extends PrefabProperties {
  prefab: any;
  stat: any;
  bar_texture: any;
  text: string;
  style: any;
}

export class ShowStatWithBar extends TextPrefab {
  unit_data: any;
  stat: any;
  bar_sprite: any;
  current_stat: any;

  constructor(scene: any, name: string, position: any, properties: ShowStatWithBarProperties) {
    super(scene, name, position, properties);

    this.unit_data = this.scene.sprites[properties.prefab];
    this.stat = properties.stat;

    this.bar_sprite = this.scene.add.sprite(this.x, this.y + 20,  properties.bar_texture);
    this.bar_sprite.setOrigin(0);
  }

  update() {
    this.current_stat = this.unit_data.stats[this.stat];
    this.bar_sprite.setScale(this.current_stat / 100, 1.0);
  }

  show(show) {
    this.setVisible(show);
    this.bar_sprite.setVisible(show);
  }

}
