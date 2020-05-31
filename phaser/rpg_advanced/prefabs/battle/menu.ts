import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';

export interface MenuProperties extends PrefabProperties {
  menu_items: any
}

export class Menu extends Prefab {
  menu_items = [];

  constructor(scene: any, name: string, position: any, properties: MenuProperties) {
    super(scene, name, position, properties);


    for (let menu_item_name in properties.menu_items) {
      let menu_item = this.scene.create_prefab(menu_item_name, properties.menu_items[menu_item_name]);
      this.menu_items.push(menu_item);
    }

    this.enable(false);
  }

  enable (isEnabled: boolean) {
    this.menu_items.forEach(menu_item => {
      if (menu_item.active) {
        menu_item.setInteractive(isEnabled);
        menu_item.setVisible(isEnabled);
      }
    });
  }

}
