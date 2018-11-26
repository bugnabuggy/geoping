import React from 'react';
import { View, Text, StyleSheet } from "react-native";

type Props = {};
type State = {};

export class LoadingScreen extends React.Component<Props, State>{
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
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
  }
} );