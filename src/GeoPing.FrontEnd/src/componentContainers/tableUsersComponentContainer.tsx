import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class TableUsersComponentContainer extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        gsfdgsdf
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {}, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( TableUsersComponentContainer );