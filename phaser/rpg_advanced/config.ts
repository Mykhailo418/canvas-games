export const config: Phaser.Types.Core.GameConfig = {
  width: 640,
  height: 480,
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  }
};
