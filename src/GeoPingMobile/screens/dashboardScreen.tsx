import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { v4 as uuidV4 } from 'uuid';
import { connect } from "react-redux";

import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { authorizationUser } from "../actions/userAction";
import { loadCheckLists } from "../actions/myCheckListsAction";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { HeaderComponent } from "../components/headerComponent";

type Props = {
  data: any,
  navigation: any,
  router: any,
  loadCheckLists: () => ( dispatch: IDispatchFunction ) => void,
  state: IinitialStateType,
};
type State = {
  selected?: any,
  data?: any,
  dataSource: any,
  router?: any
}

export class DashboardScreen extends Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
  }

  static navigationOptions = ( { navigation }: any ) => {
    return {
      // headerTitle: 'Dashboard',
      // headerRight: (
      //   <Button
      //     title="Log out"
      //     color="#547895"
      //     onPress={() => {
      //       AsyncStorage.removeItem ( 'token' );
      //       navigation.navigate ( 'SignIn' );
      //     }}
      //   />
      // ),
      // headerLeft: (
      //   <Button
      //     // icon={
      //     //   <Image
      //     //     source={require ( '../assets/images/Hamburger_icon.png' )}
      //     //     style={styles.icon}
      //     //   />
      //     // }
      //     title="dd"
      //     onPress={() =>{
      //         console.log('navigation', navigation);
      //         navigation.openDrawer();
      //     }}
      //   />
      // ),
      drawerLabel: 'Dashboard',

    }
  };

  _keyExtractor = ( item: any) => item.id;

  componentDidMount() {
    this.props.loadCheckLists ();
  }

  renderItem = ( props: any ) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate ( {
            routeName: 'Check_List',
            params:{
              idList: props.item.id,
              nameList: props.item.name,
            },
          });
          console.log ( 'router', this.props.state.router )
        }}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View key={props.item.id} style={stylesListItem.container}>
          <Text style={stylesListItem.text}>{props.item.name}</Text>
        </View>
      </TouchableNativeFeedback>
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

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
  }

  render() {
    return (
      <View style={test.container}>
        <HeaderComponent
          navigation={this.props.navigation}
          title="Dashboard"
        />
        <View style={stylesHeaderList.container}>
          <TextInput
            style={stylesHeaderList.input}
            placeholder="Search..."
            onChangeText={( text ) => console.log ( 'searching for ', text )}
          />
        </View>
        <FlatList
          style={styles.container}
          data={this.props.state.checkList.checkLists}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          initialNumToRender={10}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    // location: state.router.location,
    userAuthorization: state.user.authorized,
    // roleUser: state.user.roleUser,
    state: state,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      authorizationUser,
      loadCheckLists,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( DashboardScreen );

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
  icon: {
    marginLeft: 20,
    width: 24,
    height: 24,
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
