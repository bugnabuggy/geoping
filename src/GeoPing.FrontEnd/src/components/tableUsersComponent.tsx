import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ITableUsersComponentProps from '../componentProps/tableUsersComponentProps';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class TableUsersComponent extends React.Component<ITableUsersComponentProps, any> {
  changeEmployee = ( e: any ) => {
    this.props.changeEmployee ( Number ( e.target.id ), e.target.checked );
  };

  handleSort = ( name: any, order: any ) => {
    const sortName: Array<any> = [name];
    const sortOrder: Array<any> = [order];

    this.state.sortName.forEach ( ( item: string, index: number ) => {
      if ( item !== name ) {
        sortName.push ( item );
        sortOrder.push ( this.state.sortOrder[index] );
      }
      if ( this.state.sortOrder[index] === 'asc' ) {
        sortName.splice ( index, 1 );
        sortOrder.splice ( index, 1 );
      }
    } );

    this.setState ( {
      sortName: sortName,
      sortOrder: sortOrder,
    } );
  };

  renderCheckBox = ( props: any, row: any ) => {
    return (
      <input
        id={row.id}
        type="checkbox"
        className=""
        checked={props}
        onChange={this.changeEmployee}
      />
    );
  };

  constructor( props: any ) {
    super ( props );
    this.state = {
      sortName: [],
      sortOrder: [],
    };
  }

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
          maxHeight="600px"
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
            Age
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nickname"
            dataSort={true}
          >
            Nickname
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="employee"
            dataSort={true}
            className="test"
            headerAlign="left"
            dataAlign="center"
            dataFormat={this.renderCheckBox}
          >
            Employee
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}