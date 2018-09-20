import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import profileReducer, {load} from '../../../reducers/profileReducer';
import {loadProfileData} from '../../../actions/profileAction';
import {load as loadAc} from '../../../reducers/profileReducer';
import {validate} from '../../../validations/userProfileValidate';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  * as ReactTooltip  from 'react-tooltip';

const data = {smt: 'as'};

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
let readOnlyLogin = (props :any) => {
  return (
    <FormGroup>
      <ControlLabel >{props.labelName}</ControlLabel>{' '}
      <FormControl

        type = 'text'
        disabled
        value={''}
      />
    </FormGroup>
    )
};
const emailField =  (props :any) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        type = 'email'
        placeholder = {props.placeholder}
      />
    </FormGroup>
  )
};
const phoneField =  (props :any) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        placeholder = {'xxx-xxx-xxxx'}
        type = 'tel'
        pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}'
      />
      <ReactTooltip  disable={!(props.meta.touched && (props.meta.error ))} delayHide={500} />
    </FormGroup>
  )
};
const nameField =  (props :any) => {
  return (
    <FormGroup>
      <ControlLabel>{props.labelName}</ControlLabel>{' '}
      <FormControl
        {...props.input}
        type = 'text'
        placeholder = {props.placeholder}
      />
    </FormGroup>
  )
};

function profileForm(props: any): any {
  const {handleSubmit}  = props;
  return(

    <form className = 'profile-form'>
      <Field
        component = {readOnlyLogin}
        name = 'login'
        labelName = 'Login'
      />
      <Field
        component = {nameField}
        name = 'FullName'
        labelName = 'Full Name'
      />
      <Field
        component = {emailField}
        name = 'email'
        labelName = 'Email'
      />
      <Field
        component = {phoneField}
        name = 'phone'
        labelName = 'Mobile Phone'
      />
      <Button
      onClick={() => load(data)}>
        load
      </Button>
      <Button
        bsStyle = "primary"
        type = "submit"
        onClick = {handleSubmit}
      >
        Change Password
        {console.log(props)}
      </Button>
    </form>
  );
}
const profileReduxForm: any = connect(profileReducer, {load: loadAc})(
reduxForm({
  form: 'profile',
  validate
})((profileForm))
);

// const some = connect()readOnlyLogin = connect(
//   state => ({
//     initialValues: state.account.data // pull initial values from account reducer
//   }),
//   { load: loadAccount }               // bind account loading action creator
// )(readOnlyLogin);

export default profileReduxForm;