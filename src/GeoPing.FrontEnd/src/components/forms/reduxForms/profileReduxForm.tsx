import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate } from '../../../validations/userProfileValidate';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar-edit';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <ControlLabel className="control-profile-label">{props.labelName}</ControlLabel>{''}
      <div className="form-input-container">
        <FormControl
          {...props.input}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
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

const renderAvatar = ( props: any ) => {
  return (
    <div className="flex-box-col-avatar">
      <Avatar
        width={290}
        height={195}
        onCrop={props.input.onChange}
        onClose={props.input.onChange}
      />
    </div>
  );
};

const renderDate = ( props: any ) => {
  const date: moment.Moment = moment( props.input.value );
  return (
    <FormGroup>
      <ControlLabel className="control-profile-label">{props.labelName}</ControlLabel>{''}
      <DatePicker
        selected={date}
        locale="ru"
        onChange={props.input.onChange}
        className="form-control"
      />
    </FormGroup>
  );
};

function profileForm( props: any ): any {
  const { handleSubmit, } = props;
  return (
    <form className="profile-form">
      <Field
        component={renderAvatar}
        name="avatar"
        disabled={true}
      />
      <Button
        bsStyle="primary"
        className="profile-flex-btn"
        onClick={props.saveAvatar}
      >
        Save image
      </Button>
      <Field
        component={renderInput}
        name="login"
        labelName="Login"
        type="input"
        disabled={true}
      />
      <Field
        component={renderInput}
        name="firstName"
        labelName="First Name"
        type="text"
      />
      <Field
        component={renderInput}
        name="lastName"
        labelName="Last Name"
        type="text"
      />
      <Field
        component={renderDate}
        name="birthday"
        labelName="Birthday"
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
        name="phoneNumber"
        labelName="Mobile Phone"
        type="tel"
        placeholder="xxx-xxx-xxxx"
      />
      <Field
        component={renderInput}
        name="accountType"
        labelName="Account Type"
        type="input"
        disabled={true}
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