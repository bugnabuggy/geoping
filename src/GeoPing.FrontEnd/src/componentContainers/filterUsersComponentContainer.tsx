import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import IFilterUsersComponentContainerProps from '../componentProps/filterUsersComponentContainerProps';
import { FilterUsersComponent } from '../components/filterUsersComponent';
import { IFilterUsersProps } from '../componentProps/filterUsersComponentProps';
import { changeFilters } from '../actions/allUsersFilterAction';

class FilterUsersComponentContainer extends React.Component<IFilterUsersComponentContainerProps, any> {
  render() {
    const fieldsFilters: IFilterUsersProps = {
      name: this.props.name,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      listCountFrom: this.props.listCountFrom,
      listCountTo: this.props.listCountTo,
      status: this.props.status,
      selectedStatus: this.props.selectedStatus,
      isOfficial: this.props.isOfficial,
      isAdmin: this.props.isAdmin,
    };

    return (
      <React.Fragment>
        <FilterUsersComponent
          fields={fieldsFilters}
          changeFilters={this.props.changeFilters}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    name: state.allUsersFilter.name,
    startDate: state.allUsersFilter.startDate,
    endDate: state.allUsersFilter.endDate,
    listCountFrom: state.allUsersFilter.listCountFrom,
    listCountTo: state.allUsersFilter.listCountTo,
    status: state.allUsersFilter.status,
    selectedStatus: state.allUsersFilter.selectedStatus,
    isOfficial: state.allUsersFilter.isOfficial,
    isAdmin: state.allUsersFilter.isAdmin,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      changeFilters,
    },
    dispath
  );

export default connect( mapStateToProps, mapDispatchToProps )( FilterUsersComponentContainer );