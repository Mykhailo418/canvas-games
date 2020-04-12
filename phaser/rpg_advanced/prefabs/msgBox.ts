import { Prefab, PrefabProperties } from "./prefab";
import { TextPrefab } from './textPrefab';
import * as SCENES from '../constants/scenes.const';

export interface MsgBoxProperties extends PrefabProperties {
  message: string;
}

export class MsgBox extends Prefab {
  msgTxt: TextPrefab;
  constructor(scene: any, name: string, position: any, properties: MsgBoxProperties) {
    super(scene, name, position, properties);
    this.msgTxt = new TextPrefab(scene, `${this.name}_message`,
      {
        x: this.x + (this.width / 2),
        y: this.y + 50
      },
      {
        group: 'hud',
        text: properties.message,
        style: {
          ...this.scene.TEXT_STYLE
        }
      }
    );
    this.setOrigin(0);
    this.msgTxt.setOrigin(0.5);
  }

  destroy () {
      super.destroy();
      this.msgTxt.destroy();
  }
}
