import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import IAllChecklistsFilterComponentContainerProps
  from '../componentContainersProps/allChecklistsFilterComponentContainerProps';
import { AllChecklistsFilterComponent } from '../components/allChecklistsFilterComponent';
import { changeFields } from '../actions/allChecklistFilterAction';

class AllChecklistsFilterComponentContainer extends React.Component<IAllChecklistsFilterComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <AllChecklistsFilterComponent
          changeFields={this.props.changeFields}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      changeFields,
    },
    dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( AllChecklistsFilterComponentContainer );