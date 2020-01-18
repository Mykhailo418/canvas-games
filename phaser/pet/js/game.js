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
    [ASSESTS.rotate]: {health: 0, fun: 15}
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
  addBackground.bind(this)();
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

function addBackground() {
  let bg = this.add.image(0, 0, ASSESTS.bg)
    .setInteractive()
    .setOrigin(0, 0);
  bg.on('pointerdown', (pointer, localX, localY) => {
    if (!globals.selcetedItem) return;
    const selectedItemKey =  globals.selcetedItem.texture.key;
    const newItem = createItem.bind(this)(selectedItemKey, localX, localY); // create new item and place it

    // change states of pet according items stats
    changePetStats(selectedItemKey);

    setUiReady();
  });
}

function addPet(scene) {
  globals.pet = scene.add.sprite(100, 200, ASSESTS.pet, 0)
    .setScale(0.5)
    .setInteractive();

  // make pet draggable
  scene.input.setDraggable(globals.pet);
}

function addButtons(scene) {
  globals.btns.apple = createItem.bind(scene)(ASSESTS.apple, 42, 580).setInteractive();
  globals.btns.candy = createItem.bind(scene)(ASSESTS.candy, 134, 580).setInteractive();
  globals.btns.toy = createItem.bind(scene)(ASSESTS.toy, 226, 580).setInteractive();
  globals.btns.rotate = createItem.bind(scene)(ASSESTS.rotate, 318, 580).setInteractive();
}

function createItem(key, x, y) {
  const item = this.add.sprite(x, y, key);
  switch (key) {
    case ASSESTS.apple: item.setScale(0.4); break;
    case ASSESTS.candy: item.setScale(0.45); break;
    case ASSESTS.toy: item.setScale(0.45); break;
    case ASSESTS.rotate: item.setScale(0.4); break;
  }
  return item;
}

function addEventsToButtons() {
  // !IMPORTANT: if not pass third argument, 'this' inside function would be the current sprite
  globals.btns.apple.on('pointerdown', pickItem);
  globals.btns.candy.on('pointerdown', pickItem);
  globals.btns.toy.on('pointerdown', pickItem);
  globals.btns.rotate.on('pointerdown', rotatePet);
}

function pickItem() {
  switch (globals.uiState) {
    case UI_STATES.blocked: return;
    case UI_STATES.selected:
      if (globals.selcetedItem === this) return setUiReady();
      else setUiReady();
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
      let rotateTween = this.scene.tweens.add({
        targets: globals.pet,
        duration: 1200,
        angle: 720,
        pause: false,
        callbackScope: this.scene, // set context for example for 'onComplete' method
        onComplete: function(tween, sprites) {
          changePetStats(ASSESTS.rotate);
          setUiReady();
        }
      });
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

function changePetStats(key) {
  Object.keys(globals.stats[key]).forEach(stat => {
    if (globals.petStats.hasOwnProperty(stat)) {
      globals.petStats[stat] += globals.stats[key][stat];
    }
  });
}
