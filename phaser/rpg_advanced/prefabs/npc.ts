import { Prefab, PrefabProperties } from "./prefab";
import * as SCENES from '../constants/scenes.const';
import { MsgBox } from './msgBox' ;

export interface NPCProperties extends PrefabProperties {
  message: string;
}

export class NPC extends Prefab {
  private body_prefab: Phaser.Physics.Arcade.Body;
  message: string;
  public MESSAGE_BOX_POISTION = {
    x: 0,
    y: 360
  };

  constructor(scene: any, name: string, position: any, properties: NPCProperties) {
    super(scene, name, position, properties);

    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;
    this.message = this.scene.cache.text.get(properties.message);

    this.body_prefab.immovable = true;

    this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
  }

  talk(npc, player) {
    player.stop();
    this.scene.current_message_box = new MsgBox(this.scene, this.name + '_message_box',
      this.MESSAGE_BOX_POISTION, {
        texture: 'message_box_image',
        group: 'hud',
        message: this.message
      });
    this.scene.userInput.set_input(this.scene.userInputs.talking_user_input);
  }

}
