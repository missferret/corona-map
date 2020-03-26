import { observable, action, computed } from 'mobx';
import moment from 'moment';

export default class Map {
  @observable locations = {};
  @observable filteredLocations = {};
  @observable itemOpenStates = {};
  @observable filters = {
    date: null,
    startTime: null,
    endTime: null,
  };

  @computed get areFiltersSet () {
    return (this.filters.date || this.filters.startTime || this.filters.endTime);
  }

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

  @action filterLocations = () => {
    if (!this.areFiltersSet) {
      this.filteredLocations = {};
      return;
    }

    const { date } = this.filters;
    const locationsFormatted = {};
    const locations = Object.keys(this.locations).filter(location => {
      return  date ? moment(date).format('l') === moment(this.locations[location].date).format('l') : true;
    });
    locations.forEach(location => locationsFormatted[location] = this.locations[location]);
    this.filteredLocations = locationsFormatted;
  };

  @action onFilter = (filters) => {
    this.filters = {
      ...this.filters,
      ...filters,
    };

    this.filterLocations();
  };

  @action resetFilters = () => {
    this.filters = {
      date: null,
      startTime: null,
      endTime: null,
    };
    this.filterLocations();
  };

  @action fetchExistingLocations = () => {
    const existingLocations = JSON.parse(localStorage.getItem('locations'));
    this.locations = existingLocations || {};
  };

  @action saveLocations = () => {
    localStorage.setItem('locations', JSON.stringify(this.locations));
  };

  @action setOpenState = (itemId, isOpen) => {
    this.itemOpenStates[itemId] = isOpen;
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
