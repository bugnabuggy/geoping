import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authorizationUser } from "../actions/userAction";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";

type Props = {
  // navigation: any,
  // location: any,
  userAuthorization: any,
  state: IinitialStateType,
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
    headerTitle: 'Sign in',
  };
  handleChangeLogin = ( login: string ) => {
    this.setState ( { login } );
  };
  handleChangePassword = ( password: string ) => {
    this.setState ( { password } );
  };
  handleSubmit = () => {
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

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
    // console.log('props ------ ', this.props.state.user);
    // console.log('AsyncStorage.getItem("test")', AsyncStorage.getItem('test'));
    // console.log('AsyncStorage.getItem("token")', AsyncStorage.getItem('token'));
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
    userAuthorization: state.user.authorized,
    state: state,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      authorizationUser,
    },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( LoginScreen );