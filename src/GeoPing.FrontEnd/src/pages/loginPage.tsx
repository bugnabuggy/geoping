import * as React from 'react';
import { ILoginPageProps } from '../componentProps/loginPageProps';
import  LoginComponent from "../components/forms/login";

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  render() {
    const form: any = {
      '/resetpassword': 'Reset Password',
      '/register': 'Register',
      '/login': LoginComponent,
    };
      const Component: any = form[this.props.location.pathname];
    return (
      <React.Fragment>
          <Component />
      </React.Fragment>
    );
  }
}
