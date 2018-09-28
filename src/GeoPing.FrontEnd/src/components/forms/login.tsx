import * as React from 'react';

import LoginReduxForm from './reduxForms/loginForms';

class LoginComponent extends React.Component<any, any> {
  constructor( props: any ) {
    super ( props );

  }

  submit( e: any ) {
    // print the form values to the console
    console.log ( 'e', e );
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