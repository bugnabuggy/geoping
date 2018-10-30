import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/loginFormValidate';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { registerUrl, resetPassword } from '../../../constants/routes';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };
const _window: any = window;
const gapi: any = _window.gapi;

function googleAuthorizeInit( redirect: ( isRedirect: boolean ) => void, blocking: ( isBlocking: boolean ) => void ) {
  gapi.load( 'auth2', () => {
    const element: any = document.getElementById( 'customBtn' );
    gapi.auth2.init( {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      scope: 'profile email'
    } )
      .attachClickHandler(
        element,
        {},
        ( googleUser: any ) => {
          console.info( 'googleUser', googleUser.Zi );
          localStorage.setItem( 'token', googleUser.Zi.access_token );
          localStorage.setItem( 'token_type', googleUser.Zi.token_type );
          redirect( true );
          blocking( false );
        },
        ( error: any ) => {
          console.info( 'error', error );
        } );
  } );
}

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <div className="form-input-container">
        <FormControl
          {...props.input}
          type={( props.labelName === 'Password' ) ? 'password' : 'text'}
          placeholder={props.placeholder}
        />
        <div className="form-icon-container">
          {props.meta.touched ?
            props.meta.error ?
              <FontAwesomeIcon icon={timesCircleIcon} className="form-icon-times"/>
              :
              <FontAwesomeIcon icon={checkCircleIcon} className="form-icon-check"/>
            :
            null
          }
          {props.meta.touched &&
          !props.meta.active &&
          props.meta.error &&
          <div className="tooltip_form">{props.meta.error}</div>}
        </div>
      </div>
    </FormGroup>
  );
};

function LoginForms( props: any ): any {
  const { handleSubmit } = props;
  props.googleAuthInit( googleAuthorizeInit );
  return (
    <div>
      <form className="login-form">
        <Field
          component={renderInput}
          name="login"
          labelName="Login"
        />
        <span className="psw-span">
          <a href={resetPassword}>forgot</a>
        </span>
        <Field
          component={renderInput}
          name="password"
          labelName="Password"
        />
        <span className="reg-span">
          <a href={registerUrl}>register account</a>
        </span>
        <Button
          bsStyle="primary"
          className="login-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
      <div
        id="customBtn"
        className="google-button cursor-pointer"
        onClick={() => {
          props.windowBlocking( true );
        }}
      >
        <img className="google-button-img" src="/assets/images/google-button.png"/>
      </div>
    </div>
  );
}

const LoginReduxForm: any = reduxForm( {
  form: 'login',
  validate
} )( ( LoginForms ) );

export default LoginReduxForm;
