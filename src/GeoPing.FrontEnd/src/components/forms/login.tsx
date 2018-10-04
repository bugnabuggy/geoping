import * as React from 'react';
import { post, get } from  '../../services/httpService';
import LoginReduxForm from './reduxForms/loginForms';
import ILoginComponentProps from '../../componentProps/loginComponentProps';

class LoginComponent extends React.Component<ILoginComponentProps, any> {
  constructor( props: any ) {
    super ( props );

  }

  submit( e: any ) {
   // this.props.authorizationUser ( e.login, e.password );
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