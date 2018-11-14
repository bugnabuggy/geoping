import * as React from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { ModalComponent } from './checklist/modalComponent';
import { IModalChangePasswordComponentProps } from '../../componentProps/modalChangePasswordComponentProps';

export class ModalChangePasswordComponent extends React.Component<IModalChangePasswordComponentProps, any> {
  constructor( props: any ) {
    super( props );
    this.state = {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
    this.handleChange = this.handleChange.bind( this );
    this.passwordChange = this.passwordChange.bind( this );
    this.handleConfirmPassword = this.handleConfirmPassword.bind( this );
  }

  handleChange( e: any ) {
    const target = e.target;
    const name = target.name;
    this.setState( { [ name ]: target.value } );
  }

  handleConfirmPassword() {
    // const psw = this.state.Password;
    const newPsw = this.state.newPassword;
    const confPsw = this.state.confirmNewPassword;
    if ( ( newPsw.length && confPsw.length ) > 3 ) {
      if ( newPsw === confPsw ) {
        return 'success';
      } else {
        return 'error';
      }
    } else {
      return null;
    }
  }

  passwordChange() {
    this.props.changePassword( this.state.password, this.state.newPassword );
    this.props.closeModalChangePassword();
  }

  render() {
    return (
      <ModalComponent
        show={this.props.isShowModal}
        close={this.props.closeModalChangePassword}
        title={'Change Password'}
      >
        <form>
          <FormGroup>
            <Label>Old password</Label>
            <Input
              onChange={this.handleChange}
              name="password"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label>New password</Label>
            <Input
              onChange={this.handleChange}
              name="newPassword"
              type="password"
              invalid={this.handleConfirmPassword() === 'error' && true}
              valid={this.handleConfirmPassword() === 'success' && true}
            />
            <Label>Confirm new password</Label>
            <Input
              onChange={this.handleChange}
              name="confirmNewPassword"
              type="password"
            />
          </FormGroup>
          <div className="change-password-button-container">
            <Button
              onClick={this.passwordChange}
              color="primary"
            >
              Change Password
            </Button>
            <Button
              onClick={this.props.closeModalChangePassword}
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </ModalComponent>
    );
  }
}