import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../types/stateTypes/initialStateType';
import IAllChecklistTableComponentContainerProps
  from '../componentContainerProps/allChecklistTableComponentContainerProps';
import { AllChecklistTableComponent } from '../components/tableComponents/allChecklistTableComponent';

class AllChecklistTableComponentContainer extends React.Component<IAllChecklistTableComponentContainerProps, any> {
  render() {
    return (
      <React.Fragment>
        <AllChecklistTableComponent/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators( {}, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( AllChecklistTableComponentContainer );