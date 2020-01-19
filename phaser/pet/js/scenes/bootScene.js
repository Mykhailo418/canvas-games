window.bootScene = new Phaser.Scene('Boot');

bootScene.preload = function() {
  this.load.image(ASSESTS.preloader, 'img/preloader.gif'); // not supported gif animation :(
}

bootScene.create =  function() {
  this.scene.start('Loading');
}
