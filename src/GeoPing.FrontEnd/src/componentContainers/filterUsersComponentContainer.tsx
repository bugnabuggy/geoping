import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IinitialStateType from '../DTO/types/stateTypes/initialStateType';

class FilterUsersComponentContainer extends React.Component<any, any> {
  render() {
    return(
      <React.Fragment>
        gsdfgsdfg
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {};
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {}, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( FilterUsersComponentContainer );