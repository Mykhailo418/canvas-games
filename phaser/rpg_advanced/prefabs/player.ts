import { Prefab, PrefabProperties } from "./prefab";

export interface PlayerProperties extends PrefabProperties {
  walkingSpeed: number;
}

export class Player extends Prefab {
  walkingSpeed: number;
  constructor(scene: any, name: string, position: any, properties: PlayerProperties) {
    super(scene, name, position, properties);
console.log(name, position, properties);
    this.walkingSpeed = properties.walkingSpeed;
    this.scene.physics.world.enable(this);
    this.scene.physics.add.existing(this);
    let body = <Phaser.Physics.Arcade.Body>this.body;
    body.collideWorldBounds = true;

    this.scene.physics.add.collider(this, this.scene.layers.buildings);

    //body.velocity.x = -this.walkingSpeed;
  }
}
