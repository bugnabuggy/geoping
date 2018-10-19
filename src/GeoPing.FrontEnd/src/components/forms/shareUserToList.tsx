import * as React from 'react';
import ShareUserReduxForm from './reduxForms/usersToShareListForm';
import IShareUserToListProps from '../../componentProps/shareUserToListProps';

export class ShareUserToList extends React.Component<IShareUserToListProps, any> {

  render() {
    return (
      <ShareUserReduxForm
        closeModalShare={this.props.closeModalShare}
        onSubmit={this.props.handleSubmit}
      />
    );
  }
}