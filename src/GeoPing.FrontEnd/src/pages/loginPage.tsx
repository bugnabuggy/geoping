import * as React from 'react';
import { ILoginPageProps } from '../componentProps/loginPageProps';

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  render() {
    const form: any = {
      '/resetpassword': 'Reset Password',
      '/register': 'Register',
      '/login': 'Login',
    };

    return (
      <React.Fragment>
        {form[this.props.location.pathname]}
      </React.Fragment>
    );
  }
}
