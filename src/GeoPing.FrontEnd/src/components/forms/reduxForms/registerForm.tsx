import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/registerFormValidate';
import { Button, Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReCAPTCHA from 'react-google-recaptcha';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <div className="form-input-container">
        <FormControl
          {...props.input}
          type={props.type}
          placeholder={props.placeholder}
          data-tip={props.meta.error}
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
const termsOfService = ( props: any ) => {
  return (
    <div className="form-input-container">
      <Checkbox
        {...props.input}
        type={props.type}
      >
        {props.label}
      </Checkbox>
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
  );
};

const recaptcha = ( props: any ) => {
  return (
    <div className="form-input-container">
      <ReCAPTCHA
        onChange={props.input.onChange}
        z-index="1"
        sitekey="6LcJA3AUAAAAAPnLVNeX96LdBvtBHiFx5JQlG9oS"
      />
      <div className="form-icon-container">
        {props.meta.touched ?
          props.meta.error ?
            <FontAwesomeIcon icon={timesCircleIcon} className="form-icon-times"/>
            :
            null
          :
          null
        }
        {props.meta.touched &&
        !props.meta.active &&
        props.meta.error &&
        <div className="tooltip_form">{props.meta.error}</div>}
      </div>
    </div>
  );
};

function registerForms( props: any ): any {
  const { handleSubmit } = props;
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
        type="text"
      />
      <Field
        component={renderInput}
        name="email"
        labelName="Email"
        type="email"
      />
      <Field
        component={renderInput}
        name="password"
        labelName="Password"
        type="password"
      />
      <Field
        component={renderInput}
        name="confirmPassword"
        labelName="Confirm Password"
        type="password"
      />
      <Field
        component={termsOfService}
        name="termsOfService"
        type="checkbox"
        label="Agree to the terms of service"
      />
      <Field
        component={recaptcha}
        name="captcha"
      />
      <Button
        bsStyle="primary"
        type="submit"
        className="register-btn"
      >
        Register
      </Button>
    </form>
  );
}

const registerReduxForm: any = reduxForm( {
  form: 'register',
  validate,
} )( ( registerForms ) );
export default registerReduxForm;