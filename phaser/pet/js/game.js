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
  globals.stats = {
    [ASSESTS.apple]: {health: 20, fun: 0},
    [ASSESTS.candy]: {health: -10, fun: 10},
    [ASSESTS.toy]: {health: 0, fun: 20},
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

  addPet(this);
  // follow pointer(mouse) when draging
  scene.input.on('drag', (pointer, gameObject, drawX, drawY) => {
    gameObject.x = drawX;
    gameObject.y = drawY;
  });

  addButtons(this);
  addEventsToButtons();
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

function addPet(scene) {
  globals.pet = scene.add.sprite(100, 200, ASSESTS.pet, 0)
    .setOrigin(0)
    .setScale(0.5)
    .setInteractive();

  // make pet draggable
  scene.input.setDraggable(globals.pet);
}

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

function addEventsToButtons() {
  // !IMPORTANT: if not pass third argument, this inside function would be the current sprite
  globals.appleBtn.on('pointerdown', pickItem);
  globals.candyBtn.on('pointerdown', pickItem);
  globals.toyBtn.on('pointerdown', pickItem);
  globals.rotateBtn.on('pointerdown', rotatePet);
}

function pickItem() {

}

function rotatePet() {

}
