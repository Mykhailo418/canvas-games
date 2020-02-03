import "phaser";
import { GameScene } from "./scenes/gameScene";
import { config } from './config';

window.addEventListener("load", () => {
  const game = new Phaser.Game(config);

  window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  });
});
