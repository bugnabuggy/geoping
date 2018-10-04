import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IFilterForPublicCheckListsComponentContainerProps
  from '../componentContainersProps/filterForPublicCheckListsComponentContainerProps';
import { FilterForPublicCheckListsComponent } from '../components/filterForPublicCheckListsComponent';
import { changeFilter } from '../actions/publicChecListAction';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class FilterForPublicCheckListsComponentContainer extends
  React.Component<IFilterForPublicCheckListsComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <FilterForPublicCheckListsComponent
          changeFilter={this.props.changeFilter}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      changeFilter,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( FilterForPublicCheckListsComponentContainer );