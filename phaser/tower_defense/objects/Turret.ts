import * as ASSETS from '../constants/assets.const';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './Enemy';

export class Turret extends Phaser.GameObjects.Image {
  public scene: GameScene;
  private gameMap: number[][];
  private nextShot: number = 0;
  private fireDelay: number = 1000;
  private fireRange: number = 100;

  constructor(scene, x, y, map) {
    super(scene, x, y, ASSETS.TOWER);

    this.scene = scene;
    this.gameMap = map;

    this.scene.add.existing(this);
    this.setScale(0.8);
  }

  update(time: number, delta: number) {
    this.searchingEnemy(time);
  }

  place(i: number, j: number) {
    this.x = i * 64 + 32;
    this.y = j * 64 + 32;
    this.gameMap[j][i] = 1;
  }

  searchingEnemy(time: number) {
    const enemy: Enemy = this.scene.getEnemy(this.x, this.y, this.fireRange);
    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
      if (time > this.nextShot) {
        this.fire(angle);
        this.nextShot = time + this.fireDelay;
      }
    }
  }

  fire(angle: number) {
    this.scene.addBullet(this.x, this.y, angle);
  }

  private hideTurret() {
    this.setActive(false);
    this.setVisible(false);
  }

  public showTurret() {
    this.setActive(true);
    this.setVisible(true);
  }

  setBodyScaleToNormal() {
    (<Phaser.Physics.Arcade.Body>this.body)
      .setSize(this.displayWidth, this.displayHeight);
  }
}
