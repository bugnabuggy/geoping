import * as React from 'react';
import { Table } from 'react-bootstrap';

import ITableComponentProps, { ITableStructure } from '../componentProps/tableComponentProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortAsc, sortDesc } from '../services/helper';

export class TableComponent extends React.Component<ITableComponentProps, any> {

  sortTable = ( sortName: Array<string>, sortOrder: Array<string>, data: any ) => {
    // console.log ( data );
    return sortName.map ( ( item: string, index: number ) => {
      const row: any = data.find ( ( elem: any ) => elem.field === item );
      if ( sortOrder[index] === 'asc' ) {
        return row.data.sort (sortAsc);
      } else if ( sortOrder[index] === 'desc' ) {
        return row.data.sort (sortDesc);
      } else {
        return '';
      }
    } );
    // return '';
  };

  handleSort = ( field: string ) => {
    const sortName: Array<any> = [];
    const sortOrder: Array<any> = [];

    sortName.push ( field );
    sortOrder.push ( 'asc' );

    this.state.sortName.forEach ( ( item: any, index: number ) => {
      if ( item !== field ) {
        sortName.push ( item );
        sortOrder.push ( 'asc' );
      } else {
        if ( this.state.sortOrder[index] === 'asc' ) {
          sortOrder[index] = 'desc';
        } else if ( this.state.sortOrder[index] === 'desc' ) {
          sortOrder[index] = '';
        } else {
          sortOrder[index] = 'asc';
        }
        // sortName.splice ( index, 1 );
        // sortOrder.splice ( index, 1 );
      }
    } );

    // console.log ( 'sortName', sortName );
    // console.log ( 'this.sortTable(sortName, sortOrder, this.state.tableHeaderColumn)',
    // this.sortTable ( sortName, sortOrder, this.state.tableHeaderColumn ) );
    this.setState ( {
      sortName,
      sortOrder,
      // tableHeaderColumn: this.sortTable(sortName, sortOrder, this.state.tableHeaderColumn),
    } );
  };

  renderTHead = () => {
    const element: Array<any> = this.state.tableHeaderColumn.map ( ( item: ITableStructure, index: number ) => {
      const key: string = `tableHead_${index}`;
      return (
        <th
          key={key}
          className={`${item.dataSort && ' cursor-pointer '}`}
          onClick={() => {
            this.handleSort ( item.field );
          }}
        >
          {item.label}
          {item.dataSort && <FontAwesomeIcon icon="sort" className="table-sort-icon"/>}
        </th>
      );
    } );
    return (
      <tr>
        {element}
      </tr>
    );
  };
  renderTBody = ( columnData: Array<any> ) => {
    const element: Array<any> = columnData.map ( ( item: any, index: number ) => {
      const key: string = `tableBodyCell_${index}`;
      return (
        <td
          key={key}
        >
          {item}
        </td>
      );
    } );
    return element;
  };
  renderRowTBody = () => {
    const element: Array<any> = this.state.tableHeaderColumn.map ( ( item: ITableStructure, index: number ) => {
      const key: string = `tableBodyRow_${index}`;
      return (
        <tr
          key={key}
        >
          {this.renderTBody ( item.data )}
        </tr>
      );
    } );

    return element;
  };

  constructor( props: ITableComponentProps ) {
    super ( props );

    this.state = {
      tableHeaderColumn: props.tableHeaderColumn,
      sortName: [],
      sortOrder: [],
    };
  }

  render() {
    return (
      <Table
        striped={this.props.striped}
        bordered={this.props.bordered}
        condensed={this.props.condensed}
        hover={this.props.hover}
        responsive={this.props.responsive}
      >
        <thead>
        {this.renderTHead ()}
        </thead>
        <tbody>
        {this.renderRowTBody ()}
        </tbody>
      </Table>
    );
  }
}