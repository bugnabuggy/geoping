import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/userProfileValidate';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const output = ( props: any ) => {
  switch ( props.labelName ) {
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
    case 'First Name':
      return (
        <FormControl
          {...props.input}
          type="text"
          placeholder={props.placeholder}
        />
      );
      case 'Last Name':
      return (
        <FormControl
          {...props.input}
          type="text"
          placeholder={props.placeholder}
        />
      );
      case 'Birthday':
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
const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel className="control-profile-label">{props.labelName}</ControlLabel>{' '}
      <div className="form-input-container">
        {output( props )}
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

function profileForm( props: any ): any {
  const { handleSubmit,  } = props;
  return (
    <form className="profile-form">
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
      />
      <Field
        component={renderInput}
        name="firstName"
        labelName="First Name"
      />
      <Field
        component={renderInput}
        name="lastName"
        labelName="Last Name"
      />
      <Field
        component={renderInput}
        name="birthday"
        labelName="Birthday"
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
        onClick={props.showModalChangePassword}
      >
        Change Password
      </Button>
      <Button
        bsStyle="primary"
        type="submit"
        className="profile-flex-btn"
        onClick={handleSubmit}
      >
        Submit changes
      </Button>
    </form>
  );
}

const profileReduxForm: any = reduxForm( {
  form: 'profile',
  validate
} )( ( profileForm ) );

export default profileReduxForm;