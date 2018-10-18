import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ICheckinComponentContainerProps from '../componentContainerProps/checkinComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckinComponent } from '../components/checkinComponent';
import { checkinFlag, loadLists, loadPoints, selectList } from '../actions/checkinAction';
import { ICheckinFunctions } from '../componentProps/checkinComponentProps';
import { getMyAddress, selectPoint } from '../actions/googleMapAction';
import { saveHistory } from '../actions/historyAction';

class CheckinComponentContainer extends React.Component<ICheckinComponentContainerProps, any> {
  componentDidMount() {
    // this.props.findLocationForCenterMap();
    this.props.loadLists( 'gggf5df-fj8y5dg-df54sdfg-f4d5' );
    if ( !this.props.checkin.isCheckIn ) {
      this.props.checkinFlag( true );
    }
  }

  componentWillUnmount() {
    this.props.checkinFlag( false );
  }

  render() {
    const functions: ICheckinFunctions = {
      loadLists: this.props.loadLists,
      loadPoints: this.props.loadPoints,
      selectList: this.props.selectList,
      selectPoint: this.props.selectPoint,
      getMyAddress: this.props.getMyAddress,
      saveHistory: this.props.saveHistory,
    };

    return (
      <React.Fragment>
        <CheckinComponent
          checkin={this.props.checkin}
          googleMap={this.props.googleMap}
          functions={functions}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    googleMap: state.googleMap,
    checkin: state.checkin,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadLists,
      loadPoints,
      selectList,
      checkinFlag,
      selectPoint,
      getMyAddress,
      saveHistory,
      // findLocationForCenterMap,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckinComponentContainer );