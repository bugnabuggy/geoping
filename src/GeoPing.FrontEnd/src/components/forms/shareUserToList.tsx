import * as React from 'react';
import IShareUserToListProps from '../../componentProps/shareUserToListProps';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidV4 } from 'uuid';
import { IUsersDataList } from '../../types/stateTypes/sharedCheckListStateType';
import { AutocompleteComponent } from '../filterComponents/autocompleteComponent';

export class ShareUserToList extends React.Component<IShareUserToListProps, any> {
  constructor( props: IShareUserToListProps ) {
    super( props );
    props.changeCountUser( [ { id: uuidV4(), identifier: '', autocompleteUsers: [] } ] );
  }

  sendUsersData = () => {
    const usersData: Array<string> = this.props.sharedCheckList.usersDataList.map( item => {
      return item.identifier;
    } );
    this.props.handleSubmit( usersData );
  };
  addUser = () => {
    const usersDataList: Array<IUsersDataList> = [
      ...this.props.sharedCheckList.usersDataList,
      {
        id: uuidV4(),
        identifier: '',
        autocompleteUsers: [],
      }
    ];
    this.props.changeCountUser( usersDataList );
  };
  deleteUser = ( id: string ) => {
    const usersDataList: Array<IUsersDataList> = [
      ...this.props.sharedCheckList.usersDataList.filter( item => item.id !== id ),
    ];
    this.props.changeCountUser( usersDataList );
  };
  _renderUserField = () => {
    const usersField: Array<React.ReactNode> =
      this.props.sharedCheckList.usersDataList.map( ( item, index: number ) => {
        return (
          <div
            key={`userField.[${item.id}]`}
            className="field-to-share-list-li"
          >
            {this.props.sharedCheckList.usersDataList.length > 1 && index !== 0 &&
            <div
              className="field-to-share-list-icon-minus cursor-pointer"
              onClick={() => {
                this.deleteUser( item.id );
              }}
            >
              <FontAwesomeIcon icon="minus"/>
            </div>
            }
            <div className="field-to-share-list-container">
              <AutocompleteComponent
                userData={item}
                sharedCheckList={this.props.sharedCheckList}

                changeUserData={this.props.changeUserData}
                getAutocompletedListUsers={this.props.getAutocompletedListUsers}
              />
              <React.Fragment>
                <FontAwesomeIcon icon="user-plus" className="field-to-share-list-icon cursor-pointer"/>
              </React.Fragment>
            </div>
          </div>
        );
      } );
    return usersField;
  };

  render() {
    return (
      <React.Fragment>
        {/*<ShareUserReduxForm*/}
        {/*sharedCheckList={this.props.sharedCheckList}*/}

        {/*closeModalShare={this.props.closeModalShare}*/}
        {/*onSubmit={this.props.handleSubmit}*/}
        {/*getAutocompletedListUsers={this.props.getAutocompletedListUsers}*/}
        {/*clearAutocompleteListUsers={this.props.clearAutocompleteListUsers}*/}
        {/*/>*/}
        <div>
          {this._renderUserField()}
          <div
            onClick={this.addUser}
            className="add-user-to-share-list"
          >
            <FontAwesomeIcon
              icon="plus-circle"
              className="add-user-to-share-list-icon cursor-pointer"
            />
          </div>
          <div className="modal-share-form-buttons">
            <Button
              type="submit"
              color="primary"
              onClick={this.sendUsersData}
            >
              Send invitations
            </Button>
            <Button
              onClick={this.props.closeModalShare}
              color="default"
            >
              Close
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}