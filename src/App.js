import React from 'react';
import './App.css';
import { MainMap } from './components/MainMap';
import createStore from './stores/index';
import withMobx from './HOCs/WithMobx';
import { LocationsList } from './components/LocationsList';

const store = createStore();
const App = () => {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <MainMap/>
      <LocationsList onAdd={store.map.addLocation}/>
    </div>
  );
};

export default withMobx(
  App,
  store
);
