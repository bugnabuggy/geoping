import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import {validate} from '../../../validations/registerFormValidate'
import { FormControl, FormGroup, ControlLabel, Checkbox,  Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  * as ReactTooltip  from 'react-tooltip';
import ReCAPTCHA from 'react-google-recaptcha';

const renderInput = ( props: any) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        type = 'text'
        placeholder = {props.placeholder}
        data-tip = {props.meta.error}
      />
      <ReactTooltip  disable={!(props.meta.touched && (props.meta.error ))} delayHide={500} />
      {!props.meta.error &&
      <div className="isValid-check" >
          <FontAwesomeIcon icon="check" />
      </div>}

    </FormGroup>
  );
};
const termsOfService = () => {
  return (
       <Checkbox readOnly>
         Aggre to the terms of service
       </Checkbox>
  );
};

function onChange(value: any) {

}

function registerForms(props: any): any {
  const {handleSubmit}  = props;
  return(
    <form className = 'register-form'>
      <Field
        component = {renderInput}
        name = 'login'
        labelName = 'Login'
      />
      <Field
        component = {renderInput}
        name = 'email'
        labelName = 'Email'
      />
      <Field
        component = {renderInput}
        name = 'password'
        labelName = 'Password'
      />
      <Field
        component = {renderInput}
        name = 'confirmPassword'
        labelName = 'Confirm Password'
      />
      <Field
        component = {termsOfService}
        name ='termsOfService'
      />
      <ReCAPTCHA
        onChange={onChange}
        sitekey="6LcJA3AUAAAAAPnLVNeX96LdBvtBHiFx5JQlG9oS"
      />
      <Button
        bsStyle = "primary"
        type = "submit"
        onClick = {handleSubmit}
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