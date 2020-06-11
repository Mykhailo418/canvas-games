import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';

export interface InventoryMenuItemProperties extends PrefabProperties {

}

export class InventoryMenuItem extends MenuItem {
  constructor(scene: any, name: string, position: any, properties: InventoryMenuItemProperties) {
    super(scene, name, position, properties);

  }

  select() {
    if ((<any>this.scene.cache).game.inventory.has_items()) {
      this.scene.sprites.actions_menu.enable(false);
      this.scene.sprites.items_menu.enable(true);
    }
  }
}
