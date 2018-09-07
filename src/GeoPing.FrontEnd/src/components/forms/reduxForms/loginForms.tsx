import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import {validate} from '../../../validations/loginFormValidate'
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import  * as ReactTooltip  from 'react-tooltip';
function showToolTip() {

}
const renderField = ({ input, label, type, meta: { touched, error } }: any) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} data-tip={error} />
      {      console.log('d',this.props)
      }
      <ReactTooltip  />
    </div>
  </div>
);
function LoginForms( props: any ): any {
  const { handleSubmit } = props;
  return (
    <form className='form-group' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">login</label>
          <Field  name="login" component={renderField} type="text" />
        </div>
      <div>
        <label htmlFor="password">password</label>
        <Field name="password" component={renderField} type="text"/>
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
    );
}
const LoginReduxForm: any= reduxForm({
  form: 'login',
  validate
})((LoginForms));

export default LoginReduxForm
//{touched && (error && <span>{error}</span>) }

