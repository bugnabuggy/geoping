import { validationEmail } from '../constants/regExpConstants';

export const validate = ( values: any ) => {
  const errors: any = {};
  if ( !values.login ) {
    errors.login = 'required to be filled out';
  }
  if ( !values.email ) {
    errors.email = 'required to be filled out';
  }

  if ( values.email && !validationEmail.test( values.email ) ) {
    errors.email = 'Invalid email Address';
  }
  if ( !values.password ) {
  //   if ( values.password.length < 8 ) {
  //     errors.password = 'password must be longer than 7 symbols';
  //   }
  // } else {
    errors.password = 'required to be filled out';
  }
  if ( values.confirmPassword ) {
    // if ( values.confirmPassword.length < 8 ) {
    //   errors.confirmPassword = 'password must be longer than 7 symbols';
    // }
    if ( values.confirmPassword !== values.password ) {
      errors.confirmPassword = 'not the same';
    }
  } else {
    errors.confirmPassword = 'required to be filled out';
  }
  if ( !values.termsOfService ) {
    errors.termsOfService = 'you must agree to the terms';
  }
  if (!values.captcha) {
    errors.captcha = 'confirm that you are not a robot';
  }
  return errors;
};
