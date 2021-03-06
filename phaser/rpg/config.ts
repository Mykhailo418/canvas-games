import "phaser";
import { GameScene } from "./scenes/gameScene";
import { BootScene } from "./scenes/bootScene";
import { UIScene } from "./scenes/uiScene";

export const config: Phaser.Types.Core.GameConfig = {
  width: window.innerWidth,
  height:  window.innerHeight,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene, UIScene],
  render: {
    pixelArt: true, // we are going to use pixels
    roundPixels: true // make pixels looks nice
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  }
};
