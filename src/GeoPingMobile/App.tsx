/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import createReducer from './reducers/rootReducer';
import initialState from './state/initialState';
import thunk from "redux-thunk";
import { configurationDependencyInjerction } from "./services/configurationDependencyInjerction";
import AppScreen from "./screens/appScreen";

const instructions = Platform.select ( {
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
} );

configurationDependencyInjerction ();

const store = createStore (
  createReducer ( {} ),
  initialState,
  applyMiddleware (
    thunk,
  )
);

const AppNavigation = createSwitchNavigator ( {
    Home: AppScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    );
  }
}
