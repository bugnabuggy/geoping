import * as React from 'react';
import RegisterReduxForm from './reduxForms/registerForm';
import IRegisterComponentProps from '../../componentProps/registerComponentProps';
import IRegistrationUserDTO from '../../DTO/registrationUserDTO';
import * as momentTimeZone from 'moment-timezone';

class RegisterComponent extends React.Component<IRegisterComponentProps, any> {
  guess: string;
  constructor( props: any ) {
    super( props );
    this.handleRegistration = this.handleRegistration.bind( this );
    this.guess = momentTimeZone.tz.guess();
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
      timeZone: this.guess || 1,
    };
    return (
      <div className="sign-container">
        <RegisterReduxForm
          timeZones={this.props.timeZones}

          initialValues={initialForm}
          onSubmit={this.handleRegistration}
        />
      </div>
    );
  }
}

export default RegisterComponent;
