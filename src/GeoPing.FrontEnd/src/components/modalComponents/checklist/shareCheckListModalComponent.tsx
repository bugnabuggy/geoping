import * as React from 'react';
import Toggle from 'react-toggle';

import { ModalComponent } from './modalComponent';
import { ShareUserToList } from '../../forms/shareUserToList';
import { ModalShareCheckListTableComponent } from './modalShareCheckListTableComponent';
import IShareCheckListModalComponentProps from '../../../componentProps/shareCheckListModalComponentProps';
import { IGeoListForUpdateDTO } from '../../../DTO/geoListDTO';

export class ShareCheckListModalComponent extends React.Component<IShareCheckListModalComponentProps, any> {
  constructor( props: any ) {
    super( props );
  }

  handleChange = ( e: any ) => {
    // this.props.providePublicAccess(this.props.myCheckList.idCheckListShow, e.target.checked);
    const checkList: IGeoListForUpdateDTO = {
      IsPublic: e.target.checked,
      Description: this.props.checkList.selectedGeoList.description,
      Name: this.props.checkList.selectedGeoList.name,
    };
    this.props.updateCheckList( this.props.checkList.selectedGeoList.id, checkList );
  };

  handleSubmit = ( e: any ) => {
    const users: Array<string> = e.users.map( ( item: any ) => item.email );
    this.props.sendAccessUsersForCheckList( this.props.myCheckList.idCheckListShow, users );
  };

  componentDidMount() {
    this.props.loadUsersForShared( this.props.myCheckList.idCheckListShow );
  }

  componentWillUnmount() {
    this.props.clearSharedCheckList();
  }

  render() {
    const checked: boolean = this.props.checkList.selectedGeoList.isPublic;
    // .find( item => item.id === this.props.myCheckList.idCheckListShow).public;
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
          sharedCheckList={this.props.sharedCheckList}

          closeModalShare={this.props.closeModalShare}
          handleSubmit={this.handleSubmit}
          getAutocompletedListUsers={this.props.getAutocompletedListUsers}
          clearAutocompleteListUsers={this.props.clearAutocompleteListUsers}
        />
        <hr/>
        <span>Users who has access:</span>
        <ModalShareCheckListTableComponent
          sharedCheckList={this.props.sharedCheckList}
        />
      </ModalComponent>
    );
  }
}
