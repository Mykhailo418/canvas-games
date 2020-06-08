import { Item } from './item';

export class Inventory {
  items = [];
  item_classes = {
    potion: Item.prototype.constructor
  };

  constructor() {}

  collect_item(scene, item_object) {
    if (this.items[item_object.type]) {
      this.items[item_object.type].amount ++;
    } else {
      let item = new this.item_classes[item_object.type](scene, item_object.type,
        {x: 0, y: 0}, item_object.properties);
      this.items[item_object.type] = {
        prefab: item,
        amount: 1
      };
    }
  }
}
