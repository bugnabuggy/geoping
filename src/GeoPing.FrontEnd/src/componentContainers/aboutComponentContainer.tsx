import * as React from 'react';
import IAboutComponentContainerProps from '../componentContainerProps/aboutComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVirtualDatabase, useTestPeriod } from '../actions/aboutAction';

class AboutComponentContainer extends React.Component<IAboutComponentContainerProps, any> {
  tempStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100px',
  };
  handleClick = ( e: any ) => {
    this.props.useTestPeriod( 'test', 'Password@123' );
    this.props.getVirtualDatabase();
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.tempStyle}>
          <button
            onClick={this.handleClick}
          >
            Test User
          </button>
        </div>
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