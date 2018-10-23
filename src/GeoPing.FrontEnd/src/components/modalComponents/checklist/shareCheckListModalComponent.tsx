import * as React from 'react';
import Toggle from 'react-toggle';

import { ModalComponent } from './modalComponent';
import { ShareUserToList } from '../../forms/shareUserToList';
import { ModalShareCheckListTableComponent } from './modalShareCheckListTableComponent';
import IShareCheckListModalComponentProps from '../../../componentProps/shareCheckListModalComponentProps';

export class ShareCheckListModalComponent extends React.Component<IShareCheckListModalComponentProps, any> {
  constructor( props: any ) {
    super ( props );
  }

  componentDidMount() {
    this.props.loadUsersForShared( this.props.myCheckList.idCheckListShow );
  }
  componentWillUnmount() {
    this.props.clearSharedCheckList();
  }

  handleChange = ( e: any ) => {
    this.props.providePublicAccess(this.props.myCheckList.idCheckListShow, e.target.checked);
  };

  handleSubmit = ( e: any) => {
    this.props.sendAccessUsersForCheckList( this.props.myCheckList.idCheckListShow, e.users );
  };

  render() {
    const checked: boolean = this.props.myCheckList.checkLists
      .find( item => item.id === this.props.myCheckList.idCheckListShow).public;
    return (
      <ModalComponent
        show={this.props.myCheckList.isShowModalShare}
        title={`Share `}
        close={this.props.closeModalShare}
      >
        <label className="modal-toggle-label">
          <Toggle
            defaultChecked={checked}
            icons={false}
            onChange={this.handleChange}
          />
          <span className="modal-toggle-text"> Is list public (available for all users)</span>
        </label>
        <span>Users to share list:</span>
        <ShareUserToList
          closeModalShare={this.props.closeModalShare}
          handleSubmit={this.handleSubmit}
        />
        <hr/>
        <span>Users who has access:</span>
        <ModalShareCheckListTableComponent
          users={this.props.sharedCheckList.listUsersWitchAccess}
        />
      </ModalComponent>
    );
  }
}
