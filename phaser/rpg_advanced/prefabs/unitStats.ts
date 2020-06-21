import { Prefab, PrefabProperties } from "./prefab";
import { TextPrefab } from './textPrefab';
import * as SCENES from '../constants/scenes.const';

export interface UnitStatsProperties extends PrefabProperties {
  stats: any;
  face_texture: any;
}

export class UnitStats extends Prefab {
  stats: any;
  face_texture: any;
  constructor(scene: any, name: string, position: any, properties: UnitStatsProperties) {
    super(scene, name, position, properties);

    this.stats = Object.create(properties.stats);
    this.face_texture = properties.face_texture;
  }


}
