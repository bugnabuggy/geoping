import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Toggle from 'react-toggle';

import ITableUsersComponentProps from '../../componentProps/tableComponentProps/tableUsersComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class TableUsersComponent extends React.Component<ITableUsersComponentProps, any> {
  constructor( props: any ) {
    super( props );
    this.state = {
      sortName: [],
      sortOrder: [],
    };
  }

  changeEmployee = ( e: any ) => {
    this.props.changeEmployee( Number( e.target.id ), e.target.checked );
  };

  handleSort = ( name: any, order: any ) => {
    const sortName: Array<any> = [ name ];
    const sortOrder: Array<any> = [ order ];

    this.state.sortName.forEach( ( item: string, index: number ) => {
      if ( item !== name ) {
        sortName.push( item );
        sortOrder.push( this.state.sortOrder[ index ] );
      }
      if ( this.state.sortOrder[ index ] === 'asc' ) {
        sortName.splice( index, 1 );
        sortOrder.splice( index, 1 );
      }
    } );

    this.setState( {
      sortName: sortName,
      sortOrder: sortOrder,
    } );
  };

  renderCheckBox = ( props: any, row: any ) => {
    return (
      <Toggle
        defaultChecked={props}
      />
    );
  };

  renderIcon = ( props: any, row: any ) => {
    return (
      <div className="admin-all-users-table-icon-container">
        <div
          className="admin-all-users-table-icon-delete cursor-pointer"
          onClick={() => {
            console.info('row', row);
          }}
        >
          <FontAwesomeIcon icon="trash-alt"/>
        </div>
        <div
          className="admin-all-users-table-icon-edit cursor-pointer"
          onClick={() => {
            console.info('row', row);
          }}
        >
          <FontAwesomeIcon icon="pencil-alt"/>
        </div>
      </div>
    );
  };

  render() {
    const options: any = {
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      onSortChange: this.handleSort,
    };

    return (
      <React.Fragment>
        <BootstrapTable
          data={this.props.listUsers}
          version="4"
          options={options}
          striped={true}
          hover={true}
          condensed={true}
          multiColumnSort={1}
        >
          <TableHeaderColumn
            isKey={true}
            dataField="id"
            width="50px"
            hidden={true}
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name"
            dataSort={true}
            columnTitle={true}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="age"
            dataSort={true}
            headerAlign="left"
            dataAlign="right"
          >
            Login
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nickname"
            dataSort={true}
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataSort={true}
            headerAlign="left"
            dataAlign="center"
            // dataFormat={this.renderCheckBox}
          >
            Registration date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataSort={true}
            headerAlign="left"
            dataAlign="center"
            // dataFormat={this.renderCheckBox}
          >
            Checklist number
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataSort={true}
            headerAlign="left"
            dataAlign="center"
            // dataFormat={this.renderCheckBox}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataSort={true}
            headerAlign="left"
            dataAlign="center"
            // dataFormat={this.renderCheckBox}
          >
            Is official
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataAlign="center"
            dataFormat={this.renderCheckBox}
          >
            Is admin
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataAlign="center"
            dataFormat={this.renderIcon}
          >
            Delete/Edit
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}