import { CHATACTERS } from '../constants/assets.const';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed = 100;
  scene: Phaser.Scene;
  timeEvent: Phaser.Time. TimerEvent;

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

    this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.setVelocity(0);
        }
    });
  }

}
