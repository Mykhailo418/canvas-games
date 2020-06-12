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
    const cache = (<any>this.scene.cache);
    if (cache.game.inventory.has_item(this.item_name)) {
      this.scene.sprites.items_menu.enable(false);

      cache.game.inventory.use_item(this.item_name, this.scene.current_unit);

      if (!cache.game.inventory.has_item(this.item_name)) {
        const scene = this.scene;
        this.destroy();
        scene.next_turn();
      } else {
        this.scene.next_turn();
      }
    }
  }
}
