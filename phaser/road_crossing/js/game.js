// Create new scene
const gameScene = new Phaser.Scene('Game');

// set config
const config = {
  type: Phaser.AUTO, // Phaser will use WebGL
  width: 640,
  height: 360,
  scene: gameScene
};

// create new game
const game = new Phaser.Game(config);
