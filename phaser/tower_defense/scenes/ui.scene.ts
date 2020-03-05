import * as SCENES from '../constants/scenes.const';
import { GameScene } from './game.scene';

export class UiScene extends Phaser.Scene {
  private scoreTextObj: Phaser.GameObjects.Text;
  private healthTextObj: Phaser.GameObjects.Text;
  private turretsTextObj: Phaser.GameObjects.Text;
  private roundTimeTextObj: Phaser.GameObjects.Text;
  private enemiesText: Phaser.GameObjects.Text;
  private levelText: Phaser.GameObjects.Text;
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
    this.turretsTextObj = this.add.text(5, 450, 'Available Turrets: 3', {
      fontSize: '18px',
      fill: '#000'
    });
    this.roundTimeTextObj = this.add.text(180, 5, 'Round Start In: 10', {
      fontSize: '16px',
      fill: '#000'
    });
    this.enemiesText = this.add.text(5, 430, 'Enemies Remaining: 0', {
      fontSize: '16px',
      fill: '#000'
    });
    this.levelText = this.add.text(0, 0, 'Level: 0', {
      fontSize: '40px',
      fill: '#000'
    });

    // center level text
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, height / 2, width, height)
    );

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
    this.gameScene.events.on('updateTurretsCount', (turrets: number) => {
      this.turretsTextObj.setText(`Turrets: ${turrets}`);
    });
    this.gameScene.events.on('updateEnemies', (enemies: number) => {
      this.enemiesText.setText(`Enemies Remaining: ${enemies}`);
    });
    this.gameScene.events.on('startRound', (level :number) => {
      this.levelText.setText(`Level: ${level}`);
      this.levelText.alpha = 1;

      // fade level text
      this.add.tween({
        targets: this.levelText,
        ease: 'Sine.easeInOut',
        duration: 1000,
        delay: 2000,
        alpha: {
          getStart: () => 1,
          getEnd: () => 0,
        },
        onComplete: function () {
          this.roundTimeTextObj.setText('Round Start In: 10');
          this.roundTimeTextObj.alpha = 1;
          var timedEvent = this.time.addEvent({
            delay: 1000,
            callbackScope: this,
            repeat: 9,
            callback: function () {
              this.roundTimeTextObj.setText(`Round Start In: ${timedEvent.repeatCount}`);
              if (timedEvent.repeatCount === 0) {
                this.events.emit('roundReady');
                this.roundTimeTextObj.alpha = 0;
              }
            }
          });
        }.bind(this)
      });
    });
  }

  private showUI() {
    this.scoreTextObj.alpha = 1;
    this.healthTextObj.alpha = 1;
    this.turretsTextObj.alpha = 1;
    this.enemiesText.alpha = 1;
  }

  private hideUI() {
    this.scoreTextObj.alpha = 0;
    this.healthTextObj.alpha = 0;
    this.turretsTextObj.alpha = 0;
    this.roundTimeTextObj.alpha = 0;
    this.enemiesText.alpha = 0;
    this.levelText.alpha = 0;
  }
}
