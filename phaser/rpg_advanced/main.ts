import "phaser";
import { config } from './config';
import * as SCENES from './constants/scenes.const';
import { GameScene } from "./scenes/game.scene";
import { TitleScene } from "./scenes/title.scene";
import { BootScene } from "./scenes/boot.scene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add(SCENES.BOOT, BootScene);
    this.scene.add(SCENES.TITLE, TitleScene);
    this.scene.add(SCENES.GAME, GameScene);
    this.scene.start(SCENES.BOOT, {scene: SCENES.TITLE});
  }
}

window.addEventListener("load", () => {
  const game = new Game();
});
