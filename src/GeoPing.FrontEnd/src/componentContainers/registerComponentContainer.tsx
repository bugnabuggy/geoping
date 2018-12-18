import * as React from 'react';
import RegisterComponent from '../components/forms/register';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as momentTimeZone from 'moment-timezone';

import IRegisterComponentContainerProps from '../componentContainerProps/registerComponentContainerProps';
import { registrationUser } from '../actions/userAction';
import { getTimeZones } from '../actions/utilitiesAction';

class RegisterComponentContainer extends React.Component<IRegisterComponentContainerProps, any> {
  componentDidMount(): void {
    const gues: string = momentTimeZone.tz.guess();
    // console.log( gues );
    // console.log( 'momentTimeZone', momentTimeZone.tz( gues ).format( 'z' ) );
    // console.log( 'gues', momentTimeZone.tz( gues ).format() );
    // console.log( momentTimeZone.tz( '2012-03-11 01:59:59', 'America/New_York' ).format() );
    // console.log( momentTimeZone.tz( '2012-03-11 02:00:00', 'America/New_York' ).format() );
    // console.log( momentTimeZone.tz( '2012-03-11 02:59:59', 'America/New_York' ).format() );
    // console.log( momentTimeZone.tz( '2012-03-11 03:00:00', 'America/New_York' ).format() );
    this.props.getTimeZones();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.window.timeZones.length > 0 &&
        (
          <RegisterComponent
            timeZones={this.props.window.timeZones}

            registrationUser={this.props.registrationUser}
          />
        )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    window: state.window,
  };
};

const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators(
    {
      registrationUser,
      getTimeZones,
    },
    dispatch
  );

export default connect<any, any, any>( mapStateToProps, mapDispatchToProps )( RegisterComponentContainer );
