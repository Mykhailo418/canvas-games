

export class CoinsGroup extends Phaser.Physics.Arcade.StaticGroup {
  scene: Phaser.Scene;

  constructor(world: Phaser.Physics.Arcade. World,
    scene: Phaser.Scene,
    children: any[],
    spritesArr: Phaser.GameObjects.Sprite[]
  ) {
    super(world, scene, children);
    this.scene = scene;

    // add each coin to group
    spritesArr.forEach(coin => {
      //world.enable(coin);
      scene.physics.add.existing(coin, true);
      coin.setScale(0.2);
      (<Phaser.Physics.Arcade.StaticBody>coin.body)
        .setSize(coin.displayWidth, coin.displayHeight);
      this.add(coin);
    });
    this.refresh(); // updates coins inorder to apply changes with setScale and setSize
  }

  collectCoin(player, coin): void {
    this.remove(coin);
    coin.destroy();
    // dispatch an event
    this.scene.events.emit('coinCollected');
  }
}
