// constants
const ASSESTS = {
  background: 'background',
  player: 'player',
  enemy: 'enemy',
  gold: 'gold',
}
const ENEMY_SPEED_MAX = 5;
const ENEMY_SPEED_MIN = 1;
const ENEMY_MAX_Y = 250;
const ENEMY_MIN_Y = 80;


// Create new scene
const gameScene = new Phaser.Scene('Game');

// Initial Params
gameScene.init =  function() {
  this.playerSpeed = 3;
}

// Load Assets
gameScene.preload = function() {
  this.load.image(ASSESTS.background, 'img/bg.jpg');
  this.load.image(ASSESTS.player, 'img/player.png');
  this.load.image(ASSESTS.enemy, 'img/monster.png');
  this.load.image(ASSESTS.gold, 'img/gold.png');
}

// Called once after load
gameScene.create = function() {
  addBackground(this);
  this.player = addPlayer(this);
  this.gold = addGold(this);

  this.enemies = [];
  for (let i = 0; i < 3; i++) {
    this.enemies.push(addEnemy(this, i));
  }

}

// Called upto 60 times per second
gameScene.update = function() {
  const {width} = this.sys.game.config;
  // check for active input
  if (this.input.activePointer.isDown) {
    this.player.x = Math.min(this.player.x + this.playerSpeed, width - this.player.displayWidth/2);
  }

  moveEnemy(this);

  // check if gold overlap player
  const playerRect = this.player.getBounds();
  const goldRect = this.gold.getBounds();
  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goldRect)) {
    this.scene.restart();
    return;
  }
}

// set config
const config = {
  type: Phaser.AUTO, // Phaser will use WebGL
  width: 640,
  height: 360,
  scene: gameScene
};

// create new game
const game = new Phaser.Game(config);

function addBackground(scene) {
  const {width, height} = scene.sys.game.config; // width and height of game
  const bg = scene.add.image(0, 0, ASSESTS.background);
  //bg.setOrigin(0, 0); // change pivot point, by default it at center
  bg.setPosition(width/2, height/2);
  bg.setScale(1.5, 1.5); // increase size
}

function addPlayer(scene) {
  const player = scene.add.sprite(50, 250, ASSESTS.player)
    .setScale(0.05);
  player.depth = 1; // like z-index
  //player.setAngle(45); // rotation
  return player;
}

function addEnemy(scene, index) {
  const enemy = scene.add.sprite(200 + index*150, 250, ASSESTS.enemy);
  enemy.scaleX = 0.2;
  enemy.scaleY = 0.2;
  enemy.flipX = true;
  enemy.depth = 1;
  return {
    sprite: enemy,
    speed: ENEMY_SPEED_MIN + Math.random() * (ENEMY_SPEED_MAX - ENEMY_SPEED_MIN),
  };
}

function addGold(scene) {
  const {width} = scene.sys.game.config;
  const gold = scene.add.sprite(0, 0, ASSESTS.gold);
  gold.setScale(0.06);
  gold.setPosition(width - gold.displayWidth/2 - 5, 270);
  gold.depth = 1;
  return gold;
}

function moveEnemy(scene) {
  scene.enemies.forEach(enemy => {
    enemy.sprite.y += enemy.speed;
    const conditionUp = enemy.speed < 0 && enemy.sprite.y <= ENEMY_MIN_Y;
    const conditionDown = enemy.speed > 0 && enemy.sprite.y >= ENEMY_MAX_Y;
    if (conditionUp || conditionDown) {
      enemy.speed *= -1;
    }
  });
}
