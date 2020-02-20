export const config: Phaser.Types.Core.GameConfig = {
  width: 640,
  height: 512,
  type: Phaser.AUTO,
  parent: "game",
  render: {
    pixelArt: true,
    roundPixels: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  }
};
