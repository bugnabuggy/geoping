import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ITableMarkerStatisticsComponentProps
  from '../../componentProps/tableComponentProps/tableMarkerStatisticsComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { EStatusCheckedEnum } from '../../enums/statusCheckedEnum';
import { ICheckInGeoPointDTO } from '../../DTO/geoPointDTO';
import moment = require('moment');

export class TableMarkerStatisticsComponent extends React.Component<ITableMarkerStatisticsComponentProps, any> {
  rowClassNameFormat = ( row: any, rowIdx: any ) => {
    return row.check === EStatusCheckedEnum.Unchecked ? 'statistics-table-not-check' : 'statistics-table-check';
  };
  getData = () => {
    return this.props.googleMap.geoPoints.map( ( item, index: number ) => {
      const checkInGeoPoint: ICheckInGeoPointDTO = this.props.googleMap.checkInGeoPoint[ index ];
      return {
        id: item.idForMap,
        userName: !!checkInGeoPoint.userId ?
          this.props.checkinStatistics.selectUser.find( user => user.userId === checkInGeoPoint.userId ).userName
          :
          '',
        check: checkInGeoPoint.status,
        name: item.name,
        coordsPoint: `${item.lat} / ${item.lng}`,
        distance: checkInGeoPoint.distance,
        dateTime: moment( checkInGeoPoint.date ).format( 'LLL' ) || '',
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
        <TableHeaderColumn
          hidden={this.props.listId === 'none' || !!this.props.userId}
          dataField="userName"
          tdStyle={{ whiteSpace: 'normal' }}
        >
          User name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="check" hidden={true}>check</TableHeaderColumn>
        <TableHeaderColumn dataField="name" tdStyle={{ whiteSpace: 'normal' }}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="coordsPoint" tdStyle={{ whiteSpace: 'normal' }}>Coords point</TableHeaderColumn>
        <TableHeaderColumn dataField="distance" tdStyle={{ whiteSpace: 'normal' }}>Distance</TableHeaderColumn>
        <TableHeaderColumn dataField="dateTime" tdStyle={{ whiteSpace: 'normal' }}>Date time</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
