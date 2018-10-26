import * as React from 'react';
import AllChecklistTableComponentProps from '../../componentProps/tableComponentProps/allChecklistTableComponentProps';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class AllChecklistTableComponent extends React.Component<AllChecklistTableComponentProps, any> {
  onSortChange = ( name: string, order: string ) => {
    const sortName: Array<any> = [];
    const sortOrder: Array<any> = [];

    sortName.push ( name );
    sortOrder.push ( order );

    this.state.sortName.map ( ( item: any, index: number ) => {
      if ( item !== name ) {
        sortName.push ( item );
        sortOrder.push ( this.state.sortOrder[index] );
      } else if ( this.state.sortOrder[index] === 'asc' ) {
        sortName.splice ( index, 1 );
        sortOrder.splice ( index, 1 );
      }
    } );
    this.setState ( {
      sortName,
      sortOrder,
    } );
  };

  constructor( props: AllChecklistTableComponentProps ) {
    super ( props );
    this.state = {
      sortName: [],
      sortOrder: [],
    };
  }

  render() {
    const test: any = [
      {
        id: 1,
        name: 'name',
        age: 40,
        employee: false,
      },
      {
        id: 1,
        name: 'Mase',
        age: 38,
        employee: false,
      },
      {
        id: 1,
        name: 'tukal',
        age: 50,
        employee: false,
      }
    ];
    const options: any = {
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      onSortChange: this.onSortChange,
    };

    return (
      <React.Fragment>
        <BootstrapTable
          striped={true}
          hover={true}
          data={test}
          options={options}
        >
          <TableHeaderColumn isKey={true} dataField="id">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="age" dataSort={true}>Age</TableHeaderColumn>
          <TableHeaderColumn dataField="employee" dataSort={true}>Employee</TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}