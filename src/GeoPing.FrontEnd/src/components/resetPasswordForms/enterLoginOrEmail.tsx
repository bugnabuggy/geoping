import * as React from 'react';
import IEnterLoginOrEmailProps from '../../componentProps/enterLoginOrEmailProps';
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';

export class EnterLoginOrEmail extends React.Component<IEnterLoginOrEmailProps, any> {
  handleRecaptcha = ( e: any ) => {
    console.info( 'e', e );
    this.setState( { captcha: e, isCaptcha: false } );
  };
  handleLoginOrEmail = ( e: any ) => {
    this.setState( { loginOrEmail: e.target.value, isLoginOrEmail: false } );
  };
  handleSubmit = () => {
    if ( !this.state.loginOrEmail ) {
      this.setState({isLoginOrEmail: true});
    } else if ( !this.state.captcha ) {
      this.setState({isCaptcha: true});
    } else {
      console.info('Ok');
      this.props.sendLoginOrEmail( this.state.loginOrEmail );
    }
  };

  constructor( props: IEnterLoginOrEmailProps ) {
    super( props );
    this.state = {
      captcha: '',
      loginOrEmail: '',
      isLoginOrEmail: false,
      isCaptcha: false,
    };
  }

  render() {
    return (
      <Card className="reset-password-form-1">
        <CardBody>
          <FormGroup>
            <Label>Login or Email</Label>
            <Input
              onChange={this.handleLoginOrEmail}
            />
          </FormGroup>
          <div className="form-input-container form-input-container-captcha">
            <ReCAPTCHA
              onChange={this.handleRecaptcha}
              z-index="1"
              sitekey="6LcJA3AUAAAAAPnLVNeX96LdBvtBHiFx5JQlG9oS"
            />
          </div>
          <div className="reset-password-form1-button-container">
            <Button
              onClick={this.handleSubmit}
              color="primary"
            >
              Reset password
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
