import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**/
function validateFieldEmailListUserShare( value: any ) {

  const regEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

/**/

function component( props: any ) {
  const { input, meta: { touched, error, valid, visited, active } }: any = props;

  return (
    <React.Fragment>
      <div className="field-to-share-list-container">
        <FormControl
          {...input}
          type="email"
          placeholder="user email"
          className="field-to-share-list"
        />
        {touched && error && <span>{error}</span>}
        {( visited && !active ) && valid ? (
            <React.Fragment>
              <FontAwesomeIcon icon="check" className="field-to-share-list-icon cursor-pointer"/>
            </React.Fragment>
          )
          :
          (
            <React.Fragment>
              <FontAwesomeIcon icon="user-plus" className="field-to-share-list-icon cursor-pointer"/>
            </React.Fragment>
          )
        }
      </div>
    </React.Fragment>
  );
}

function fieldComponent( props: any ) {
  return (
    <Field
      name={`${props.index}.email`}
      component={component}
    />
  );
}

function fieldUser( props: any ) {
  const { fields, meta: { touched, error, submitFailed } }: any = props;
  if ( fields.length === 0 ) {
    fields.push( {} );
  }
  return (
    <React.Fragment>
      <ul>
        {fields.map( ( user: any, index: number ) => (
          <li
            key={index}
            className="field-to-share-list-li"
          >
            {fields.length > 1 && index !== 0 &&
            <div
              className="field-to-share-list-icon-minus cursor-pointer"
              onClick={() => fields.remove( index )}
            >
              <FontAwesomeIcon icon="minus"/>
            </div>
            }
            <Field
              name={`${user}.email`}
              component={component}
            />
          </li>
        ) )}
      </ul>
      <div
        onClick={() => fields.push( {} )}
        className="add-user-to-share-list"
      >
        <FontAwesomeIcon
          icon="plus-circle"
          className="add-user-to-share-list-icon cursor-pointer"
        />
      </div>
    </React.Fragment>
  );
}

function addUserToShareListForm( props: any ): any {
  const { handleSubmit } = props;
  return (
    <form>
      <FieldArray
        name="users"
        component={fieldUser}
        // fields={[{}, {}]}
      />
      <div className="modal-share-form-buttons">
        <Button
        >
          Send invitations
        </Button>
        <Button
          onClick={props.closeModalShare}
        >
          Close
        </Button>
      </div>
    </form>
  );
}

const ShareUserReduxForm: any = reduxForm( {
  form: 'ShareList',
  validate: validateFieldEmailListUserShare,
} )( addUserToShareListForm as any );

export default ShareUserReduxForm;