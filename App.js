import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store, { sagaMiddleware } from './src/store/places-store';
import placesSaga from './src/sagas/places-saga';

import PlacesNavigator from './src/navigations/PlacesNavigator';
import { init } from './src/helpers/db';

init().then(() => {
    console.log('initialized DB');
}).catch((err) => {
    console.log('error in init DB' + err);
});
sagaMiddleware.run(placesSaga);

export default function App() {
  return (
      <Provider store={store}>
      <PlacesNavigator />
      </Provider>);
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
