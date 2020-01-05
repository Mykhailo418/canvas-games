// constants
const ASSESTS = {
  background: 'background',
  player: 'player',
  enemy: 'enemy',
}

// Create new scene
const gameScene = new Phaser.Scene('Game');

// Load Assets
gameScene.preload = function() {
  this.load.image(ASSESTS.background, 'img/bg.jpg');
  this.load.image(ASSESTS.player, 'img/player.png');
  this.load.image(ASSESTS.enemy, 'img/monster.png');
}

// Called once after load
gameScene.create = function() {
  addBackground(this);
  addPlayer(this);
  addEnemy(this);
}

// set config
const config = {
  type: Phaser.AUTO, // Phaser will use WebGL
  width: 640,
  height: 360,
  scene: gameScene
};

// create new game
const game = new Phaser.Game(config);

function addBackground(scene) {
  const {width, height} = scene.sys.game.config; // width and height of game
  const bg = scene.add.image(0, 0, ASSESTS.background);
  //bg.setOrigin(0, 0); // change pivot point, by default it at center
  bg.setPosition(width/2, height/2);
  bg.setScale(1.5, 1.5); // increase size
}

function addPlayer(scene) {
  const player = scene.add.sprite(50, 250, ASSESTS.player)
    .setScale(0.05);
  player.depth = 1; // like z-index
}

function addEnemy(scene) {
  const enemy = scene.add.sprite(200, 250, ASSESTS.enemy);
  enemy.scaleX = 0.2;
  enemy.scaleY = 0.2;
  enemy.flipX = true;
  enemy.depth = 1;
}
