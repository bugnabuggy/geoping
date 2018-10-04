import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import IAllChecklistTableComponentContainerProps
  from '../componentContainersProps/allChecklistTableComponentContainerProps';
import { AllChecklistTableComponent } from '../components/allChecklistTableComponent';

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