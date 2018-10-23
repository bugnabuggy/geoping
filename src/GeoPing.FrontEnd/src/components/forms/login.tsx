import * as React from 'react';
import LoginReduxForm from './reduxForms/loginForms';
import ILoginComponentProps from '../../componentProps/loginComponentProps';

class LoginComponent extends React.Component<ILoginComponentProps, any> {
  submit = ( e: any ) => {
    this.props.authorizationUser( e.login, e.password );
  };

  constructor( props: any ) {
    super( props );
  }

  render() {
    return (
      <div className="login-page">
        <LoginReduxForm
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

export default LoginComponent;
