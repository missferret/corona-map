import { observable, action, computed } from 'mobx';
import { locations } from '../stubs/locations';

export default class Map {
  @observable locations = {};
  @observable itemOpenStates = {};

  constructor (externalStore) {
    if (externalStore) {
      Object.assign(this, externalStore);
    }
  }

  init (rootStore) {
    this.rootStore = rootStore;
    this.fetchExistingLocations();
    return this;
  }

  @action fetchExistingLocations = () => {
    const existingLocations = JSON.parse(localStorage.getItem('locations'));
    this.locations = existingLocations || {};
  };

  @action saveLocations = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
  };

  @action addLocation = (data) => {
    this.locations[data.id] = data;
    this.saveLocations();
  };

  @action deleteLocation = (itemId) => {
    this.locations[itemId] && delete this.locations[itemId];
    this.saveLocations();
  };

  @action editLocation = (itemId, data) => {
    this.locations[itemId] && (this.locations[itemId] = {
      ...this.locations[itemId],
      ...data,
    });
    this.saveLocations();
  }
}
