export const validate = ( values: any) => {
  const errors: any = {};
  if (!values.phone) {
    errors.phone = 'please specify your phone number'
  }
  return errors;
};