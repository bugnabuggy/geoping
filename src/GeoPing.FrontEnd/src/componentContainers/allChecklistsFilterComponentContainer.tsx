import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import IAllChecklistsFilterComponentContainerProps
  from '../componentContainerProps/allChecklistsFilterComponentContainerProps';
import { AllChecklistsFilterComponent } from '../components/filterComponents/allChecklistsFilterComponent';
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

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( AllChecklistsFilterComponentContainer );