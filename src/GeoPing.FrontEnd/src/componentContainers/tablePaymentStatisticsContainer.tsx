import * as React from 'react';
import ITablePaymentStatisticsProps from '../componentContainerProps/tablePaymentStatisticsProps';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TablePaymentStatisticsContainer extends React.Component<ITablePaymentStatisticsProps, any> {
  render() {
    return (
      <BootstrapTable
        data={[]}
      >
        <TableHeaderColumn
          isKey={true}
          dataField="id"
          hidden={true}
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
    },
    dispath );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( TablePaymentStatisticsContainer );
