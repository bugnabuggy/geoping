export const validate = ( values: any ) => {
  const errors: any = {};
  if ( !values.login ) {
    errors.login = 'required to be filled out';
  }
  if ( values.password ) {
    if ( values.password.length < 8 ) {
      errors.password = 'password must be longer than 7 symbols';
    }
  } else {
    errors.password = 'required to be filled out';
  }
  return errors;
};
