import * as SCENES from '../constants/scenes.const';

export class UIScene extends Phaser.Scene {
  private gameScene: Phaser.Scene;
  private scoreTextObj: Phaser.GameObjects.Text;
  private healthTextObj: Phaser.GameObjects.Text;
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
    this.healthTextObj = this.add.text(12, 50, this.getHealthText(), {
      fontSize: '32px',
      fill: '#fff'
    });

    // get reference to Game Scene
    this.gameScene = this.scene.get(SCENES.GAME);

    // listen event from Game Scene
    this.setupEvents();
  }

  private getScoreText(): string {
    return `Score: ${this.coinCollected}`;
  }

  private getHealthText(health: number = 3): string {
    return `Health: ${health}`;
  }

  private setupEvents(): void {
    this.gameScene.events.on('coinCollected', () => {
      this.coinCollected ++;
      this.scoreTextObj.setText(this.getScoreText());
    });
    this.gameScene.events.on('loseHealth', health => {
      this.healthTextObj.setText(this.getHealthText(health));
    });
    this.gameScene.events.on('newGame', health => {
      this.coinCollected = 0;
      this.scoreTextObj.setText(this.getScoreText());
      this.healthTextObj.setText(this.getHealthText());
    });
  }
}
