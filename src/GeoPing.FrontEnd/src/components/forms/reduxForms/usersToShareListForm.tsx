import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'throttle-debounce';
import * as Autosuggest from 'react-autosuggest';

import { validateFieldEmailListUserShare } from '../../../validations/emailListUserShare';

function autocomplite( value: any, callBackAutocompleted: any ) {
  callBackAutocompleted( value );
}

const _debounce = debounce( 1000, autocomplite );

function renderAutocompleteItem( suggestion: any ) {
  return (
    <div>
      {suggestion.fullName || suggestion.userName}
    </div>
  );
}

function component( props: any ) {
  const { input, meta: { touched, error, valid, visited, active } }: any = props;
  if ( active && input.value.length > 2 ) {
    _debounce( input.value, props.autocompletedListUsers );
  }
  const getSuggestionValue = ( suggestion: any ) => {
    input.onChange( suggestion.fullName.trim() || suggestion.userName );
    return suggestion.fullName.trim() || suggestion.userName;
  };
  const onSuggestionsFetchRequested = ( sug: any ) => {
    console.info( 'onSuggestionsFetchRequested', sug );
  };
  const inputProps: any = {
    ...input,
    placeholder: 'Enter user email or login',
  };
  return (
    <React.Fragment>
      <div className="field-to-share-list-container">
        {/*<Input*/}
        {/*{...input}*/}
        {/*type="email"*/}
        {/*placeholder="user email or login"*/}
        {/*className="field-to-share-list"*/}
        {/*invalid={touched && !!error}*/}
        {/*autoComplete="off"*/}
        {/*/>*/}
        {/*{props.show && props.show.value && input.value.length > 2 &&*/}
        {/*<div className="field-to-share-list-autocompleted-users">*/}
        {/*<ul>*/}
        {/*{renderAutocompleteItem( props.autocompleteUsers, clickItem )}*/}
        {/*</ul>*/}
        {/*</div>*/}
        <Autosuggest
          getSuggestionValue={getSuggestionValue}
          inputProps={...inputProps}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={props.clearAutocompleteListUsers}
          renderSuggestion={renderAutocompleteItem}
          suggestions={props.autocompleteUsers}
        />
        {/*}*/}
        {touched && error && <FormText className="field-to-share-list-error">{error}</FormText>}
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
        {fields.map( ( user: any, index: number ) => {
          return (
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
                autocompletedListUsers={props.autocompletedListUsers}
                autocompleteUsers={props.autocompleteUsers}
                clearAutocompleteListUsers={props.clearAutocompleteListUsers}
              />
            </li>
          );
        } )}
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
        autocompletedListUsers={props.getAutocompletedListUsers}
        autocompleteUsers={props.sharedCheckList.autocompleteUsers}
        clearAutocompleteListUsers={props.clearAutocompleteListUsers}
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
