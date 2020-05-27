import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import { Prefab, Unit, MenuItem, Menu, PhysicalAttackMenuItem, EnemyMenuItem, EnemyUnit, PlayerUnit,
  RunMenuItem, MagicalAttackMenuItem } from '../prefabs/index'
import PriorityQueue from '../plugins/PriorityQueue';

export class BattleScene extends JSONLevelScene {
  rnd: any;
  previous_level: any;
  encounter: any;
  units: PriorityQueue;
  current_unit: any;
  experience_table: any;

  constructor() {
    super(SCENES.BATTLE);
    this.prefabClasses = {
      background: Prefab.prototype.constructor,
      player_unit: PlayerUnit.prototype.constructor,
      enemy_unit: EnemyUnit.prototype.constructor,
      menu_item: MenuItem.prototype.constructor,
      physical_attack_menu_item: PhysicalAttackMenuItem.prototype.constructor,
      magical_attack_menu_item: MagicalAttackMenuItem.prototype.constructor,
      run_menu_item: RunMenuItem.prototype.constructor,
      enemy_menu_item: EnemyMenuItem.prototype.constructor,
      inventory_menu_item: MenuItem.prototype.constructor,
      menu: Menu.prototype.constructor,
    };

    this.rnd = new Phaser.Math.RandomDataGenerator();
  }

  init(data) {
      super.init(data);

      this.previous_level = data.extra_parameters.previous_level;
      this.encounter = data.extra_parameters.encounter;
  }

  preload() {
    this.load.json('experience_table', 'assets/levels/experience_table.json');
  }

  create() {
    super.create();

    this.experience_table = this.cache.json.get('experience_table');

    for (let enemy_unit_name in this.encounter.enemy_data) {
        this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
    }

    this.units = new PriorityQueue({
      comparator: (unit_a, unit_b) => unit_a.act_turn > unit_b.act_turn
    });

    this.groups.player_units.children.each(unit => {
      unit.calculate_act_turn(0);
      this.units.addElement(unit);
    });

    this.groups.enemy_units.children.each(unit => {
      unit.calculate_act_turn(0);
      this.units.addElement(unit);
    });

    this.next_turn();

    //this.sprites.warrior.act();
  }

  next_turn() {
    if (this.groups.enemy_units.countActive() === 0) {
      this.end_battle();
      return;
    }

    if (this.groups.player_units.countActive() === 0) {
      this.game_over();
      return;
    }

    this.current_unit = this.units.getHighestAndRemove();
    if (!this.current_unit) return;
    if (this.current_unit.active) {
      this.current_unit.act();
      this.current_unit.calculate_act_turn(this.current_unit.act_turn);
      this.units.addElement(this.current_unit);
    } else {
      this.next_turn();
    }
  }

  back_to_world() {
    this.scene.start(SCENES.BOOT, {sceneName: SCENES.TOWN});
  }

  game_over() {
    this.scene.start(SCENES.BOOT, {sceneName: SCENES.TITLE});
  }

  end_battle() {
    let experience = this.encounter.reward.experience;

    this.groups.player_units.chilren.each(player_unit => {
      player_unit.receive_experience(experience / this.groups.player_units.size);
    });

    this.back_to_world();
  }
}
