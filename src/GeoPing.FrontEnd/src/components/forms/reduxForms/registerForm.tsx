import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../validations/registerFormValidate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReCAPTCHA from 'react-google-recaptcha';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { ITimeZoneDTO } from '../../../DTO/timeZoneDTO';

const checkCircleIcon: IconLookup = { prefix: 'far', iconName: 'check-circle' };
const timesCircleIcon: IconLookup = { prefix: 'far', iconName: 'times-circle' };

const renderInput = ( props: any ) => {
  return (
    <FormGroup>
      <Label>{props.labelName}</Label>
      <div className="form-input-container">
        <Input
          {...props.input}
          type={props.type}
          placeholder={props.placeholder}
          data-tip={props.meta.error}
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
const renderOptions = ( timeZones: Array<ITimeZoneDTO> ) => {
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
const renderSelect = ( props: any ) => {
  return (
    <FormGroup>
      <Label>{props.labelName}</Label>
      <div className="form-input-container">
        <Input
          {...props.input}
          type={props.type}
          style={{ flex: 2 }}
        >
          {renderOptions( props.options )}
        </Input>
        <div className="tooltip_form-container"/>
      </div>
    </FormGroup>
  );
};
const termsOfService = ( props: any ) => {
  return (
    <div className="form-input-container">
      <Label style={{ flex: 2, marginLeft: '20px' }}>
        <Input
          {...props.input}
          type={props.type}

        />
        {props.label}
      </Label>
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
  );
};

const recaptcha = ( props: any ) => {
  return (
    <div className="form-input-container">
      <div style={{ flex: 2 }}>
        <ReCAPTCHA
          onChange={props.input.onChange}
          z-index="1"
          sitekey="6LcJA3AUAAAAAPnLVNeX96LdBvtBHiFx5JQlG9oS"
        />
      </div>
      <div className="tooltip_form-container">
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
        component={renderSelect}
        name="timeZone"
        labelName="Time zone"
        type="select"
        options={props.timeZones}
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
        color="primary"
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