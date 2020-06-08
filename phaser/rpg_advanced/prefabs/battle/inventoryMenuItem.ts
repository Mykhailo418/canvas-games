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
    console.log('inventory')
  }
}
