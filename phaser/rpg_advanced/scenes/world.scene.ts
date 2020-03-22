import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import { Player } from '../prefabs/player';

export class WorldScene extends JSONLevelScene {
  private map: Phaser.Tilemaps.Tilemap;
  private tilesets: any;
  private layers: any;
  private prefabClasses = {
    player: Player.prototype.constructor
  };

  constructor() {
    super(SCENES.WORLD);
  }

  create() {
    this.map = this.add.tilemap(this.levelData.map.key);

    this.createTilesets();
    this.createLayers();

    super.create();

    this.createObjects();
  }

  update() {

  }

  private createTilesets() {
    this.tilesets = this.map.tilesets.reduce((acc: any, tileset: any, index: number) => {
      const tilesetLevelData = this.levelData.map.tilesets[index];
      const mapTileset = this.map.addTilesetImage(tileset.name, tilesetLevelData);
      acc[tilesetLevelData] = mapTileset;
      return acc;
    }, {});
  }

  private createLayers() {
    this.layers = this.map.layers.reduce((acc: any, layer: any) => {
      acc[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);
      if (layer.properties.collision) {
        this.map.setCollisionByExclusion([-1], true, layer.name);
      }
      return acc;
    }, {});
  }

  private createObjects() {
    this.map.objects.forEach( (objectLayer) => {
        objectLayer.objects.forEach(object => {
          const position = {
            x: object.x + (object.width / 2),
            y: object.y + (object.height / 2)
          };
          if (this.prefabClasses.hasOwnProperty(object.type)) {
              const prefab = new this.prefabClasses[object.type](this, object.name, position, object.properties);
          }
        });
    });
  }

}
