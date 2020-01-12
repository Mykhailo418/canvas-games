const ASSESTS = {
  wolf: 'wolf', demon: 'demon', frog: 'frog', ghost: 'ghost', correct: 'correct', wrong: 'wrong'
};
const globals = {};

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {
  globals.words = {
    [ASSESTS.wolf]: 'Wolf',
    [ASSESTS.demon]: 'Demon',
    [ASSESTS.frog]: 'Frog',
    [ASSESTS.ghost]: 'Ghost',
  };
  globals.sounds = {};
}
gameScene.preload = function() {
  this.load.image(ASSESTS.wolf, 'img/wolf.png');
  this.load.image(ASSESTS.demon, 'img/demon.png');
  this.load.image(ASSESTS.frog, 'img/frog.png');
  this.load.image(ASSESTS.ghost, 'img/ghost.png');

  this.load.audio(ASSESTS.ghost, 'audio/ghost.mp3');
  this.load.audio(ASSESTS.demon, 'audio/demon.mp3');
  this.load.audio(ASSESTS.wolf, 'audio/wolf.mp3');
  this.load.audio(ASSESTS.frog, 'audio/frog.mp3');
  this.load.audio(ASSESTS.correct, 'audio/correct.mp3');
  this.load.audio(ASSESTS.wrong, 'audio/wrong.mp3');
}
gameScene.create = function() {
  globals.items = this.add.group([
    {
      key: ASSESTS.wolf,
      setXY: {x: 320, y: 100},
      setScale: {x: 0.3, y: 0.3},
      alpha: 0.7
    },
    {
      key: ASSESTS.demon,
      setXY: {x: 320, y: 250},
      setScale: {x: 0.25, y: 0.25}
    },
    {
      key: ASSESTS.frog,
      setXY: {x: 520, y: 250},
      setScale: {x: 0.25, y: 0.25}
    },
    {
      key: ASSESTS.ghost,
      setXY: {x: 520, y: 100},
      setScale: {x: 0.3, y: 0.3}
    }
  ]);
  globals.items.setDepth(1);

  Phaser.Actions.Call(globals.items.getChildren(), function(item) {

    makeItemInteractive(item, this);

    // setup sound for each word
    globals.sounds[item.texture.key] = this.sound.add(item.texture.key);
  }, this);

  globals.sounds[ASSESTS.correct] = this.sound.add(ASSESTS.correct);
  globals.sounds[ASSESTS.wrong] = this.sound.add(ASSESTS.wrong);

  // create text Object
  displayText(this);

  showNextWord(this);
}
gameScene.update = function() {}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'English Teaching',
  pixelArt: false // turn of pixel perfect, pixels would be blended
});

function makeItemInteractive(item, scene) {
  // create tweens
  const resizeTween = createResizeTween(scene, item);
  const transparencyTween = createTransparencyTween(scene, item);

  // make items interactive
  item.setInteractive();

  item.on('pointerdown', pointer => {
    if (processAnswer(item)) {
      resizeTween.play();
      showNextWord(scene);
    }
  });
  item.on('pointerover', pointer => {
    transparencyTween.play();
  });
  item.on('pointerout', pointer => {
    transparencyTween.stop();
    item.alpha = 1;
  });
}

function createResizeTween(scene, item) {
  return scene.tweens.add({
    targets: item,
    scaleX: 0.5,
    scaleY: 0.5,
    duration: 300,
    paused: true, // pause at the beggining so it will not start anumation
    yoyo: true, // will comback to initial state,
    ease: 'Quad.easeInOut'
  });
}

function createTransparencyTween(scene, item) {
  return scene.tweens.add({
    targets: item,
    alpha: 0.7,
    duration: 200,
    paused: true,
  });
}

function showNextWord(scene) {
  // select a random word
  globals.currentWord = Phaser.Math.RND.pick(Object.keys(globals.words));

  // set text
  globals.wordText.setText(globals.words[globals.currentWord]);
}

function displayText(scene) {
  globals.wordText = scene.add.text(30, 20, '', {
    fontSize: '28px',
    color: '#fff',
    cursor: 'pointer'
  });
  globals.wordText.setInteractive();
  globals.wordText.on('pointerdown', pointer => {
    globals.sounds[globals.currentWord].play();
  });
}

function processAnswer(item) {
  if (item.texture.key === globals.currentWord) {
    playCorrectSound();
    return true;
  } else {
    playWrongSound();
    return false;
  }
}

function playCorrectSound() {
  globals.sounds[ASSESTS.correct].play();
}

function playWrongSound() {
  globals.sounds[ASSESTS.wrong].play();
}
