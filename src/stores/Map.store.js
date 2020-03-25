import { observable, action, computed } from 'mobx';

export default class Map {
  @observable location = {};

  init() {
    console.log("initi!")
  }
}
