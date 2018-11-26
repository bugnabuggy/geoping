import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  navigation: any,
  title: string,
};
type State = {};

export class HeaderComponent extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer ();
          }}
        >
          <Image
            source={require ( '../assets/images/Hamburger_icon.png' )}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    backgroundColor: '#f4511e',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 20,
  },
  icon: {
    marginLeft: 20,
    width: 24,
    height: 24,
  },
} );