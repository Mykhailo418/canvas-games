import "phaser";
import { config } from './config/config';
import * as SCENES from './constants/scenes.const';
import { GameScene } from "./scenes/game.scene";
import { BootScene } from "./scenes/boot.scene";
import { PreloadScene } from "./scenes/preload.scene";
import { TitleScene } from "./scenes/title.scene";
import { UiScene } from "./scenes/ui.scene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add(SCENES.GAME, GameScene);
    this.scene.add(SCENES.BOOT, BootScene);
    this.scene.add(SCENES.PRELOAD, PreloadScene);
    this.scene.add(SCENES.TITLE, TitleScene);
    this.scene.add(SCENES.UI, UiScene);

    this.scene.start(SCENES.BOOT);
  }
}

window.addEventListener("load", () => {
  const game = new Game();
});
