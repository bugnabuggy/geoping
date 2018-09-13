import * as React from 'react';
import { ILoginPageProps } from '../componentProps/loginPageProps';
import  registerComponent from "../components/forms/register";

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  render() {
    const form: any = {
      '/resetpassword': 'Reset Password',
      '/register': registerComponent,
      '/login': 'Login',
    };
    const Component: any = form[this.props.location.pathname];
    return (
      <React.Fragment>
        <Component />
      </React.Fragment>
    );
  }
}
