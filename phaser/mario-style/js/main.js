const ASSESTS = {
  ground: 'ground', platform: 'platform', block: 'block', gorilla: 'gorilla', barrel: 'barrel',
  player: 'player', fire: 'fire'
};
const ANIMS = {walking: 'walking'}
let moveSpeed, jumpSpeed;
const gl = {}; // globals

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {
  moveSpeed = 100;
  jumpSpeed = -600;
}

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
  createStaticSprites(this);

  // set worlds size
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 700;

  // player
  gl.player = this.add.sprite(100, 400, ASSESTS.player, 3);
  this.physics.add.existing(gl.player);
  gl.player.body.setCollideWorldBounds(true); // restrict to player go to the game bounds

  // colision detection
  this.physics.add.collider(gl.player, gl.staticGroup);

  gl.cursorKeys = this.input.keyboard.createCursorKeys(); // enable cursor keys

  createWalkingPlayerAnimation(this);
}

gameScene.update = function() {
  playerControl(this);
}

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

function createStaticSprites(scene) {
  // creating statis groups
  gl.staticGroup = scene.add.group();

  // add sprite to physics system
  const ground = scene.add.sprite(180, 604, ASSESTS.ground);
  scene.physics.add.existing(ground, true);

  // create sprite and adding sprite to the physics
  /* -- second type to add sprite to physics
  gl.ground = scene.physics.add.sprite(180, 400, ASSESTS.ground, true);
  gl.ground.body.allowGravity = false; // disable gravity for this sprite
  gl.ground.body.immovable = false; // make it immovable
  */

  const platform = scene.add.tileSprite(100, 500, 36 * 4, 30, ASSESTS.block); // sprite that consists of repeated image
  scene.physics.add.existing(platform, true);

  gl.staticGroup.add(ground);
  gl.staticGroup.add(platform);
}

function playerControl(scene) {
  const onGround = isPlayerOnGround();
  // walking
  if (gl.cursorKeys.left.isDown) {
    gl.player.body.setVelocityX(moveSpeed*-1);
    gl.player.flipX = false;
    if (onGround && !gl.player.anims.isPlaying) {
      gl.player.anims.play(ANIMS.walking);
    }
  } else if (gl.cursorKeys.right.isDown) {
    gl.player.body.setVelocityX(moveSpeed);
    gl.player.flipX = true;
    if (onGround && !gl.player.anims.isPlaying) {
      gl.player.anims.play(ANIMS.walking);
    }
  } else {
    gl.player.body.setVelocityX(0);
    if (gl.player.anims.isPlaying) {
      gl.player.anims.stop(ANIMS.walking);
    }
    if (onGround) {
      gl.player.setFrame(3);
    }
  }

  // jumping
  if (onGround && (gl.cursorKeys.space.isDown || gl.cursorKeys.up.isDown)) {
    gl.player.body.setVelocityY(jumpSpeed);
    gl.player.anims.stop(ANIMS.walking);
    gl.player.setFrame(2);
  }
}

function createWalkingPlayerAnimation(scene) {
  scene.anims.create({
    key: ANIMS.walking,
    frames: scene.anims.generateFrameNames(ASSESTS.player, {
      frames: [0, 1, 2],
      frameRate: 12,
      yoyo: true,
      repeat: -1
    })
  });
}

function isPlayerOnGround() {
  return gl.player.body.blocked.down || gl.player.body.touching.down;
}
