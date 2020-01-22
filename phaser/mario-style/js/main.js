const ASSESTS = {
  ground: 'ground', platform: 'platform', block: 'block', gorilla: 'gorilla', barrel: 'barrel',
  player: 'player', fire: 'fire'
};
const globals = {};

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {}

gameScene.preload = function() {
  this.load.image(ASSESTS.ground, 'img/ground.png');
  this.load.image(ASSESTS.platform, 'img/platform.png');
  this.load.image(ASSESTS.block, 'img/block.png');
  this.load.image(ASSESTS.gorilla, 'img/gorilla3.png');
  this.load.image(ASSESTS.barrel, 'img/barrel.png');

  this.load.spritesheet(ASSESTS.player, 'img/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet(ASSESTS.fire, 'img/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });
}

gameScene.create = function() {}

gameScene.update = function() {}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Mario Style Game',
  pixelArt: false
});
