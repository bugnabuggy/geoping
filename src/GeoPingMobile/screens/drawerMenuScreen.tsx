import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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
          this.props.navigation.navigate('Dashboard');
        }}>
          <Text style={styles.menuItem}>Dashboard</Text>
        </TouchableOpacity>
        <Text>Check in</Text>
        <Text>Profile</Text>
        <Text>Exit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    fontSize: 20,
  },
  menuItemTouchable: {
    justifyContent: 'center',
    margin: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#531b1e',
  }
});