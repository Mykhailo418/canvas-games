const ASSESTS = {
  ground: 'ground', platform: 'platform', block: 'block', gorilla: 'gorilla', barrel: 'barrel',
  player: 'player', fire: 'fire'
};
const gl = {}; // globals

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {}

gameScene.preload = function() {
  this.load.image(ASSESTS.ground, 'img/ground.png');
  this.load.image(ASSESTS.platform, 'img/platform.png');
  this.load.image(ASSESTS.block, 'img/block.png');
  this.load.image(ASSESTS.gorilla, 'img/gorilla3.png');
  this.load.image(ASSESTS.barrel, 'img/barrel.png');

  this.load.spritesheet(ASSESTS.player, 'img/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet(ASSESTS.fire, 'img/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });
}

gameScene.create = function() {
  // creating statis groups
  gl.staticGroup = this.add.group();

  // add sprite to physics system
  gl.ground = this.add.sprite(180, 604, ASSESTS.ground);
  this.physics.add.existing(gl.ground, true);

  // create sprite and adding sprite to the physics
  /* -- second type to add sprite to physics
  gl.ground = this.physics.add.sprite(180, 400, ASSESTS.ground, true);
  gl.ground.body.allowGravity = false; // disable gravity for this sprite
  gl.ground.body.immovable = false; // make it immovable
  */

  gl.platform = this.add.tileSprite(100, 500, 36 * 4, 30, ASSESTS.block); // sprite that consists of repeated image
  this.physics.add.existing(gl.platform, true);

  gl.staticGroup.add(gl.ground);
  gl.staticGroup.add(gl.platform);

  gl.player = this.add.sprite(100, 400, ASSESTS.player, 3);
  this.physics.add.existing(gl.player);

  // colision detection
  this.physics.add.collider(gl.player, gl.staticGroup);
}

gameScene.update = function() {}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Mario Style Game',
  pixelArt: false,
  physics: { // turn on physics engine
    default: 'arcade',
    arcade: {
      gravity: {y: 1000}, // diraction and strength of gravity
      debug: true
    }
  }
});
