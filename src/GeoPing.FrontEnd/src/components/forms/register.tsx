import * as React from 'react';
import RegisterReduxForm from './reduxForms/registerForm';

class RegisterComponent extends React.Component<any, any> {
  constructor( props: any ) {
    super( props );
  }

  submit( e: any ) {
    // print the form values to the console
    // console.log('e', e);

  }

  render() {
    return (
      <div className="sign-container">
        <RegisterReduxForm
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

export default RegisterComponent;