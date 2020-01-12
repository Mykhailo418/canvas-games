const ASSESTS = {
  wolf: 'wolf', demon: 'demon', frog: 'frog', ghost: 'ghost', correct: 'correct', wrong: 'wrong'
}

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {

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

}
gameScene.update = function() {

}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'English Teaching',
  pixelArt: false // turn of pixel perfect, pixels would be blended
});
