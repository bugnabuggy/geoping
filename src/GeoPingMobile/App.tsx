/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { AsyncStorage, Platform, StyleSheet, View, Text } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


import LoginScreen from './screens/loginScreen';
import { createStackNavigator } from 'react-navigation';
import DashboardScreen from './screens/dashboardScreen';
import createReducer from './reducers/rootReducer';

const instructions = Platform.select ( {
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
} );

const store = createStore( createReducer({}));
const persistore = persistStore( store, null );

// const presistedReducer = persistReducer( persistConfig, createReducer( {} ) );
//
// // const store: any = createStore ( createReducer( {} ), {} );
// const temp_store = createStore(presistedReducer);
// const persistor = persistStore(temp_store);
// const store: any = {
//   store: temp_store,
//   persistor,
// };

const Navigation: any = createStackNavigator (
  {
    Home: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    // return (
    //   <View>
    //     {/*<Text style={styles.welcome}>Welcome to React Native!</Text>*/}
    //     {/*<Text style={styles.instructions}>To get started, edit App.js</Text>*/}
    //     {/*<Text style={styles.instructions}>{instructions}</Text>*/}
    //   </View>
    // );
    return (
      <Provider store={store}>
        <PersistGate loading={<LoginScreen/>} persistor={persistore}>
          <Navigation/>
          {/*/!*<View>*!/*/}
            {/*/!*<Text style={styles.welcome}>Welcome to React Native!</Text>*!/*/}
          {/*/!*</View>*!/*/}
          {/*<LoginScreen/>*/}
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
} );
