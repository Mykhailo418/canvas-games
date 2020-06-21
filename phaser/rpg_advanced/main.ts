import "phaser";
import { config } from './config';
import { Inventory } from './prefabs/battle/inventory';
import * as SCENES from './constants/scenes.const';
import { GameScene } from "./scenes/game.scene";
import { TitleScene } from "./scenes/title.scene";
import { BootScene } from "./scenes/boot.scene";
import { LoadingScene } from "./scenes/loading.scene";
import { WorldScene } from "./scenes/world.scene";
import { BattleScene } from "./scenes/battle.scene";
import { PauseScene } from "./scenes/pause.scene";

class Game extends Phaser.Game {
  party_data: any;
  inventory: Inventory
  constructor() {
    super(config);

    this.inventory = new Inventory();

    this.scene.add(SCENES.BOOT, BootScene);
    this.scene.add(SCENES.LOADING, LoadingScene);
    this.scene.add(SCENES.TITLE, TitleScene);
    this.scene.add(SCENES.GAME, GameScene);
    this.scene.add(SCENES.WORLD, WorldScene);
    this.scene.add(SCENES.BATTLE, BattleScene);
    this.scene.add(SCENES.PAUSE, PauseScene);
    this.scene.start(SCENES.BOOT, {
      sceneName: SCENES.TITLE
    });
  }
}

window.addEventListener("load", () => {
  const game = new Game();
});
