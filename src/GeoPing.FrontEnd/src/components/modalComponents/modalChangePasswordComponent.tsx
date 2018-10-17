import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { ModalComponent } from './checklist/modalComponent';

export class ModalChangePasswordComponent extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }

  handleChange(e: any) {
    const target = e.target;
    const name = target.name;
    this.setState({ [name]: e.target.value });
  }
  handleConfirmPassword(e: any) {
    if (e.target.value !== this.state.newPassword) {

    }
  }

  passwordChange() {
    if ( this.state.newPassword === this.state.confirmNewPassword) {
      // this.props.passwordChange();
    }
  }

  render() {
    return (
      <ModalComponent
        show={}
        close={}
        title={'Change Password'}
      >
        <FormGroup controlId="password">
          <ControlLabel>Old Password</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            name="password"
          />
        </FormGroup>
        <FormGroup controlId="newPassword">
          <ControlLabel>new Password</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            name="newPassword"
          />
          <ControlLabel>confirm new Password</ControlLabel>
          <FormControl
            onChange={this.handleConfirmPassword}
            name="confirmNewPassword"
          />
        </FormGroup>
        <Button
          onClick={this.passwordChange}
        >
          Change Password
        </Button>
      </ModalComponent>
    );
}
}