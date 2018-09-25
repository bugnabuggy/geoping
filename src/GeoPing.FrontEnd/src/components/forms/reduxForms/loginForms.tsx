import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/loginFormValidate';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <div className="form-input-container">
        <FormControl
          {...props.input}
          type={(props.labelName === 'Password') ? 'password' : 'text'}
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
  return (
    <form className="login-form">
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
      />
      <span className="psw-span">
        <a href="/resetpassword">forgot</a>
      </span>
      <Field
        component={renderInput}
        name="password"
        labelName="Password"
      />
      <span className="reg-span">
        <a href="/register">register account</a>
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
  );
}

const LoginReduxForm: any = reduxForm ( {
  form: 'login',
  validate
} ) ( ( LoginForms ) );

export default LoginReduxForm;
