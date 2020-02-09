import * as SCENES from '../constants/scenes.const';

export class UIScene extends Phaser.Scene {
  private gameScene: Phaser.Scene;
  private scoreTextObj: Phaser.GameObjects.Text;
  private coinCollected: number;

  constructor() {
    super({
      key: SCENES.UI,
      active: true // set to make Scene to be running.
    });
  }

  init(): void {
    this.coinCollected = 0;
  }

  create(): void {
    this.scoreTextObj = this.add.text(12, 12, this.getScoreText(), {
      fontSize: '32px',
      fill: '#fff'
    });

    // get reference to Game Scene
    this.gameScene = this.scene.get(SCENES.GAME);

    // listen event from Game Scene
    this.gameScene.events.on('coinCollected', () => {
      this.coinCollected ++;
      this.scoreTextObj.setText(this.getScoreText());
    });
  }

  private getScoreText(): string {
    return `Score: ${this.coinCollected}`;
  }
}
