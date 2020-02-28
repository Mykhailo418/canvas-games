import * as ASSETS from '../constants/assets.const';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './Enemy';

export class Bullet extends Phaser.GameObjects.Image {
  public scene: GameScene;
  private dx: number = 0;
  private dy: number = 0;
  private lifespan: number = 0;
  private speed: number;

  public damage = 50;

  constructor(scene, x, y) {
    super(scene, x, y, ASSETS.BULLET);

    this.scene = scene;
    this.speed = Phaser.Math.GetSpeed(600, 1);// (distance, time)

    this.scene.add.existing(this);
  }

  update(time: number, delta: number) {
    this.lifespan -= delta;

    this.x += this.dx * (this.speed * delta);
    this.y += this.dy * (this.speed * delta);

    if (this.lifespan <= 0){
      this.hide();
    }
  }

  fire(x: number, y: number, angle: number) {
    this.show();
    this.setPosition(x, y);

    this.dx = Math.cos(x);
    this.dy = Math.sin(y);

    this.lifespan = 600;
  }

  public hide() {
    this.setActive(false);
    this.setVisible(false);
  }

  public show() {
    this.setActive(true);
    this.setVisible(true);
  }

}
