import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
// import LoginHttpService from '../service/loginHttpService';

type Props = {
  data: any,
  navigation: any,
};
type State = {
  selected?: any,
  data?: any,
  dataSource: any,
}


export default class DashboardScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Dashboard',
    headerRight: (
      <Button
        title="Info"
        color="#547895"
        onPress={() => {
        }}
      />
    )
  };
  _keyExtractor = ( item: any, index: any ) => item.id;

  // componentDidMount() {
  //   // const service: any = new LoginHttpService ();
  //   // service.getMyCheckLists ( this.props.navigation.state.params.access_token )
  //   //   .then ( ( response: any ) => {
  //   //     this.setState ( {
  //   //       data: response,
  //   //     } );
  //   //     console.log ( 'response', response );
  //   //   } )
  // }
  renderItem = ( props: any ) => {
    return (
      <View style={stylesListItem.container}>
        <Text style={stylesListItem.text}>{props.item.name}</Text>
      </View>
    );
  };
  renderHeader = ( props: any ) => {
    return (
      <View style={stylesHeaderList.container}>
        <TextInput
          style={stylesHeaderList.input}
          placeholder="Search..."
          onChangeText={( text ) => console.log ( 'searching for ', text )}
        />
      </View>
    );
  };

  constructor( props: Props ) {
    super ( props );

  }

  render() {
    return (
      <View style={test.container}>
        <View style={stylesHeaderList.container}>
          <TextInput
            style={stylesHeaderList.input}
            placeholder="Search..."
            onChangeText={( text ) => console.log ( 'searching for ', text )}
          />
        </View>
        <FlatList
          style={styles.container}
          data={testData}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          initialNumToRender={10}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
    );
  }
}
const test = StyleSheet.create ( {
  container: {
    flex: 1,
    maxHeight: '50%',
    backgroundColor: '#fffdf8',
  },
} );

const styles = StyleSheet.create ( {
  container: {
    flex: 1,
    backgroundColor: '#fffdf8',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
} );

const stylesHeaderList = StyleSheet.create ( {
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
} );

const stylesListItem = StyleSheet.create ( {
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
} );


const testData: any = [
  {
    id: 'gsdfgsdf',
    name: 'Test 1',
  },
  {
    id: 'h1d6fg',
    name: 'Test 2',
  },
  {
    id: 'df41ghdf',
    name: 'Test 3',
  },
  {
    id: 'kui562nk',
    name: 'Test 4',
  },
  {
    id: 'sg4e92cgf5d',
    name: 'Test 5',
  },
  {
    id: 'sg41cvs5df',
    name: 'Test 6',
  },
  {
    id: 's8t7g1v9s8d4fg',
    name: 'Test 7',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 8',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 9',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 10',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 11',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 12',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 13',
  },
  {
    id: 'sg24v8sdf942g',
    name: 'Test 14',
  }
];