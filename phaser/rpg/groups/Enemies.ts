import { Enemy } from '../sprites/enemy';

export class EnemiesGroup extends Phaser.Physics.Arcade.Group {
  scene: Phaser.Scene;
  spriteFrames = [0, 1, 54, 55, 108, 109, 162, 163];

  constructor(world: Phaser.Physics.Arcade. World,
    scene: Phaser.Scene,
    children: any[],
    spritesArr: Phaser.GameObjects.Sprite[]
  ) {
    super(world, scene, children);
    this.scene = scene;

    this.createEnemies(scene, spritesArr);
  }

  createEnemies(scene: Phaser.Scene, spritesArr: Phaser.GameObjects.Sprite[]): void {
    spritesArr.forEach(sprite => {
      const randomFrame = Math.floor(Math.random() * (this.spriteFrames.length - 1));
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randomFrame]); // create an enemy
      this.add(enemy); // add to enemy group
      sprite.destroy(); // destroy the sprite
    });
  }
}
