import { Prefab, PrefabProperties } from "./prefab";
import { WALKIN_DOWN, WALKIN_UP, WALKIN_LEFT, WALKIN_RIGHT } from '../constants/anims.const';

export interface PlayerProperties extends PrefabProperties {
  walking_speed: number;
}

export class Player extends Prefab {
  walkingSpeed: number;
  private left: Phaser.Input.Keyboard.Key;
  private right: Phaser.Input.Keyboard.Key;
  private up: Phaser.Input.Keyboard.Key;
  private down: Phaser.Input.Keyboard.Key;
  private bodyPlayer: Phaser.Physics.Arcade.Body;

  private stopped_frames = [0, 1, 0, 2, 3];

  moving: any;

  constructor(scene: any, name: string, position: any, properties: PlayerProperties) {
    super(scene, name, position, properties);

    this.walkingSpeed = properties.walking_speed;
    console.log(this.walkingSpeed);
    this.scene.physics.world.enable(this);
    //this.scene.physics.add.existing(this);
    this.bodyPlayer = <Phaser.Physics.Arcade.Body>this.body;
    this.bodyPlayer.collideWorldBounds = true;

    this.scene.physics.add.collider(this, this.scene.layers.buildings);

    //body.velocity.x = -this.walkingSpeed;

    /*this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);*/

    this.moving = {left: false, right: false, up: false, down: false};

    this.createAnimations();
  }

  update() {
    if(this.body) {
      this.movement();
    }
  }

  change_movement(direction, value) {
    this.moving[direction] = value;
  }

  stop() {
      this.moving = {left: false, right: false, up: false, down: false};
  }

  private movement() {
    if (this.moving.left && this.bodyPlayer.velocity.x <= 0) {
      this.bodyPlayer.velocity.x = -this.walkingSpeed;
      if (this.bodyPlayer.velocity.y === 0) {
        this.anims.play(WALKIN_LEFT, true);
      }
    } else if(this.moving.right && this.bodyPlayer.velocity.x >= 0) {
      this.bodyPlayer.velocity.x = +this.walkingSpeed;
      if (this.bodyPlayer.velocity.y === 0) {
        this.anims.play(WALKIN_RIGHT, true);
      }
    } else {
      this.bodyPlayer.velocity.x = 0;
    }

    if (this.moving.up && this.bodyPlayer.velocity.y <= 0) {
      this.bodyPlayer.velocity.y = -this.walkingSpeed;
      if (this.bodyPlayer.velocity.x === 0) {
        this.anims.play(WALKIN_UP, true);
      }
    } else if (this.moving.down && this.bodyPlayer.velocity.y >= 0) {
      this.bodyPlayer.velocity.y = +this.walkingSpeed;
      if (this.bodyPlayer.velocity.x === 0) {
        this.anims.play(WALKIN_DOWN, true);
      }
    } else {
      this.bodyPlayer.velocity.y = 0;
    }

    if (this.bodyPlayer.velocity.x === 0 && this.bodyPlayer.velocity.y === 0) {
      this.anims.stop();
      // facing - A const reference to the direction the Body is traveling or facing.
      // -- is number and have 1 of 4 values Phaser.LEFT, Phaser.RIGHT, Phaser.UP,  Phaser.DOWN;
      this.setFrame(this.stopped_frames[this.bodyPlayer.facing - 10]);
    }
  }

  private createAnimations() {
    if (!this.scene.anims.anims.has(WALKIN_DOWN)) {
        this.scene.anims.create({
            key: WALKIN_DOWN,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [0, 4, 8, 12]}),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!this.scene.anims.anims.has(WALKIN_UP)) {
        this.scene.anims.create({
            key: WALKIN_UP,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [1, 5, 9, 13]}),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!this.scene.anims.anims.has(WALKIN_LEFT)) {
        this.scene.anims.create({
            key: WALKIN_LEFT,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [2, 6, 10, 14]}),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!this.scene.anims.anims.has(WALKIN_RIGHT)) {
        this.scene.anims.create({
            key: WALKIN_RIGHT,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [3, 7, 11, 15]}),
            frameRate: 6,
            repeat: -1
        });
    }
  }
}
