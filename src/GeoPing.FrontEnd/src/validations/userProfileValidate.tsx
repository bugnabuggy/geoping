import { validationEmail, validationPhone } from '../constants/regExpConstants';

export const validate = ( values: any) => {
  const errors: any = {};
  if (!values.fullName) {
    errors.fullName = 'required to be filled out';
  }

  if (!values.email) {
    errors.email = 'required to be filled out';
  }
  if (values.email && !validationEmail.test(values.email)) {
    errors.email = 'Invalid email Address';
  }

  if (!values.phone) {
    errors.phone = 'please specify your phone number';
  }
  if (values.phone && !validationPhone.test(values.phone)) {
    errors.phone = 'please match the request format';
  }

  return errors;
};