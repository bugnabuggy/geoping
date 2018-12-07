import * as React from 'react';
import ITableCheckInStatisticsProps from '../../componentProps/tableComponentProps/tableCheckInStatisticsProps';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class TableCheckInStatistics extends React.Component<ITableCheckInStatisticsProps, any> {

  render() {
    const data = [
      {
        id: 'f4s56d4f',
        list: 'fsdfsdfd',
        point: 'fsdfsdfd',
        coords: '16415641 / 41564156415',
        date: '4564564561984'
      }
    ];
    return (
      <React.Fragment>
        <BootstrapTable
          data={data}
        >
          <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="list">List</TableHeaderColumn>
          <TableHeaderColumn dataField="point">Point</TableHeaderColumn>
          <TableHeaderColumn dataField="coords" tdStyle={{ whiteSpace: 'normal' }}>lat / lng</TableHeaderColumn>
          <TableHeaderColumn dataField="date" tdStyle={{ whiteSpace: 'normal' }}>Date</TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}