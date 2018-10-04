import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';

import { Table } from 'react-bootstrap';
import ITableHistoryDashboardProps from '../componentProps/tablesProps/tableHistoryDashboardProps';
import { ITableHistoryType } from '../DTO/types/stateTypes/tableHistoryStateType';

export class TableHistoryDashboard extends React.Component<ITableHistoryDashboardProps, any> {

  renderRowTable = () => {
    const rows: Array<any> = this.props.history.map ( ( item: ITableHistoryType, index: number ) => {
      return (
        <React.Fragment
          key={uuidV4 ()}
        >
          <tr>
            <td>{item.dateTime}</td>
            <td>{item.latLng}</td>
            <td>{item.checkList}</td>
            <td>{item.apporxAddress}</td>
          </tr>
        </React.Fragment>
      );
    } );

    return rows;
  };

  render() {
    return (
      <React.Fragment>
        <Table
          hover={true}
          condensed={true}
          striped={true}
          responsive={true}
        >
          <thead>
          <tr>
            <th>Date Time</th>
            <th>Lattitude / Longitude</th>
            <th>Checklist</th>
            <th>Apporx. address</th>
          </tr>
          </thead>
          <tbody>
          {this.renderRowTable ()}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}