import { CHATACTERS } from '../constants/assets.const';

const frame = 324; // number of frame in CHATACTERS spritesheet

export class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 150;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
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
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
    }
  }
}
