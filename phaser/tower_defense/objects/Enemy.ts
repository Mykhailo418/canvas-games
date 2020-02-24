import * as ASSETS from '../constants/assets.const';
import { GameScene } from '../scenes/game.scene';
import levelConfig from '../config/levelConfig';

export class Enemy extends Phaser.GameObjects.Image {
  public scene: GameScene;
  private path: Phaser.Curves.Path;
  private hp = 0;
  private speed = 0;
  private follower = {t: 0, vec: new Phaser.Math.Vector2()}

  constructor(scene, x, y, path) {
    super(scene, x, y, ASSETS.ENEMY);

    this.path = path;
    this.scene.add.existing(this);
  }

  update(time, delta) {
    //console.log(time, delta, this.speed);
    this.follower.t += this.speed * delta;

    this.updateEnemyPosition();

    if (this.follower.t >= 1) {
      this.hideEnemy();
    }
  }

  startOnPath(level: number = 1): void {
    this.hp = levelConfig.initial.enemyHealth + level * levelConfig.incremental.enemyHealth; //reset health
    this.speed = levelConfig.initial.enemyHealth + level * levelConfig.incremental.enemyHealth; //reset speed;
    this.follower.t = 0; // set the 't' parameter of the start of the path

    this.updateEnemyPosition();
  }

  receiveDamage(damage: number) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hideEnemy();
    }
  }

  private updateEnemyPosition(): void {
    // get x and y of the give t point
    // first argument is position on path beetwen 0 and 1
    // second an argument is an object in Vector2 format where to save coorsinates
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.updateEnemyRotation();
    this.setPosition(this.follower.vec.x, this.follower.vec.y); // set x and y of enemy
  }

  private updateEnemyRotation(): void {
    if (this.follower.vec.y > this.y && this.follower.vec.y !== this.y) {
      this.angle = 0;
    }
    if (this.follower.vec.x > this.x && this.follower.vec.x !== this.x) {
      this.angle = -90;
    }
  }

  private hideEnemy() {
    this.setActive(false);
    this.setVisible(false);
  }

  public showEnemy() {
    this.setActive(true);
    this.setVisible(true);
  }
}
