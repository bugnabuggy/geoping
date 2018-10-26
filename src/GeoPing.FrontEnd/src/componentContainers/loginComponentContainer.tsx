import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ILoginComponentContainerProps from '../componentContainerProps/loginComponentContainerProps';
import LoginComponent from '../components/forms/login';
import { authorizationUser, authorizationUserFlag, redirectDaschboard, signOutUser } from '../actions/userAction';
import IinitialStateType from '../types/stateTypes/initialStateType';

class LoginComponentContainer extends React.Component<ILoginComponentContainerProps, any> {

  render() {
    return (
      <React.Fragment>
        <LoginComponent
          path={this.props.location.pathname}
          userAuthorization={this.props.userAuthorization}
          roleUser={this.props.roleUser}

          authorizationUser={this.props.authorizationUser}
          signOutUser={this.props.signOutUser}
          authorizationUserFlag={this.props.authorizationUserFlag}
          redirectDaschboard={this.props.redirectDaschboard}
        />

      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    location: state.router.location,
    userAuthorization: state.user.authorized,
    roleUser: state.user.roleUser,
  };
};
const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      authorizationUser,
      signOutUser,
      authorizationUserFlag,
      redirectDaschboard,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( LoginComponentContainer );
