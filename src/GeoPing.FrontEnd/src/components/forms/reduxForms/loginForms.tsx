import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
//import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

function LoginForms( props: any ): any {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login">login</label>
                <Field name="login" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <Field name="password" component="input" type="text"/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
const LoginReduxForm: any= reduxForm({
    form: 'login'
})((LoginForms));

export default LoginReduxForm
