import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import {validate} from '../../../validations/loginFormValidate'
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import  * as ReactTooltip  from 'react-tooltip';

const renderInput = ( props: any) => {
  return (
    <FormGroup>
      {console.log('1',props)}
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        type = {(props.labelName === 'login' ? 'text' : 'password')}
        placeholder={props.placeholder}
        data-tip={props.meta.error}
      />
      <ReactTooltip  disable={!(props.meta.touched && (props.meta.error ))} delayHide={500} />
    </FormGroup>
  );
};

function LoginForms( props: any ): any {
  const { handleSubmit } = props;
  return (
    <form className='login-form'>
      <Field
        component={renderInput}
        name='login'
        labelName='login'
      />
      <span className= 'psw-span'>
        <a href='/resetpassword'>forgot</a>
      </span>
      <Field
        component={renderInput}
        name='password'
        labelName='password'
      />
      <span className='reg-span'>
        <a href='/register'>register account</a>
      </span>
      <Button
        bsStyle="primary"
        className='login-btn'
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
    );
}
const LoginReduxForm: any= reduxForm({
  form: 'login',
  validate
})((LoginForms));

export default LoginReduxForm
