import { CHATACTERS } from '../constants/assets.const';
import { Enemy } from './enemy';
import { GameScene } from '../scenes/gameScene';

const frame = 324; // number of frame in CHATACTERS spritesheet

export class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 150;
  private health = 3;
  private hitDelay = false;
  direction = 'up';
  scene: GameScene;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, CHATACTERS, frame);

    this.scene = scene;
    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scenes
    this.scene.add.existing(this);
    this.setScale(4);
  }

  // should be run in update scene method
  playerControl(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    this.setVelocity(0); // it prevents unstoppable moving

    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);
      this.direction = 'up';
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
      this.direction = 'down';
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.direction = 'left';
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.direction = 'right';
    }
  }

  enemyCollision(player: Player, enemy: Enemy): void {
    if (!this.hitDelay) {
      this.loseHealth();
      this.tint = 0xff0000; // set shade of sprtite to red
      this.hitDelay = true;

      this.scene.time.addEvent({
          delay: 1200,
          callback: () => {
            this.tint = 0xffffff; // set shade of sprtite to white(default)
            this.hitDelay = false;
          }
      });
    }
  }

  private loseHealth(): void {
    this.health --;
    this.scene.events.emit('loseHealth', this.health);
    if (!this.health) {
      this.scene.restartToFirstLevel();
    }
  }
}
