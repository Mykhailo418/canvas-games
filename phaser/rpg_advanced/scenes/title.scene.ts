import * as SCENES from '../constants/scenes.const';
import { JSONLevelScene } from './JSONLevel.scene';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export class TitleScene extends JSONLevelScene {
  private bg_asset = "background_image";
  default_data: any;

  constructor() {
    super(SCENES.TITLE);
  }

  preload () {
      this.load.json('default_data', 'assets/levels/default_data.json');
  }

  create() {
    //this.addBackground();
    super.create();
    this.default_data = this.cache.json.get('default_data');
  }

  /*update() {
    if (this.input.activePointer.isDown) {
      this.startGame();
    }
  }*/

  // private addBackground() {
  //   const bg = this.add.sprite(0, 0, this.bg_asset);
  //   bg.setOrigin(0, 0);
  // }

  start_game() {
    this.scene.start(SCENES.BOOT, {
      sceneName: SCENES.WORLD
    });
  }

  login () {
      if (!firebase.auth().currentUser) {
          let provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/userinfo.email');

          firebase.auth().signInWithPopup(provider)
            .then(this.on_login.bind(this))
            .catch(this.handle_error.bind(this));
      } else {
          firebase.database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .once("value")
            .then(this.retrieve_data.bind(this));
      }
  }

  on_login (result) {
      firebase.database()
        .ref("/users/" + result.user.uid)
        .once("value")
        .then(this.retrieve_data.bind(this));
  }

  retrieve_data (snapshot) {
      let user_data = snapshot.val();
      const cache = (<any>this.cache);
      if (!user_data) {
          cache.game.party_data = this.default_data.party_data;
          firebase.database()
            .ref('users/' + firebase.auth().currentUser.uid + '/party_data')
            .set(cache.game.party_data)
            .then(this.start_game.bind(this));
      } else {
          cache.game.party_data = user_data.party_data || this.default_data.party_data;
          let items = user_data.items || this.default_data.items;
          for (let item_key in items) {
              cache.game.inventory.collect_item(this, items[item_key], item_key);
          }
          this.start_game();
      }
  }

  handle_error(error) {
      console.log(error);
  }
}
