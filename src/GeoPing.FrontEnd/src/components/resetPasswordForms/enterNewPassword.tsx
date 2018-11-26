import * as React from 'react';
import IEnterNewPasswordProps from '../../componentProps/enterNewPasswordProps';
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

export class EnterNewPassword extends React.Component<IEnterNewPasswordProps, any> {
  timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };
  handlePassword = ( e: any ) => {
    this.setState( {
      [ e.target.name ]: e.target.value,
      isNewPasswordEmpty: '',
      isConfirmPasswordEmpty: '',
      isPasswordsNotMatch: '',
    } );
  };
  handleSendPassword = ( e: any ) => {
    if ( !this.state.newPassword ) {
      this.setState( { isNewPasswordEmpty: 'should not be empty' } );
    }
    if ( !this.state.confirmPassword ) {
      this.setState( { isConfirmPasswordEmpty: 'should not be empty' } );
    }
    if ( !this.state.isNewPasswordEmpty && !this.state.isConfirmPasswordEmpty &&
      this.state.newPassword !== this.state.confirmPassword ) {
      this.setState( { isPasswordsNotMatch: 'passwords do not match' } );
    }
    if ( !this.state.isNewPasswordEmpty && !this.state.isConfirmPasswordEmpty &&
      this.state.newPassword && this.state.confirmPassword &&
      this.state.newPassword === this.state.confirmPassword ) {
      this.props.sendNewPassword( this.state.newPassword );
    }
  };

  constructor( props: IEnterNewPasswordProps ) {
    super( props );
    this.state = {
      newPassword: '',
      confirmPassword: '',
      isNewPasswordEmpty: '',
      isConfirmPasswordEmpty: '',
      isPasswordsNotMatch: '',
    };
  }

  render() {
    return (
      <Card>
        <CardBody>
          <FormGroup>
            <Label>Enter new password for your account</Label>
            <div className="form-input-container">
              <Input
                name="newPassword"
                type="password"
                invalid={!!this.state.isNewPasswordEmpty}
                onChange={this.handlePassword}
              />
              {!!this.state.isNewPasswordEmpty &&
              (
                <div className="form-icon-container">
                  <FontAwesomeIcon icon={this.timesCircleIcon} className="form-icon-times"/>
                  <div className="tooltip_form">{this.state.isNewPasswordEmpty}</div>
                </div>
              )
              }
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Confirmation</Label>
            <div className="form-input-container">
              <Input
                name="confirmPassword"
                type="password"
                invalid={!!this.state.isConfirmPasswordEmpty || !!this.state.isPasswordsNotMatch}
                onChange={this.handlePassword}
              />
              {( !!this.state.isConfirmPasswordEmpty || !!this.state.isPasswordsNotMatch ) &&
              (
                <div className="form-icon-container">
                  <FontAwesomeIcon icon={this.timesCircleIcon} className="form-icon-times"/>
                  <div className="tooltip_form">
                    {this.state.isConfirmPasswordEmpty || this.state.isPasswordsNotMatch}
                  </div>
                </div>
              )
              }
            </div>
          </FormGroup>
          <div className="reset-password-form1-button-container">
            <Button
              onClick={this.handleSendPassword}
            >
              Set password
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
