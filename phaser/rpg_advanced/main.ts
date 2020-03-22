import "phaser";
import { config } from './config';
import * as SCENES from './constants/scenes.const';
import { GameScene } from "./scenes/game.scene";
import { TitleScene } from "./scenes/title.scene";
import { BootScene } from "./scenes/boot.scene";
import { LoadingScene } from "./scenes/loading.scene";
import { WorldScene } from "./scenes/world.scene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add(SCENES.BOOT, BootScene);
    this.scene.add(SCENES.LOADING, LoadingScene);
    this.scene.add(SCENES.TITLE, TitleScene);
    this.scene.add(SCENES.GAME, GameScene);
    this.scene.add(SCENES.WORLD, WorldScene);
    this.scene.start(SCENES.BOOT, {
      sceneName: SCENES.TITLE
    });
  }
}

window.addEventListener("load", () => {
  const game = new Game();
});
