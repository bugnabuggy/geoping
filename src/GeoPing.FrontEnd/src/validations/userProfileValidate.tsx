export const validate = ( values: any) => {
  const errors: any = {};
  if (!values.fullName) {
    errors.fullName = 'required to be filled out';
  }

  if (!values.email) {
    errors.email = 'required to be filled out';
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email Address';
  }

  if (!values.phone) {
    errors.phone = 'please specify your phone number';
  }
  if (values.phone && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i.test(values.phone)) {
    errors.phone = 'please match the request format';
  }

  return errors;
};