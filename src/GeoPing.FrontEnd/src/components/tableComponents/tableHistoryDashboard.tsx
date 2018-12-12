import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Table } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';

import ITableHistoryDashboardProps from '../../componentProps/tableComponentProps/tableHistoryDashboardProps';
import { ITableHistoryType } from '../../types/stateTypes/tableHistoryStateType';
import moment = require('moment');

export class TableHistoryDashboard extends React.Component<ITableHistoryDashboardProps, any> {

  renderRowTable = () => {
    const rows: Array<any> = this.props.tableHistory.history.map( ( item: ITableHistoryType, index: number ) => {
      const date: string = moment(item.checkInDate).format('LLL');
      return (
        <React.Fragment
          key={uuidV4()}
        >
          <tr>
            <td className="table-history-td">{date}</td>
            <td className="table-history-td">{item.latLng}</td>
            <td className="table-history-td">{item.listName}</td>
            <td className="table-history-td">{item.info}</td>
          </tr>
        </React.Fragment>
      );
    } );

    return rows;
  };

  render() {
    return (
      <div className="table-history-container">
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
          {this.props.tableHistory.isLoading ?
            (
              <tr>
                <td>
                  <div className="container-spinner-center">
                    <PulseLoader
                      sizeUnit="px"
                      size={15}
                      margin="4px"
                      color={'#a9a9a9'}
                      loading={this.props.tableHistory.isLoading}
                    />
                  </div>
                </td>
              </tr>
            )
            :
            this.props.tableHistory.history.length > 0 ?
              this.renderRowTable()
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