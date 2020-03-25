import { observable, action, computed } from 'mobx';
import { locations } from '../stubs/locations';

export default class Map {
  @observable locations = locations;

  constructor (externalStore) {
    if (externalStore) {
      Object.assign(this, externalStore);
    }
  }

  init (rootStore) {
    this.rootStore = rootStore;
    return this;
  }
}
