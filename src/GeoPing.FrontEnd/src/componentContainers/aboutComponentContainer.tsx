import * as React from 'react';
import IAboutComponentContainerProps from '../componentProps/aboutComponentContainerProps';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVirtualDatabase, useTestPeriod } from '../actions/aboutAction';

class AboutComponentContainer extends React.Component<IAboutComponentContainerProps, any> {
  handleClick = ( e: any ) => {
    this.props.useTestPeriod( 'test', 'Password@123');
    this.props.getVirtualDatabase();
  };

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.handleClick}
        >
          Test User
        </button>
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
      useTestPeriod,
      getVirtualDatabase,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( AboutComponentContainer );