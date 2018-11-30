import * as React from 'react';
import ShareUserReduxForm from './reduxForms/usersToShareListForm';
import IShareUserToListProps from '../../componentProps/shareUserToListProps';

export class ShareUserToList extends React.Component<IShareUserToListProps, any> {

  render() {
    return (
      <ShareUserReduxForm
        sharedCheckList={this.props.sharedCheckList}

        closeModalShare={this.props.closeModalShare}
        onSubmit={this.props.handleSubmit}
        getAutocompletedListUsers={this.props.getAutocompletedListUsers}
        clearAutocompleteListUsers={this.props.clearAutocompleteListUsers}
      />
    );
  }
}