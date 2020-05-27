import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface MenuItemProperties extends PrefabProperties {

}

export class MenuItem extends Prefab {
  
  constructor(scene: any, name: string, position: any, properties: MenuItemProperties) {
    super(scene, name, position, properties);

    this.setInteractive();
    this.on('pointerdown', this.select.bind(this));
  }

  select() {
    console.log(this.name + ' seleceted');
  }
}
