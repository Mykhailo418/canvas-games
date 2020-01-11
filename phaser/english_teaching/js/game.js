const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {

}
gameScene.preload = function() {

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
