import "phaser";
import { GameScene } from "./scenes/gameScene";
import { BootScene } from "./scenes/bootScene";

export const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
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
