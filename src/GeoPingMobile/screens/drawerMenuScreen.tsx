import React from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export class DrawerMenuScreen extends React.Component<any, any> {
  static navigationOptions = {
    drawerLabel: 'Test',
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.menuItemTouchable}
          onPress={() => {
            this.props.navigation.navigate ( 'Dashboard' );
          }}
        >
          <Text style={styles.menuItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItemTouchable}
          onPress={() => {
            this.props.navigation.navigate ( 'Check_in' );
          }}
        >
          <Text style={styles.menuItem}>Check in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItemTouchable}
          onPress={() => {
            this.props.navigation.navigate ( 'Check_in_statistics' );
          }}
        >
          <Text style={styles.menuItem}>Check in statistics</Text>
        </TouchableOpacity>
        <Text>Profile</Text>
        <TouchableOpacity
          style={styles.menuItemTouchable}
          onPress={() => {
            AsyncStorage.removeItem ( 'token' )
            this.props.navigation.navigate ( 'SignIn' );
          }}
        >
          <Text style={styles.menuItem}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  menuItem: {
    fontSize: 20,
  },
  menuItemTouchable: {
    justifyContent: 'center',
    margin: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#531b1e',
  }
} );