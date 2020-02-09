import { CHATACTERS } from '../constants/assets.const';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed = 100;
  private health = 3;
  scene: Phaser.Scene;
  timeEvent: Phaser.Time.TimerEvent;
  cancelMoveTimeEvent: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, frame = 0) {
    super(scene, x, y, CHATACTERS, frame);

    this.scene = scene;
    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scenes
    this.scene.add.existing(this);
    this.setScale(4);

    // enemy movement
    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      loop: true,
      callback: this.move,
      callbackScope: this
    });
  }

  move(): void {
    const randomNum = Math.floor(Math.random() * 4 + 1);
    switch (randomNum) {
      case 1: this.setVelocityX(this.speed); break;
      case 2: this.setVelocityX(-this.speed); break;
      case 3: this.setVelocityY(-this.speed); break;
      case 4:
      default: this.setVelocityY(this.speed);
    }

    this.cancelMoveTimeEvent = this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.setVelocity(0);
        }
    });
  }

  looseHealth(): void {
    this.health --;
    this.tint = 0xff0000;
    if (!this.health) {
      this.timeEvent.destroy(); // clear event of movement
      this.cancelMoveTimeEvent.destroy();
      this.destroy();
    } else {
      this.scene.time.addEvent({
          delay: 500,
          callback: () => {
            this.tint = 0xffffff;
          }
      });
    }
  }

}
