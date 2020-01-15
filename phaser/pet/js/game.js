const ASSESTS = {
  toy: 'toy', apple: 'apple', bg: 'background', candy: 'candy', rotate: 'rotate', pet: 'pet'
};
const globals = {};

const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  globals.state = {
    health: 100,
    fun: 100
  }
};

gameScene.preload = function() {
  this.load.image(ASSESTS.bg, 'img/background.jpg');
  this.load.image(ASSESTS.toy, 'img/toy.png');
  this.load.image(ASSESTS.apple, 'img/apple.png');
  this.load.image(ASSESTS.candy, 'img/candy.png');
  this.load.image(ASSESTS.rotate, 'img/rotate.png');

  this.load.spritesheet(ASSESTS.pet, 'img/pet.png', {
    frameWidth: 273,
    frameHeight: 200,
    spacing: 1
  });
};

gameScene.create = function() {
  this.add.image(0, 0, ASSESTS.bg).setOrigin(0, 0);

  globals.pet = this.add.sprite(100, 200, ASSESTS.pet, 0)
    .setOrigin(0)
    .setScale(0.5);

  addButtons(this);
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

function addButtons(scene) {
  globals.appleBtn = scene.add.sprite(42, 580, ASSESTS.apple)
    .setScale(0.4)
    .setInteractive();
  globals.candyBtn = scene.add.sprite(134, 580, ASSESTS.candy)
    .setScale(0.45)
    .setInteractive();
  globals.toyBtn = scene.add.sprite(226, 580, ASSESTS.toy)
    .setScale(0.45)
    .setInteractive();
  globals.rotateBtn = scene.add.sprite(318, 580, ASSESTS.rotate)
    .setScale(0.4)
  . setInteractive();
}
