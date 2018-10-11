import * as React from 'react';
import { ILoginPageProps } from '../pageProps/loginPageProps';
import RegisterComponent from '../components/forms/register';
import LoginComponent from '../components/forms/login';
import { loginUrl, registerUrl, resetPassword } from '../constants/routes';

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  render() {
    const form: any = {
      [ resetPassword ]: 'Reset Password',
      [ registerUrl ]: RegisterComponent,
      [ loginUrl ]: LoginComponent,
    };
    const Component: any = form[ this.props.location.pathname ];
    return (
      <React.Fragment>
        <Component/>
      </React.Fragment>
    );
  }
}
