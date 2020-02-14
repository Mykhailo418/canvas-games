import * as ASSETS from '../constants/assets.const';
import { Enemy } from '../sprites/enemy';

export class BulletsGroup extends Phaser.Physics.Arcade.Group {
  scene: Phaser.Scene;
  private speed = 300;

  constructor(world: Phaser.Physics.Arcade. World,
    scene: Phaser.Scene,
    children: any[]
  ) {
    super(world, scene, children);
    this.scene = scene;

    // specify how many objects we are going to create,
    // will create automatically and add them to the group
    this.createMultiple({
      frameQuantity: 5,
      key: ASSETS.BULLET,
      active: false,
      visible: false
    });
  }

  fireBullet(x: number, y: number, direction: string): void {
    const bullet = this.getFirstDead(false); // get first not active
    if (bullet) {
      this.scene.physics.add.existing(bullet, false);
      bullet.active = true;
      bullet.visible = true;
      bullet.setScale(0.1);
      bullet.setPosition(x, y);
      bullet.body.setVelocityX(300);
      switch (direction) {
        case 'down': bullet.body.setVelocity(0, this.speed); break;
        case 'left': bullet.body.setVelocity(-this.speed, 0); break;
        case 'right': bullet.body.setVelocity(this.speed, 0); break;
        case 'up':
        default: bullet.body.setVelocity(0, -this.speed);
      }
      this.scene.time.addEvent({
          delay: 1500,
          callback: () => this.hideBullet(bullet)
      });
    }
  }

  enemyCollision(enemy: Enemy, bullet: Phaser.GameObjects.Sprite): void {
    this.hideBullet(bullet);
    enemy.looseHealth();
  }

  private hideBullet(bullet: Phaser.GameObjects.Sprite): void {
    (<Phaser.Physics.Arcade.Body>bullet.body).setEnable(false);
    bullet.active = false;
    bullet.visible = false;
    (<Phaser.Physics.Arcade.Body>bullet.body).setVelocity(0);
  }
}
