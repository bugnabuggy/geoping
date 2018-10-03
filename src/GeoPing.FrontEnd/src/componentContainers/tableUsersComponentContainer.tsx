import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import ITableUsersComponentContainerProps from '../componentProps/tableUsersComponentContainerProps';
import { TableUsersComponent } from '../components/tableUsersComponent';
import { changeEmployee } from '../actions/allUsersTableAction';

class TableUsersComponentContainer extends React.Component<ITableUsersComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <TableUsersComponent
          listUsers={this.props.listUsers}

          changeEmployee={this.props.changeEmployee}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    listUsers: state.allUsersTable.listUsers,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( 
    {
    changeEmployee,
  }, 
    dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( TableUsersComponentContainer );