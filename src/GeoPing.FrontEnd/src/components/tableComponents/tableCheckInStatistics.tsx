import * as React from 'react';
import ITableCheckInStatisticsProps from '../../componentProps/tableComponentProps/tableCheckInStatisticsProps';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment = require('moment');

export class TableCheckInStatistics extends React.Component<ITableCheckInStatisticsProps, any> {
  renderTableData = () => {
    return this.props.tableRecordForCheckIn.map( item => {
      const date: moment.Moment = moment( item.date );
      return {
        id: item.id,
        coords: `${item.latitude} / ${item.longitude}`,
        date: date.format( 'DD/MM/YYYY' ),
        time: date.format( 'HH:mm:ss' ),
      };
    } );
  };

  render() {
    return (
      <React.Fragment>
        <BootstrapTable
          data={this.renderTableData()}
        >
          <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="coords" tdStyle={{ whiteSpace: 'normal' }}>lat / lng</TableHeaderColumn>
          <TableHeaderColumn dataField="date" tdStyle={{ whiteSpace: 'normal' }}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField="time" tdStyle={{ whiteSpace: 'normal' }}>Time</TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}