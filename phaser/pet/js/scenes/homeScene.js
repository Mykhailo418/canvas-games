window.homeScene = new Phaser.Scene('Home');

homeScene.create = function() {
  let bg = this.add.image(0, 0, ASSESTS.bg)
    .setInteractive()
    .setOrigin(0, 0);

  // welcome text
  let {width, height} = this.sys.game.config;
  let text = this.add.text(width/2, height/2, 'Virtual Pet', {
    font: '40px Arial',
    fill: '#ffffff'
  });
  text.setOrigin(0.5);
  text.depth = 1;

  // text background
  let textBg = this.add.graphics();
  textBg.fillStyle(0x000000, 0.5);
  textBg.fillRect(text.x - text.width/2 - 5, text.y - text.height/2, text.width + 10, text.height);

  bg.once('pointerdown', () => {
    this.scene.start('Game');
  });
};
