import * as React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidV4 } from 'uuid';
import IModalShareCheckListTableComponentProps
  from '../../../componentProps/modalComponentProps/modalShareCheckListTableComponentProps';

export class ModalShareCheckListTableComponent extends React.Component<IModalShareCheckListTableComponentProps, any> {

  renderUserWhoHasAccess = () => {
    const elements: Array<any> = this.props.users.map( ( item: any ) => {
      return (
        <tr key={uuidV4()}>
          <td>
            {item.name}
          </td>
          <td>
            {item.status}
          </td>
          <td>
            <div
              onClick={() => {
                // console.log ( 'Delete' );
              }}
            >
              <FontAwesomeIcon icon="minus-circle" className="cursor-pointer"/>
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
          {this.renderUserWhoHasAccess()}
          </tbody>
        </Table>
      </div>
    );
  }
}