import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ILoginComponentContainerProps from '../componentContainerProps/loginComponentContainerProps';
import LoginComponent from '../components/forms/login';
import { authorizationUser, authorizationUserFlag, redirectDashboard, signOutUser } from '../actions/userAction';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { redirectOnSignInForm, windowBlocking } from '../actions/windowAction';

class LoginComponentContainer extends React.Component<ILoginComponentContainerProps, any> {
  constructor(props: ILoginComponentContainerProps) {
    super(props);
    props.redirectOnSignInForm( false );
  }
  // componentDidMount() {
    // this.props.redirectOnSignInForm( false );
  // }
  render() {
    return (
      <React.Fragment>
        <LoginComponent
          path={this.props.location.pathname}
          userAuthorization={this.props.userAuthorization}

          authorizationUser={this.props.authorizationUser}
          signOutUser={this.props.signOutUser}
          authorizationUserFlag={this.props.authorizationUserFlag}
          redirectDashboard={this.props.redirectDashboard}
          windowBlocking={this.props.windowBlocking}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    location: state.router.location,
    userAuthorization: state.user.authorized,
  };
};
const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      authorizationUser,
      signOutUser,
      authorizationUserFlag,
      redirectDashboard,
      windowBlocking,
      redirectOnSignInForm,
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( LoginComponentContainer );
