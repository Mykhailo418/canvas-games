import { PORTAL } from '../constants/assets.const';

export class Portal extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, PORTAL);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }


}
