import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IFilterForPublicCheckListsComponentContainerProps
  from '../componentProps/filterForPublicCheckListsComponentContainerProps';
import { FilterForPublicCheckListsComponent } from '../components/filterForPublicCheckListsComponent';
import { changeFilter, filterPublicCheckLists } from '../actions/publicChecListAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class FilterForPublicCheckListsComponentContainer
  extends React.Component<IFilterForPublicCheckListsComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <FilterForPublicCheckListsComponent
          filterName={this.props.filterName}
          filterUser={this.props.filterUser}
          filterSubscribers={this.props.filterSubscribers}

          changeFilter={this.props.changeFilter}
          filterPublicCheckLists={this.props.filterPublicCheckLists}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    filterName: state.publicCheckList.filterName,
    filterUser: state.publicCheckList.filterUser,
    filterSubscribers: state.publicCheckList.filterSubscribers,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      changeFilter,
      filterPublicCheckLists,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( FilterForPublicCheckListsComponentContainer );
