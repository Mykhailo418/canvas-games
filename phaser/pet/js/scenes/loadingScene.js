window.loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
  // add preloader before loading images
  const preloader = this.add.sprite(this.sys.game.config.width/2, 250, ASSESTS.preloader);
  preloader.setScale(0.5);
  showProgressbar(this);

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

  // TESTING ONLY: TO TEST SLOW LOADING IF MANY FILES
  for(let i = 0; i < 300; i++) {
    this.load.image(`test${i}`, 'img/rotate.png');
  }
};

loadingScene.create = function() {
  this.scene.start('Home');
}

function showProgressbar(scene) {
  const {width, height} = scene.sys.game.config;
  const barWidth = 150;
  const barHeight = 30;
  const backgroundBar = scene.add.graphics();
  backgroundBar.setPosition(width/2 - barWidth/2, height/2 - barHeight/2);
  backgroundBar.fillStyle(0xF5F5F5, 1);
  backgroundBar.fillRect(0, 0, barWidth, barHeight);

  const progressBar = scene.add.graphics();
  progressBar.setPosition(width/2 - barWidth/2, height/2 - barHeight/2);

  // listen to the 'progress' event
  scene.load.on('progress', valuePercentage => {
    progressBar.clear(); //clearing progress so we can draw it again
    progressBar.fillStyle(0x9AD98D, 1);
    progressBar.fillRect(0, 0, valuePercentage * barWidth, barHeight);
  });
}
