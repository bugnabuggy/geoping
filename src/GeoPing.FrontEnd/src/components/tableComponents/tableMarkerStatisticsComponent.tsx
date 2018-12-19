import * as React from 'react';

import ITableMarkerStatisticsComponentProps
  from '../../componentProps/tableComponentProps/tableMarkerStatisticsComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { EStatusCheckedEnum } from '../../enums/statusCheckedEnum';
import { ICheckInGeoPointDTO } from '../../DTO/geoPointDTO';
import moment = require('moment');
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class TableMarkerStatisticsComponent extends React.Component<ITableMarkerStatisticsComponentProps, any> {
  rowClassNameFormat = ( row: any, rowIdx: any ) => {
    const check: any = {
      [ EStatusCheckedEnum.Checked ]: () => {
        return this.props.googleMap.selectedGeoPoint.idForMap === row.id ?
          'statistics-table-check-select'
          :
          'statistics-table-check';
      },
      [ EStatusCheckedEnum.Unchecked ]: () => {
        return this.props.googleMap.selectedGeoPoint.idForMap === row.id ?
          'statistics-table-not-check-select'
          :
          'statistics-table-not-check';
      },
      [ EStatusCheckedEnum.FreeCheck ]: () => {
        return this.props.googleMap.selectedGeoPoint.idForMap === row.id ?
          'statistics-table-free-check-select'
          :
          'statistics-table-free-check';
      }
    };
    return check[ row.check ]();
  };
  getData = () => {
    return this.props.googleMap.geoPoints.map( ( item, index: number ) => {
      const checkInGeoPoint: ICheckInGeoPointDTO = this.props.googleMap.checkInGeoPoint[ index ];
      const user = this.props.checkinStatistics.selectUser
        .find( userItem => userItem.userId === checkInGeoPoint.userId );
      return {
        id: item.idForMap,
        userName: !!checkInGeoPoint.userId && user ?
          user.userName
          :
          '',
        check: checkInGeoPoint.status,
        name: item.name,
        coordsPoint: `${item.lat} / ${item.lng}`,
        distance: checkInGeoPoint.distance,
        dateTime: !!checkInGeoPoint.date ? moment( checkInGeoPoint.date ).format( 'LLL' ) : '',
      };
    } );
  };

  render() {
    return (
      <BootstrapTable
        data={this.getData()}
        trClassName={this.rowClassNameFormat}
      >
        <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="check" hidden={true}>check</TableHeaderColumn>
        <TableHeaderColumn
          hidden={this.props.listId === 'none' || !!this.props.userId}
          dataField="userName"
          tdStyle={{ whiteSpace: 'normal' }}
        >
          User name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" tdStyle={{ whiteSpace: 'normal' }}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="coordsPoint" tdStyle={{ whiteSpace: 'normal' }}>Coords point</TableHeaderColumn>
        <TableHeaderColumn dataField="distance" tdStyle={{ whiteSpace: 'normal' }}>Distance</TableHeaderColumn>
        <TableHeaderColumn dataField="dateTime" tdStyle={{ whiteSpace: 'normal' }}>Date time</TableHeaderColumn>
      </BootstrapTable>
    );
  }
  // _renderRow = () => {
  //   return this.props.googleMap.geoPoints.map( ( item, index: number ) => {
  //     const checkInGeoPoint: ICheckInGeoPointDTO = this.props.googleMap.checkInGeoPoint[ index ];
  //     const user = this.props.checkinStatistics.selectUser
  //       .find( userItem => userItem.userId === checkInGeoPoint.userId );
  //     const userName: string = !!checkInGeoPoint.userId && user ?
  //       user.userName
  //       :
  //       '';
  //     return (
  //       <tr key={`${item.id}_check`}>
  //         <td><div>{userName}</div></td>
  //         <td><div>{item.name}</div></td>
  //         <td><div style={{width: '20%', overflow: 'hidden'}}>{`${item.lat} / ${item.lng}`}</div></td>
  //         <td><div>{checkInGeoPoint.distance}</div></td>
  //         <td><div>{!!checkInGeoPoint.date ? moment( checkInGeoPoint.date ).format( 'LLL' ) : ''}</div></td>
  //       </tr>
  //     );
  //   } );
  // };
  //
  // render(): React.ReactNode {
  //   return (
  //     <React.Fragment>
  //       {/*<Table>*/}
  //       {/*<thead>*/}
  //       {/*<tr>*/}
  //       {/*<th style={{maxWidth: `calc(100% / ${5}`}}>User name</th>*/}
  //       {/*<th style={{maxWidth: `calc(100% / ${5}`}}>Name</th>*/}
  //       {/*<th style={{maxWidth: `calc(100% / ${5}`}}>Coords point</th>*/}
  //       {/*<th style={{maxWidth: `calc(100% / ${5}`}}>Distance</th>*/}
  //       {/*<th style={{maxWidth: `calc(100% / ${5}`}}>Date time</th>*/}
  //       {/*</tr>*/}
  //       {/*</thead>*/}
  //       {/*<tbody>*/}
  //       {/*{this._renderRow()}*/}
  //       {/*</tbody>*/}
  //       {/*</Table>*/}
  //       <Table
  //         hover={true}
  //         // condensed={true}
  //         striped={true}
  //         responsive={true}
  //       >
  //         <thead>
  //         <tr>
  //           <th>User name</th>
  //           <th>Name</th>
  //           <th>Coords point</th>
  //           <th>Distance</th>
  //           <th>Date time</th>
  //         </tr>
  //         </thead>
  //         <tbody>
  //         {this._renderRow()}
  //         </tbody>
  //       </Table>
  //     </React.Fragment>
  //   );
  // }
}
