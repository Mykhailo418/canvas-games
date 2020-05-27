import { Prefab, PrefabProperties } from "../prefab";
import * as SCENES from '../../constants/scenes.const';

export interface UnitProperties extends PrefabProperties {
  stats: any;
  animations: any;
  target_units: any;
}

export class Unit extends Prefab {
  protected body_prefab: Phaser.Physics.Arcade.Body;
  stats: any;
  target_units: any;
  timed_event: any;
  act_turn: number;
  animsKeys = [
    {name: 'idle', repeat: -1},
    {name: 'attack1', repeat: 1},
    {name: 'attack2', repeat: 1},
    {name: 'hit', repeat: 1},
  ];

  constructor(scene: any, name: string, position: any, properties: UnitProperties) {
    super(scene, name, position, properties);

    this.body_prefab = <Phaser.Physics.Arcade.Body>this.body;

    this.createAnimations(name, properties);
    this.on('animationcomplete', this.back_to_idle.bind(this));
    this.anims.play(`${name}_idle`);

    this.stats = properties.stats;
    //this.target_units = properties.target_units;
  }

  // act() {
  //   const target = this.choose_target();
  //
  //   const attack_coefficient = this.scene.rnd.realInRange(0.8, 1.2);
  //   const defense_coefficient = this.scene.rnd.realInRange(0.8, 1.2);
  //
  //   const attack = attack_coefficient * this.stats.attack;
  //   const defense = defense_coefficient * this.stats.defense;
  //
  //   let damage = Math.max(0, Math.round(attack - defense));
  //   console.log(damage, target);
  //   target.receive_damage(damage);
  //
  //   this.anims.play(`${this.name}_attack1`);
  // }
  //
  // choose_target() {
  //   let target;
  //   let activeTargetUnits = this.scene.groups[this.target_units].countActive();
  //   let targetIndex = this.scene.rnd.between(0, activeTargetUnits - 1);
  //   let active_player_unit_index = 0;
  //   this.scene.groups[this.target_units].children.each(unit => {
  //     if (unit.active) {
  //       if (active_player_unit_index === targetIndex) {
  //         target = unit;
  //       }
  //       active_player_unit_index ++;
  //     }
  //   });
  //   return target;
  // }

  back_to_idle(animation: any) {
    this.anims.play(`${this.name}_idle`);
    if (animation.key === `${this.name}_attack1` || animation.key === `${this.name}_attack2`) {
      this.scene.next_turn();
    }
  }

  createAnimations(name: string, properties: any) {
    this.animsKeys.forEach(key => {
      const animKey = `${name}_${key.name}`;
      if (!this.scene.anims.anims.has(animKey)) {
        this.scene.anims.create({
          key: animKey,
          frames: this.scene.anims.generateFrameNumbers(this.texture.key,
            {frames: properties.animations[key.name].frames}),
          framerate: properties.animations[key.name].fps,
          repeat: key.repeat
        });
      }
    });
  }

  receive_damage(damage: number) {
    this.stats.health -= damage;
    this.anims.play(`${this.name}_hit`);

    if (this.stats.health <= 0) {
      this.stats.health = 0;
      this.destroy();
    }

    this.show_damage_text(damage);
  }

  show_damage_text(damage: number) {
    let damage_text = this.scene.add.text(this.x, this.y - 50, ''+damage, {
      font: 'bold 24px Kells',
      fill: '#ff0000'
    }, this.scene.groups.hud);

    this.timed_event = this.scene.time.addEvent({
      delay: 1000,
      callback: damage_text.destroy,
      callbackScope: damage_text
    });
  }

  calculate_act_turn (current_turn) {
      this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
  }
}
