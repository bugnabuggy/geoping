import * as React from 'react';
import RegisterReduxForm from './reduxForms/registerForm';
import IRegisterComponentProps from '../../componentProps/registerComponentProps';
import IRegistrationUserDTO from '../../DTO/registrationUserDTO';

class RegisterComponent extends React.Component<IRegisterComponentProps, any> {
  constructor( props: any ) {
    super( props );
    this.handleRegistration = this.handleRegistration.bind( this );
  }

  handleRegistration( e: any ) {
    const newUser: IRegistrationUserDTO = {
      UserName: e.login,
      Email: e.email,
      Password: e.password,
      Token: localStorage.getItem( 'sharing_token' ) || null,
    };
    this.props.registrationUser( newUser );
  }

  render() {
    const initialForm = {
      email: localStorage.getItem( 'user_data' ) || '',
    };
    return (
      <div className="sign-container">
        <RegisterReduxForm
          initialValues={initialForm}
          onSubmit={this.handleRegistration}
        />
      </div>
    );
  }
}

export default RegisterComponent;