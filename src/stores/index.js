import RootStore from './Root';
import Map from './Map.store';

const createStore = externalStore => {
  return new RootStore({
    map: new Map(),
  });
};

export default createStore;
