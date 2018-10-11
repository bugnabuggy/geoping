import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ICheckinComponentContainerProps from '../componentContainerProps/checkinComponentContainerProps';
import IinitialStateType from '../types/stateTypes/initialStateType';
import { CheckinComponent } from '../components/checkinComponent';
import { checkinFlag, loadLists, loadPoints, selectList } from '../actions/checkinAction';
import { ICheckinFunctions } from '../componentProps/checkinComponentProps';
import { clearMarkerList, findLocationForCenterMap, markerRender, selectedMarker } from '../actions/googleMapAction';

class CheckinComponentContainer extends React.Component<ICheckinComponentContainerProps, any> {
  componentDidMount() {
    this.props.findLocationForCenterMap();
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
      selectedMarker: this.props.selectedMarker,
      markerRender: this.props.markerRender,
      clearMarkerList: this.props.clearMarkerList,
    };

    return (
      <React.Fragment>
        <CheckinComponent
          checkin={this.props.checkin}
          markersList={this.props.markersList}
          position={this.props.position}
          selectedPoint={this.props.selectedPoint}
          functions={functions}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    markersList: state.googleMap.markersList,
    checkin: state.checkin,
    position: state.googleMap.position,
    selectedPoint: state.googleMap.selectedMarker,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      loadLists,
      loadPoints,
      selectList,
      checkinFlag,
      selectedMarker,
      findLocationForCenterMap,
      markerRender,
      clearMarkerList,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( CheckinComponentContainer );