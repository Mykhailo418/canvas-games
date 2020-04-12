import { PrefabProperties } from "./prefab";

export interface TextPrefabProperties extends PrefabProperties {
  text: string;
  style: any;
}

export class TextPrefab extends Phaser.GameObjects.Text {
  public scene: any;
  public name: string;
  constructor(scene: any, name: string, position: any, properties: TextPrefabProperties) {
    super(scene, position.x, position.y, properties.text, properties.style);

    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    this.scene.groups[properties.group].add(this);

    if (properties.scale) {
      this.setScale(properties.scale.x, properties.scale.y);
    }

    if (properties.anchor) {
      this.setScale(properties.anchor.x, properties.anchor.y);
    }

    this.scene.sprites[name] = this;
  }
}
