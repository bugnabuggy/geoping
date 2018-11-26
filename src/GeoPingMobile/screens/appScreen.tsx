import React from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authorizationUserFlag } from "../actions/userAction";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { isRedirect } from "../actions/windowAction";
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerNavigator } from "react-navigation";
import LoginScreen from "./loginScreen";
import { ForgotPasswordScreen } from "./forgotPasswordScreen";
import DashboardScreen from "./dashboardScreen";
import { LoadingScreen } from "./loadingScreen";
import CheckListScreen from './checkListScreen';
import { DrawerMenuScreen } from "./drawerMenuScreen";
import { HeaderComponent } from "../components/headerComponent";

type Props = {
  navigation?: any,
  // userAuthorization: any,
  state: IinitialStateType,
  authorizationUserFlag: ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => void;
  isRedirect: ( redirect: string ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {};

const AppDrawerNavigator = createStackNavigator( {
  Check_List: CheckListScreen,
});

const AuthenticationNavigator = createDrawerNavigator ( {
    SignIn: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
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

const AppNavigator = createDrawerNavigator ( {
// const AppNavigator = DrawerNavigator ( {
    Dashboard: DashboardScreen,
    Check_List: CheckListScreen,
  },
  {
    initialRouteName: 'Dashboard',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    contentComponent: DrawerMenuScreen,
  } );

const Navigation: any = DrawerNavigator (
  {
    Drawer: AppDrawerNavigator,
    Loading: LoadingScreen,
    Auth: AuthenticationNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Loading',
    contentComponent: DrawerMenuScreen,
  }
);

export class AppScreen extends React.Component<Props, State> {
  static router = Navigation.router;
  componentDidMount(): void {
    AsyncStorage.getItem ( 'token' )
      .then ( ( token: string ) => {
        if ( !!token ) {
          this.props.authorizationUserFlag ( true );
          this.props.isRedirect( 'Dashboard' );
        } else {
          this.props.isRedirect( 'SignIn' );
        }
      } )
      .catch ( ( error: any ) => {
        console.log ( 'error ***************', error );
      } )
  }

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
    if (!prevProps.state.window.redirect && this.props.state.window.redirect ) {
      this.props.navigation.navigate ( this.props.state.window.redirect );
      this.props.isRedirect( '' );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navigation navigation={this.props.navigation}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    // location: state.router.location,
    // userAuthorization: state.user.authorized,
    // roleUser: state.user.roleUser,
    state: state,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      authorizationUserFlag,
      isRedirect,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( AppScreen );