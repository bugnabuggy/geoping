import * as React from 'react';
import { ILoginPageProps } from '../pageProps/loginPageProps';
import RegisterComponentContainer from '../componentContainers/registerComponentContainer';
import { loginUrl, registerUrl } from '../constants/routes';
import LoginComponentContainer from '../componentContainers/loginComponentContainer';

export default class LoginPage extends React.Component<ILoginPageProps, any> {
  render() {
    const form: any = {
      [ registerUrl ]: RegisterComponentContainer,
      [ loginUrl ]: LoginComponentContainer,
    };
    const Component: any = form[ this.props.location.pathname ];
    return (
      <React.Fragment>
        <Component/>
      </React.Fragment>
    );
  }
}
