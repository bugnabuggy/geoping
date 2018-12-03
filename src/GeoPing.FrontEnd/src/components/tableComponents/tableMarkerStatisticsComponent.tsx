import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ITableMarkerStatisticsComponentProps
  from '../../componentProps/tableComponentProps/tableMarkerStatisticsComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import moment = require('moment');

export class TableMarkerStatisticsComponent extends React.Component<ITableMarkerStatisticsComponentProps, any> {
  rowClassNameFormat = ( row: any, rowIdx: any ) => {
    return row.check ? 'statistics-table-check' : 'statistics-table-not-check';
  };
  getData = () => {
    return this.props.googleMap.geoPoints.map( ( item: any, index: number ) => {
      const checkIn: any = this.props.googleMap.checkInGeoPoint.find( ( check: any ) => check.pointId === item.id );
      return {
        id: index,
        check: checkIn && !!checkIn.pointId,
        name: item.name,
        coordsPoint: `${item.lat} / ${item.lng}`,
        coordsUser: `${checkIn && checkIn.latitude + ' / ' + checkIn.longitude || ''}`,
        distance: checkIn && checkIn.distance,
        dateTime: checkIn && moment( checkIn.date ).format( 'LLL' ) || '',
      };
    } );
  };

  render() {
    return (
      <BootstrapTable
        data={this.getData()}
        trClassName={this.rowClassNameFormat}
        maxHeight="500px"
      >
        <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="check" hidden={true}>check</TableHeaderColumn>
        <TableHeaderColumn dataField="name" tdStyle={{ whiteSpace: 'normal' }}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="coordsPoint" tdStyle={{ whiteSpace: 'normal' }}>Coords point</TableHeaderColumn>
        <TableHeaderColumn dataField="coordsUser" tdStyle={{ whiteSpace: 'normal' }}>Coords user</TableHeaderColumn>
        <TableHeaderColumn dataField="distance" tdStyle={{ whiteSpace: 'normal' }}>Distance</TableHeaderColumn>
        <TableHeaderColumn dataField="dateTime" tdStyle={{ whiteSpace: 'normal' }}>Date time</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
