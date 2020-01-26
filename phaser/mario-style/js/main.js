const ASSESTS = {
  ground: 'ground', platform: 'platform', block: 'block', gorilla: 'gorilla', barrel: 'barrel',
  player: 'player', fire: 'fire'
};
const ANIMS = {walking: 'walking', burning: 'burning'};
let moveSpeed, jumpSpeed, levelData;
const gl = {}; // globals

const gameScene = new Phaser.Scene('Game');

gameScene.init =  function() {
  moveSpeed = 150;
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

  this.load.json('levelData', 'json/levelData.json')
}

gameScene.create = function() {
  levelData = this.cache.json.get('levelData');

  createFireAnumation(this);
  createWalkingPlayerAnimation(this);

  createStaticSprites(this);
  createDynamicSprites(this);

  // set worlds size
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 700;

  addPlayer(this);
  addGorilla(this);

  // set camera set bounds
  this.cameras.main.setBounds(0, 0, 360, 700);
  this.cameras.main.startFollow(gl.player);

  // colision detection
  this.physics.add.collider([gl.player, gl.gorilla], gl.staticGroup);

  // overlap checks
  this.physics.add.overlap(gl.player, [gl.dynamicsGroup, gl.gorilla], restartGame, null, this);

  gl.cursorKeys = this.input.keyboard.createCursorKeys(); // enable cursor keys
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
  gl.staticGroup = scene.physics.add.staticGroup();

  // add sprite to physics system
  const ground = scene.add.sprite(180, 604, ASSESTS.ground);
  scene.physics.add.existing(ground, true);

  // create sprite and adding sprite to the physics
  /* -- second type to add sprite to physics
  gl.ground = scene.physics.add.sprite(180, 400, ASSESTS.ground, true);
  gl.ground.body.allowGravity = false; // disable gravity for this sprite
  gl.ground.body.immovable = false; // make it immovable
  */
  gl.staticGroup.add(ground);

  // setup platforms
  const platformsData = levelData.platforms;
  const platformWidth = scene.textures.get(ASSESTS.block).get(0).width; // get(0) - is gerring a frame of 0 index
  const platformHeight = scene.textures.get(ASSESTS.block).get(0).height;
  platformsData.forEach(data => {
     // sprite that consists of repeated image
    const platform = scene.add.tileSprite(data.x, data.y, platformWidth * data.numTiles, platformHeight, ASSESTS.block);
    platform.setOrigin(0);
    scene.physics.add.existing(platform, true);
    gl.staticGroup.add(platform);
  });
}

function createDynamicSprites(scene) {
  gl.dynamicsGroup = scene.physics.add.group({
    allowGravity: false,
    immovable: true
  });

  levelData.fires.forEach(data => {
    const fire = scene.add.sprite(data.x, data.y, ASSESTS.fire).setOrigin(0);
    scene.physics.add.existing(fire);
    fire.anims.play(ANIMS.burning);
    gl.dynamicsGroup.add(fire);
  });
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
  if (scene.anims.get(ANIMS.walking)) return;

  scene.anims.create({
    key: ANIMS.walking,
    frames: scene.anims.generateFrameNames(ASSESTS.player, {
      frames: [0, 1, 2]
    }),
    frameRate: 12,
    yoyo: true,
    repeat: -1
  });
}

function createFireAnumation(scene) {
  if (scene.anims.get(ANIMS.burning)) return;

  scene.anims.create({
    key: ANIMS.burning,
    frames: scene.anims.generateFrameNames(ASSESTS.fire, {
      frames: [0, 1]
    }),
    frameRate: 4,
    repeat: -1,
  });
}

function isPlayerOnGround() {
  return gl.player.body.blocked.down || gl.player.body.touching.down;
}

function addPlayer(scene) {
  gl.player = scene.add.sprite(levelData.player.x, levelData.player.y, ASSESTS.player, 3);
  scene.physics.add.existing(gl.player);
  gl.player.body.setCollideWorldBounds(true); // restrict to player go to the game bounds

  // FOR DEBUG:
  /*gl.player.setInteractive();
  scene.input.setDraggable(gl.player)
  scene.input.on('drag', (pointer, gameObject, drawX, drawY) => {
    gameObject.x = drawX;
    gameObject.y = drawY;
    console.log(drawX, drawY);
  });*/
}

function addGorilla(scene) {
  gl.gorilla = scene.add.sprite(levelData.gorilla.x, levelData.gorilla.y, ASSESTS.gorilla);
  scene.physics.add.existing(gl.gorilla);
}

function restartGame(sourceSprite, targetSprite) {
  this.cameras.main.fade(500);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.restart();
  });
}
