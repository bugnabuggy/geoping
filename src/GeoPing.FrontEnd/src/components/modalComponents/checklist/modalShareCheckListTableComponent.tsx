import * as React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidV4 } from 'uuid';
import IModalShareCheckListTableComponentProps
  from '../../../componentProps/modalComponentProps/modalShareCheckListTableComponentProps';
import { PulseLoader } from 'react-spinners';
import IUserWithAccessDTO from '../../../DTO/userWitchAccessDTO';

export class ModalShareCheckListTableComponent extends React.Component<IModalShareCheckListTableComponentProps, any> {

  renderUserWhoHasAccess = () => {
    const elements: Array<any> = this.props.sharedCheckList.listUsersWitchAccess.map( ( item: IUserWithAccessDTO ) => {
      const name: string = item.firstName && item.lastName ?
        `${item.firstName} ${item.lastName}`
        :
        item.userName;
      return (
        <tr key={uuidV4()}>
          <td>
            {name}
          </td>
          <td>
            {item.sharingStatus}
          </td>
          <td>
            <div
              onClick={() => {
                this.props.removeAccessUserForList( item.sharingId );
              }}
            >
              <FontAwesomeIcon icon="minus-circle" className="cursor-pointer minus-circle"/>
            </div>
          </td>
        </tr>
      );
    } );

    return elements;
  };

  render() {
    return (
      <div className="user-access-table-container">
        <Table
          hover={true}
          condensed={true}
          striped={true}
          responsive={true}
        >
          <thead/>
          <tbody>
          {this.props.sharedCheckList.isLoading ?
            (
              <tr>
                <td>
                  <div className="container-spinner-center">
                    <PulseLoader
                      sizeUnit="px"
                      size={15}
                      margin="4px"
                      color={'#a9a9a9'}
                      loading={this.props.sharedCheckList.isLoading}
                    />
                  </div>
                </td>
              </tr>
            )
            :
            this.props.sharedCheckList.listUsersWitchAccess.length > 0 ?
              this.renderUserWhoHasAccess()
              :
              (
                <tr>
                  <td>
                    No records
                  </td>
                </tr>
              )
          }
          </tbody>
        </Table>
      </div>
    );
  }
}