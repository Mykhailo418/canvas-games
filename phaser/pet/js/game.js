const ASSESTS = {
  toy: 'toy', apple: 'apple', bg: 'background', candy: 'candy', rotate: 'rotate', pet: 'pet'
};
const UI_STATES = {
  ready: 'ready', selected: 'selected', blocked: 'blocked'
};
const globals = {};

const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  globals.btns = {};
  globals.petStats = {
    health: 100,
    fun: 100
  };
  globals.stats = {
    [ASSESTS.apple]: {health: 20, fun: 0},
    [ASSESTS.candy]: {health: -10, fun: 10},
    [ASSESTS.toy]: {health: 0, fun: 20},
  };
  globals.uiState = UI_STATES.ready;
  globals.selcetedItem = null;
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
  this.input.on('drag', (pointer, gameObject, drawX, drawY) => {
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
  globals.btns.apple = scene.add.sprite(42, 580, ASSESTS.apple)
    .setScale(0.4)
    .setInteractive();
  globals.btns.candy = scene.add.sprite(134, 580, ASSESTS.candy)
    .setScale(0.45)
    .setInteractive();
  globals.btns.toy = scene.add.sprite(226, 580, ASSESTS.toy)
    .setScale(0.45)
    .setInteractive();
  globals.btns.rotate = scene.add.sprite(318, 580, ASSESTS.rotate)
    .setScale(0.4)
  . setInteractive();
}

function addEventsToButtons() {
  // !IMPORTANT: if not pass third argument, this inside function would be the current sprite
  globals.btns.apple.on('pointerdown', pickItem);
  globals.btns.candy.on('pointerdown', pickItem);
  globals.btns.toy.on('pointerdown', pickItem);
  globals.btns.rotate.on('pointerdown', rotatePet);
}

function pickItem() {
  switch (globals.uiState) {
    case UI_STATES.blocked: return;
    case UI_STATES.selected: setUiReady();
    case UI_STATES.ready:
      globals.uiState = UI_STATES.selected;
      globals.selcetedItem = this;
      this.alpha = 0.5;
      break;
  }
}

function rotatePet() {
  switch (globals.uiState) {
    case UI_STATES.blocked: return;
    case UI_STATES.selected: setUiReady();
    case UI_STATES.ready:
      globals.uiState = UI_STATES.blocked;
      this.alpha = 0.5;
      setTimeout(() => setUiReady(), 5000);
      break;
  }
}

function setUiReady() {
  globals.uiState = UI_STATES.ready;
  globals.selcetedItem = null;
  Object.keys(globals.btns).forEach(btnKey => {
    globals.btns[btnKey].alpha = 1;
  });
}
