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

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators ( {}, dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( TableUsersComponentContainer );