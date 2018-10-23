import * as React from 'react';
import RegisterReduxForm from './reduxForms/registerForm';
import IRegisterComponentProps from '../../componentProps/registerComponentProps';
import IRegistrationUserType from '../../types/actionsType/registrationUserDataType';

class RegisterComponent extends React.Component<IRegisterComponentProps, any> {
  constructor( props: any ) {
    super( props );
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration( e: any ) {
    const newUser: IRegistrationUserType = {
      login: e.login,
      email: e.email,
      password: e.password,
    };

    this.props.registrationUser(newUser);
  }

  render() {
    return (
      <div className="sign-container">
        <RegisterReduxForm
          onSubmit={this.handleRegistration}
        />
      </div>
    );
  }
}

export default RegisterComponent;