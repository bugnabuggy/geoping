import * as React from 'react';
import {
  addListMarkersAPI,
  addMyPositionPoint,
  constructorMapService,
  createMapAPI,
  deleteAllMarkersAPI,
  deleteMarkerAPI,
  deselectMarkerAPI,
  getDistance,
  selectMarkerAPI,
  settingPointsByCoordinates,
} from '../../../services/googleMapService';
import {EnumStatusMarker} from "../../../enums/statusMarker";
import {defaultMarker} from '../../../constants/defaultMarker';

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const options = {
      center: {lat: this.props.googleMap.position.lat, lng: this.props.googleMap.position.lng},
      zoom: this.props.googleMap.position.zoom || 12,
    };
    constructorMapService(window.google, options, this);
    createMapAPI();

    if (this.props.googleMap.geoPoints.length > 0) {
      addListMarkersAPI(this.props.googleMap.geoPoints);
      this.props.geoPointListIsCreate(true);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.googleMap.selectedGeoPoint.id &&
      prevProps.googleMap.selectedGeoPoint.id !== this.props.googleMap.selectedGeoPoint.id) {
      deselectMarkerAPI(prevProps.googleMap.selectedGeoPoint);
    }

    if (this.props.googleMap.selectedGeoPoint.id &&
      this.props.googleMap.statusMarker === EnumStatusMarker.Edit) {
      selectMarkerAPI(this.props.googleMap.selectedGeoPoint);
    }

    if (this.props.googleMap.idDeleteMarker) {
      deleteMarkerAPI(this.props.googleMap.idDeleteMarker);
      this.props.deleteGeoPoint('', prevProps.googleMap.statusMarker);
      if (this.props.googleMap.idDeleteMarker === this.props.googleMap.selectedGeoPoint.id) {
        this.props.selectPoint(defaultMarker);
        this.props.editingPermission(false);
      }
    }

    if (!this.props.checkList.isEditing) {
      settingPointsByCoordinates(this.props.googleMap.geoPoints);
    }

    if (this.props.checkList.isMyGeoPosition) {
      addMyPositionPoint(this.props.googleMap.selectedGeoPoint);
      this.props.addNewPointForMyGeoPosition(false);
    }

    if (this.props.googleMap.geoPoints.length > 0 && !this.props.googleMap.isGeoPointListIsCreated) {
      deleteAllMarkersAPI();
      addListMarkersAPI(this.props.googleMap.geoPoints);
      this.props.geoPointListIsCreate(true);
    }
    if (this.props.googleMap.selectedGeoPoint.id && this.props.googleMap.position.isSuccess && this.props.isCheckIn) {
      getDistance();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"/>
      </React.Fragment>
    );
  }
}

export default GoogleMap;
