import * as React from 'react';
import LoginReduxForm from './reduxForms/loginForms';
import ILoginComponentProps from '../../componentProps/loginComponentProps';

class LoginComponent extends React.Component<ILoginComponentProps, any> {
  _callback: any;
  submit = ( e: any ) => {
    this.props.authorizationUser( e.login, e.password );
  };
  googleAuthInit = ( callback: any ) => {
    this._callback = callback;
  };

  constructor( props: any ) {
    super( props );
  }

  componentDidMount() {
    this._callback( this.props.redirectDashboard, this.props.windowBlocking );
  }

  render() {
    return (
      <div className="login-page">
        <LoginReduxForm
          onSubmit={this.submit}
          googleAuthInit={this.googleAuthInit}
          windowBlocking={this.props.windowBlocking}
        />
      </div>
    );
  }
}

export default LoginComponent;
