import * as React from 'react';
import Toggle from 'react-toggle';

import { ModalComponent } from './modalComponent';
import { ShareUserToList } from '../../forms/shareUserToList';
import { ModalShareCheckListTableComponent } from './modalShareCheckListTableComponent';
import IShareCheckListModalComponentProps
  from '../../../componentProps/modalWindowProps/shareCheckListModalComponentProps';
import { usersAccess } from '../../../mocks/dashboarModalUsersAccessTableMock';

export class ShareCheckListModalComponent extends React.Component<IShareCheckListModalComponentProps, any> {
  handleChange = ( e: any ) => {
    this.setState( {
      tofuIsReady: e.target.checked
    } );
  };

  constructor( props: any ) {
    super( props );
    this.state = {
      tofuIsReady: false,
    };
  }

  render() {
    return (
      <ModalComponent
        show={this.props.show}
        title={`Share `}
        close={this.props.closeModalShare}
      >
        <label className="modal-toggle-label">
          <Toggle
            // defaultChecked={this.state.tofuIsReady}
            checked={this.state.tofuIsReady}
            icons={false}
            onChange={this.handleChange}
          />
          <span className="modal-toggle-text"> Is list public (available for all users)</span>
        </label>
        <span>Users to share list:</span>
        <ShareUserToList
          closeModalShare={this.props.closeModalShare}
        />
        <hr/>
        <span>Users who has access:</span>
        <ModalShareCheckListTableComponent
          users={usersAccess}
        />
      </ModalComponent>
    );
  }
}