const ASSESTS = {
  toy: 'toy', apple: 'apple', bg: 'background', candy: 'candy', rotate: 'rotate'
}

const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {

};

gameScene.preload = function() {
  this.load.image(ASSESTS.bg, 'img/background.jpg');
  this.load.image(ASSESTS.toy, 'img/toy.png');
  this.load.image(ASSESTS.apple, 'img/apple.png');
  this.load.image(ASSESTS.candy, 'img/candy.png');
  this.load.image(ASSESTS.rotate, 'img/rotate.png');
};

gameScene.create = function() {
  this.add.image(0, 0, ASSESTS.bg).setOrigin(0, 0);
};

gameScene.update = function() {

};

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
});
