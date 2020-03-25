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

  @action addLocation = (data) => {
    console.log(data)
    this.locations[data.id] = data;
  };

  @action deleteLocation = (itemId) => {
    this.locations[itemId] && delete this.locations[itemId];
  }
}
