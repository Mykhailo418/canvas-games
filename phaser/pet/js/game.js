const ASSESTS = {
  toy: 'toy', apple: 'apple', bg: 'background', candy: 'candy', rotate: 'rotate', pet: 'pet'
};
const UI_STATES = {
  ready: 'ready', selected: 'selected', blocked: 'blocked'
};
const ANIMS = {
  eat: 'eat'
};
const statsDecayKey = 'statsDecay';
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
    [ASSESTS.rotate]: {health: 0, fun: 15},
    [statsDecayKey]: {health: -5, fun: -2}
  };
  globals.uiState = UI_STATES.ready;
  globals.selcetedItem = null;
  globals.texts = {};
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
    if (globals.uiState === UI_STATES.blocked) return;
    gameObject.x = drawX;
    gameObject.y = drawY;
  });

  addButtons(this);
  addEventsToButtons();
  showStatsText(this);
  updateStatsText();
  decreasePetStatsOverTime(this);
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
  bg.on('pointerdown', placeItem.bind(this));
}

function addPet(scene) {
  globals.pet = scene.add.sprite(100, 200, ASSESTS.pet, 0)
    .setScale(0.5)
    .setInteractive();

  // make pet draggable
  scene.input.setDraggable(globals.pet);

  // create animation to eat items
  scene.anims.create({
    key: ANIMS.eat,
    frames: scene.anims.generateFrameNames(ASSESTS.pet, {frames: [1, 2, 3]}),
    frameRet: 7,
    yoyo: true,
    repeat: 0, //to repeat forever: -1
  });
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
        paused: false,
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
  let isGameOver = false;
  Object.keys(globals.stats[key]).forEach(stat => {
    if (globals.petStats.hasOwnProperty(stat)) {
      globals.petStats[stat] += globals.stats[key][stat];
      if (globals.petStats[stat] <= 0) {
        globals.petStats[stat] = 0;
        isGameOver = true;
      }
    }
  });
  updateStatsText();
  if (isGameOver) {
    gameOver();
  }
}

function placeItem(pointer, localX, localY) {
  if (!globals.selcetedItem || globals.uiState !== UI_STATES.selected) return;
  const selectedItemKey =  globals.selcetedItem.texture.key;
  const newItem = createItem.bind(this)(selectedItemKey, localX, localY); // create new item and place it

  movePet.bind(this)(newItem, selectedItemKey);
}

function movePet(item, key) {
  globals.uiState = UI_STATES.blocked;
  let petMovementTween = this.tweens.add({
    targets: globals.pet,
    duration: 600,
    x: item.x,
    y: item.y,
    paused: false,
    onComplete: (tween, sprites) => {
      item.destroy();
      globals.pet.play(ANIMS.eat);
      globals.pet.once('animationcomplete', () => {
        globals.pet.setFrame(0);
        changePetStats(key); // change states of pet according items stats
        setUiReady();
      });
    }
  });
}

function showStatsText(scene) {
  globals.texts.health = scene.add.text(20, 20, 'Health: ', {
    font: '20px Arial',
    fill: '#ffffff'
  });
  globals.texts.fun = scene.add.text(150, 20, 'Fun: ', {
    font: '20px Arial',
    fill: '#ffffff'
  })
}

function updateStatsText() {
  globals.texts.health.setText(`Health: ${globals.petStats.health}`);
  globals.texts.fun.setText(`Fun: ${globals.petStats.fun}`);
}

function decreasePetStatsOverTime(scene) {
  globals.timedEventStats = scene.time.addEvent({
    delay: 1000,
    repeat: -1, // will reapet forever
    callback: () => {
      changePetStats(statsDecayKey);
      console.log('decay');
    }
  });
}

function gameOver() {

}
