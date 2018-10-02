import * as React from 'react';

import NewUserReduxForm from './reduxForms/Sample.addNewUserWishList';
import { componentFormMap } from '../../mapForComponents/Sample.reduxFormWishListNewUser';

interface IAddNewUserFormProps {
  specialty: any;
}

class AddNewUserForm extends React.Component<IAddNewUserFormProps, any> {
  handleSubmit = ( values: any ) => {
    // console.log ( values );
  };

  constructor( props: any ) {
    super( props );
  }

  render() {

    const initial = {
      'user_name': 'Name',
      'specialty_list_Id': 'tik'
    };

    return (
      <NewUserReduxForm
        initialValues={initial}
        componentFormMap={componentFormMap}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddNewUserForm;
