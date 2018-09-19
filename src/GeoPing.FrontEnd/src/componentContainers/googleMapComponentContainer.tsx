import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleMapComponent from '../components/googleMapComponent';
import IGoogleMapComponentContainerProps
  from '../componentProps/googleMapComponentProps/googleMapComponentContainerProps';
import { addPoints, permissionToAddMarker } from '../actions/googleMapAction';

class GoogleMapComponentContainer extends React.Component<IGoogleMapComponentContainerProps, any> {
  add = () => {
    this.props.permissionToAddMarker ( true );
  }

  render() {
    return (
      <React.Fragment>
        <GoogleMapComponent
          positions={this.props.markers}
          isAddMarker={this.props.isAddMarker}
          permissionToAddMarker={this.props.permissionToAddMarker}
        />
        <button onClick={this.add}>Добавить</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state: any ) => {
  return {
    markers: state.googleMap.markers,
    isAddMarker: state.googleMap.isAddMarker,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators ( {
    addPoints,
    permissionToAddMarker
  }, dispath );

export default connect ( mapStateToProps, mapDispatchToProps ) ( GoogleMapComponentContainer );