import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';
import { MenuItem } from './menuItem';

export interface ItemMenuItemProperties extends PrefabProperties {
  item_name: string;
  amount: number;
}

export class ItemMenuItem extends MenuItem {
  item_name: string;
  amount: number;
  constructor(scene: any, name: string, position: any, properties: ItemMenuItemProperties) {
    super(scene, name, position, properties);
      this.item_name = properties.item_name;
      this.amount = properties.amount;
  }

  select() {

  }
}
