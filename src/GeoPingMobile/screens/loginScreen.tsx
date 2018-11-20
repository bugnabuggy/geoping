import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import LoginHttpService from '../service/loginHttpService';
import { client_id, client_secret, grant_type, scope } from "../constants/secretSettings";
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authorizationUser } from "../actions/userAction";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";

type Props = {
  // navigation: any,
  // location: any,
  userAuthorization: any,
  // roleUser: any,
  authorizationUser: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  login: string,
  password: string,
  message: string,
};

export class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Sign in',
  };
  handleChangeLogin = ( login: string ) => {
    this.setState ( { login } );
  };
  handleChangePassword = ( password: string ) => {
    this.setState ( { password } );
  };
  handleSubmit = () => {
    // const userSignIn: FormData = new FormData ();
    // userSignIn.append ( 'username', this.state.login );
    // userSignIn.append ( 'password', this.state.password );
    // userSignIn.append ( 'client_id', client_id );
    // userSignIn.append ( 'client_secret', client_secret );
    // userSignIn.append ( 'grant_type', grant_type );
    // userSignIn.append ( 'scope', scope );
    //
    // const service: any = new LoginHttpService ();
    // service.login ( userSignIn )
    //   .then ( ( response: any ) => {
    //     this.setState ( { message: response.access_token } );
    //     this.props.navigation.dispatch (
    //       StackActions.reset (
    //         {
    //           index: 0,
    //           actions: [
    //             NavigationActions.navigate ( {
    //               routeName: 'Dashboard',
    //               params: {
    //                 access_token: response.access_token,
    //               }
    //             } )
    //           ],
    //         } ) );
    //
    //     // this.props.navigation.navigate('Dashboard'); // наивгация со стрелочкой назад
    //   } )
    //   .catch ( ( error: any ) => {
    //     this.setState ( { message: error.message } );
    //   } )
    if ( this.state.login && this.state.password ) {
      this.props.authorizationUser ( this.state.login, this.state.password );
    }
  };

  constructor( props: Props ) {
    super ( props );
    this.state = {
      login: '',
      password: '',
      message: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.loginText}>{this.state.message}</Text>*/}
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Login"
          onChangeText={this.handleChangeLogin}
          value={this.state.login}
        />
        <Text style={styles.loginText}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={this.handleChangePassword}
          value={this.state.password}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
          color='#0000a3'
        />
      </View>
    );
  }
}
const styles = StyleSheet.create ( {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginText: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  textInput: {
    width: 260,
    borderWidth: 1,
    marginBottom: 5,
  }
} );

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    // location: state.router.location,
    userAuthorization: state.user.authorized,
    // roleUser: state.user.roleUser,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      authorizationUser,
    },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( LoginScreen );