import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ITableMarkerStatisticsComponentProps from '../componentProps/tablesProps/tableMarkerStatisticsComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class TableMarkerStatisticsComponent extends React.Component<ITableMarkerStatisticsComponentProps, any> {
  rowClassNameFormat = ( row: any, rowIdx: any ) => {
    return row.check ? 'statistics-table-check' : 'statistics-table-not-check';
  };

  render() {
    const test: any = [
      {
        id: '1',
        name: 'Point 1',
        lat: '36.4444444',
        lng: '73.548988',
        radius: 30,
        check: true,
      },
      {
        id: '2',
        name: 'Point 2',
        lat: '36.4444444',
        lng: '73.548988',
        radius: 30,
        check: false,
      }
    ];
    return (
      <BootstrapTable
        data={test}
        trClassName={this.rowClassNameFormat}
        maxHeight="500px"
      >
        <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
        <TableHeaderColumn dataField="lat">Latitude</TableHeaderColumn>
        <TableHeaderColumn dataField="lng">Longitude</TableHeaderColumn>
        <TableHeaderColumn dataField="radius">Radius</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}