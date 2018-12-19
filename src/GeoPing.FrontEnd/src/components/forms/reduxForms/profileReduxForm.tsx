import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate } from '../../../validations/userProfileValidate';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar-edit';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { ITimeZoneDTO } from '../../../DTO/timeZoneDTO';
import ICountriesDTO from '../../../DTO/countriesDTO';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <Label className="control-profile-label">{props.labelName}</Label>
      <div className="form-input-container">
        <Input
          {...props.input}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        <div className="tooltip_form-container">
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
      </div>
    </FormGroup>
  );
};
const renderOptionTimeZone = ( timeZones: Array<ITimeZoneDTO> ) => {
  return timeZones.map( item => {
    const utcTime: number = item.gmtOffset / 3600;
    return (
      <option
        key={`${item.id}_timeZone`}
        value={item.id}
      >
        {`${item.name} (UTC ${utcTime > 0 ? '+' + utcTime : utcTime})`}
      </option>
    );
  } );
};
const renderOptionCountries = ( coutries: Array<ICountriesDTO> ) => {
  return coutries.map( item => {
    return (
      <option
        key={`${item.id}_coutries`}
        value={item.code}
      >
        {item.name}
      </option>
    );
  } );
};
const renderSelect = ( props: any ) => {
  return (
    <FormGroup>
      <Label className="control-profile-label">{props.labelName}</Label>
      <div className="form-input-container">
        <Input
          {...props.input}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
        >
          {props.renderOption( props.option )}
        </Input>
        <div className="tooltip_form-container">
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
        src={props.input.value}
      />
    </div>
  );
};

const renderDate = ( props: any ) => {
  const date: moment.Moment = !!props.input.value ? moment( props.input.value ) : moment();
  return (
    <FormGroup>
      <Label className="control-profile-label">{props.labelName}</Label>
      <div style={{ width: 'calc(100% - 33px)' }}>
        <DatePicker
          selected={date}
          locale="ru"
          onChange={props.input.onChange}
          className="form-control"
          placeholderText="Click to select a date"
        />
      </div>
    </FormGroup>
  );
};

function profileForm( props: any ): any {
  const { handleSubmit, } = props;
  return (
    <form className="profile-form" style={{ width: '100%' }}>
      <Field
        component={renderAvatar}
        name="avatar"
        disabled={true}
      />
      <Button
        color="primary"
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
      />
      <Field
        component={renderSelect}
        name="country"
        labelName="Country"
        type="select"
        placeholder=""
        option={props.window.coutries}
        renderOption={renderOptionCountries}
      />
      <Field
        component={renderSelect}
        name="timeZone"
        labelName="Time zone"
        type="select"
        placeholder=""
        option={props.window.timeZones}
        renderOption={renderOptionTimeZone}
      />
      <Field
        component={renderInput}
        name="accountType"
        labelName="Account Type"
        type="input"
        disabled={true}
      />
      <Button
        color="primary"
        type="button"
        onClick={props.showModalChangePassword}
      >
        Change Password
      </Button>
      <Button
        color="primary"
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
