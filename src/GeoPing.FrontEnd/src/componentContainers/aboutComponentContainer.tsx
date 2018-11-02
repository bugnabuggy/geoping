import * as React from 'react';
import IAboutComponentContainerProps from '../componentContainerProps/aboutComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTestPeriod } from '../actions/aboutAction';

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
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.tempStyle}>
          <button
            name={'testUser'}
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
  return {
    user: state.user,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      useTestPeriod,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( AboutComponentContainer );