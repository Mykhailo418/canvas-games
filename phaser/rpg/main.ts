import "phaser";
import { GameScene } from "./scenes/gameScene";
import { config } from './config';

window.addEventListener("load", () => {
  const game = new Phaser.Game(config);
});
