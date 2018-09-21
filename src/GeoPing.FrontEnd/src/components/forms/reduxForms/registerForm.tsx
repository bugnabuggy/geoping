import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/registerFormValidate';
import { FormControl, FormGroup, ControlLabel, Checkbox,  Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReCAPTCHA from 'react-google-recaptcha';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <div className="form-input-container">
        <FormControl
          {...props.input}
          type={(props.labelName === 'Password') || (props.labelName === 'Confirm Password') ? 'password' : 'text'}
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
const termsOfService = () => {
  return (
       <Checkbox readOnly={true}>
         Aggre to the terms of service
       </Checkbox>
  );
};

function onChange(value: any) {
return true;
}

function registerForms(props: any): any {
  const {handleSubmit}  = props;
  return(
    <form className="register-form">
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
      />
      <Field
        component={renderInput}
        name="email"
        labelName="Email"
      />
      <Field
        component={renderInput}
        name="password"
        labelName="Password"
      />
      <Field
        component={renderInput}
        name="confirmPassword"
        labelName="Confirm Password"
      />
      <Field
        component={termsOfService}
        name="termsOfService"
      />
      <ReCAPTCHA
        onChange={onChange}
        z-index="1"
        sitekey="6LcJA3AUAAAAAPnLVNeX96LdBvtBHiFx5JQlG9oS"
      />
      <Button
        bsStyle="primary"
        type="submit"
        className="register-btn"
        onClick={handleSubmit}
      >
        Register
      </Button>
    </form>
  );
}
const registerReduxForm: any = reduxForm({
  form: 'register',
  validate

})((registerForms));
export default registerReduxForm;