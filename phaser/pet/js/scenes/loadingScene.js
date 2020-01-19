window.loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
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

loadingScene.create = function() {
  this.scene.start('Home');
}
