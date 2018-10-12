import { validationEmail } from '../constants/regExpConstants';

export function validateFieldEmailListUserShare( value: any ) {

  const regEmail: RegExp = validationEmail;
  let error: any = {};
  if ( !value.users || !value.users.length ) {
    // console.log('value.users', value.users);
  } else {
    const usersError: any = [];
    for ( const index in value.users ) {
      if ( !regEmail.test( value.users[ index ].email ) ) {
        usersError[ index ] = { email: 'no user int hte system, will send invitation' };
      }
    }
    if ( usersError.length ) {
      error.users = usersError;
    }
  }
  return error;
}