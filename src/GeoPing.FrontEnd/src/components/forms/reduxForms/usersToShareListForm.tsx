import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { validateFieldEmailListUserShare } from '../../../validations/emailListUserShare';

function component( props: any ) {
  const { input, meta: { touched, error, valid, visited, active } }: any = props;

  return (
    <React.Fragment>
      <div className="field-to-share-list-container">
        <Input
          {...input}
          type="email"
          placeholder="user email"
          className="field-to-share-list"
          invalid={touched && error}
        />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
        {( visited && !active ) && valid ? (
            <div>
              <FontAwesomeIcon
                icon="check"
                className="field-to-share-list-icon field-to-share-list-icon-check cursor-pointer"
              />
            </div>
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

function fieldUser( props: any ) {
  const { fields }: any = props;
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
    <form onSubmit={handleSubmit}>
      <FieldArray
        name="users"
        component={fieldUser}
      />
      <div className="modal-share-form-buttons">
        <Button
          type="submit"
          color="primary"
        >
          Send invitations
        </Button>
        <Button
          onClick={props.closeModalShare}
          color="default"
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