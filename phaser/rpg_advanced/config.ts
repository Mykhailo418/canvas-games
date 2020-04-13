export const config: Phaser.Types.Core.GameConfig = {
  width: 840,
  height: 560,
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
