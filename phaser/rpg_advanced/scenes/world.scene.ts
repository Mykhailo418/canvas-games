import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import { Player } from '../prefabs/player';
import { Door } from '../prefabs/door';
import { NPC } from '../prefabs/npc';
import { MsgBox } from '../prefabs/msgBox';
import { EnemySpawner } from '../prefabs/index';

export class WorldScene extends JSONLevelScene {
  private map: Phaser.Tilemaps.Tilemap;
  private tilesets: any;
  private layers: any;

  public TEXT_STYLE = {
    font: '14px Kells',
    fill: '#ffffff'
  };
  current_message_box: MsgBox;

  constructor() {
    super(SCENES.WORLD);
    this.prefabClasses = {
      player: Player.prototype.constructor,
      door: Door.prototype.constructor,
      npc: NPC.prototype.constructor,
      enemy_spawner: EnemySpawner.prototype.constructor
    };
  }

  preload() {
    for (let npc_msg_name in this.levelData.npc_messages) {
      this.load.text(npc_msg_name, this.levelData.npc_messages[npc_msg_name]);
    }
    for (let enemy_encounter_name in this.levelData.enemy_encounters) {
        this.load.json(enemy_encounter_name, this.levelData.enemy_encounters[enemy_encounter_name]);
    }
  }

  create() {
    this.map = this.add.tilemap(this.levelData.map.key);

    this.createTilesets();
    this.createLayers();

    super.create();

    this.createObjects();
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

  end_talk() {
    this.current_message_box.destroy();
    this.userInput.set_input(this.userInputs.town_user_input);
  }
}
