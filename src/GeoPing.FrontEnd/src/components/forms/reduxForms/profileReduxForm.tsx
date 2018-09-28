import * as React from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form';
// import { loadProfileData } from '../../../actions/profileAction';
import { validate } from '../../../validations/userProfileValidate';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const output = (props: any) => {
  switch (props.labelName) {
    case 'Login':
      return (
        <FormControl
          {...props.input}
          type="input"
          disabled={true}
        />
      );
    case 'Email':
      return (
        <FormControl
          {...props.input}
          type="email"
          placeholder={props.placeholder}
        />
      );
    case 'Mobile Phone':
      return (
        <FormControl
          {...props.input}
          placeholder={'xxx-xxx-xxxx'}
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
      );
    case 'Full Name':
      return (
        <FormControl
          {...props.input}
          type="text"
          placeholder={props.placeholder}
        />
      );
    case 'Account Type':
      return (
        <div className="form-control">{props.input.value}</div>
      );
    default:
      return (
        <FormControl
          {...props.input}
        />
    );
  }
};
const renderInput = (props: any) => {
  return (
    <FormGroup>
      <ControlLabel className="control-profile-label" >{props.labelName}</ControlLabel>{' '}
      {output(props)}
    </FormGroup>
    );
};

function profileForm(props: any): any {
  const {handleSubmit} = props;
  return(
    <form className="profile-form">
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
      />
      <Field
        component={renderInput}
        name="fullName"
        labelName="Full Name"
      />
      <Field
        component={renderInput}
        name="email"
        labelName="Email"
      />
      <Field
        component={renderInput}
        name="phone"
        labelName="Mobile Phone"
      />
      <Field
        component={renderInput}
        name="accountType"
        labelName="Account Type"
      />
      <Button
        bsStyle="primary"
        type="button"
      >
        Change Password
      </Button>
      <Button
        bsStyle="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit changes
      </Button>
    </form>
  );
}
const profileReduxForm: any = reduxForm({
  form: 'profile',
  validate
})((profileForm));

export default profileReduxForm;