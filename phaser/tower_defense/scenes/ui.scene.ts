import * as SCENES from '../constants/scenes.const';
import { GameScene } from './game.scene';

export class UiScene extends Phaser.Scene {
  private scoreTextObj: Phaser.GameObjects.Text;
  private healthTextObj: Phaser.GameObjects.Text;
  private gameScene: GameScene;

  constructor() {
    super({key: SCENES.UI,  active: true});
  }

  preload(): void {
  }

  init() {
    this.gameScene = <GameScene>this.scene.get(SCENES.GAME);
  }

  create(): void {
    this.createUIElements();
    this.setupEvents();
  }

  createUIElements() {
    this.scoreTextObj = this.add.text(5, 490, 'Score: 0', {
      fontSize: '18px',
      fill: '#000'
    });
    this.healthTextObj = this.add.text(5, 470, 'Health: 3', {
      fontSize: '18px',
      fill: '#000'
    });
    this.hideUI();
  }

  setupEvents() {
    this.gameScene.events.on('displayUI', () => {
      this.showUI();
    });
    this.gameScene.events.on('hideUI', () => {
      this.hideUI();
    });
    this.gameScene.events.on('updateScore', (score: number) => {
      this.scoreTextObj.setText(`Score: ${score}`);
    });
    this.gameScene.events.on('updateHealth', (health: number) => {
      this.healthTextObj.setText(`Health: ${health}`);
    });
  }

  private showUI() {
    this.scoreTextObj.alpha = 1;
    this.healthTextObj.alpha = 1;
  }

  private hideUI() {
    this.scoreTextObj.alpha = 0;
    this.healthTextObj.alpha = 0;
  }
}
