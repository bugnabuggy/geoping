import * as React from 'react';
import {
  addListMarkersAPI,
  addMyPositionPoint,
  constructorMapService,
  createMapAPI,
  createUserMarkerAPI,
  deleteAllMarkersAPI,
  deleteMarkerAPI,
  deselectMarkerAPI,
  getDistance,
  selectMarkerAPI,
  setCenterMap,
  setCoordinatesForMarker,
  setCoordinatesForUserMarker,
  setIconCheckInGeoPoint,
  setRadiusMarker,
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
    this.props.getMyAddress();
    if (this.props.googleMap.geoPoints.length > 0) {
      addListMarkersAPI(this.props.googleMap.geoPoints);
      this.props.geoPointListIsCreate(true);
    }

    if (this.props.googleMap.position.isSuccess && this.props.isCheckIn) {
      createUserMarkerAPI();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.googleMap.position.isSuccess &&
      prevProps.googleMap.position.lat !== this.props.googleMap.position.lat &&
      prevProps.googleMap.position.lng !== this.props.googleMap.position.lng
    ) {
      setCenterMap(this.props.googleMap.position.lat, this.props.googleMap.position.lng);
    }
    if (prevProps.googleMap.selectedGeoPoint.idForMap &&
      prevProps.googleMap.selectedGeoPoint.idForMap !== this.props.googleMap.selectedGeoPoint.idForMap) {
      deselectMarkerAPI(prevProps.googleMap.selectedGeoPoint);
    }

    if (this.props.googleMap.selectedGeoPoint.idForMap &&
      this.props.googleMap.statusMarker === EnumStatusMarker.Edit) {
      selectMarkerAPI(this.props.googleMap.selectedGeoPoint);
      setCenterMap(this.props.googleMap.selectedGeoPoint.lat, this.props.googleMap.selectedGeoPoint.lng);
    }

    if (this.props.googleMap.idDeleteMarker) {
      deleteMarkerAPI(this.props.googleMap.idDeleteMarker);
      this.props.deleteGeoPoint(defaultMarker, prevProps.googleMap.statusMarker);
      if (this.props.googleMap.idDeleteMarker === this.props.googleMap.selectedGeoPoint.idForMap) {
        this.props.selectPoint(defaultMarker);
        this.props.editingPermission(false);
      }
    }

    if (this.props.googleMap.geoPoints.length === 0 && !this.props.googleMap.selectedGeoPoint.idForMap) {
      deleteAllMarkersAPI();
    }
    if (this.props.googleMap.geoPoints.length > 0 &&
      prevProps.googleMap.selectedGeoPoint.idForMap !== this.props.googleMap.selectedGeoPoint.idForMap) {
      const marker = this.props.googleMap.geoPoints.find(item => item.idForMap === prevProps.googleMap.selectedGeoPoint.idForMap);
      if (!marker) {
        deleteMarkerAPI(prevProps.googleMap.selectedGeoPoint.idForMap);
      }
    }

    if (!this.props.checkList.isEditing) {
      settingPointsByCoordinates(this.props.googleMap.geoPoints);
    }

    if (this.props.checkList.isMyGeoPosition) {
      addMyPositionPoint(this.props.googleMap.selectedGeoPoint);
      this.props.addNewPointForMyGeoPosition(false);
    }

    if (!this.props.googleMap.isGeoPointListIsCreated) {
      deleteAllMarkersAPI();
      addListMarkersAPI(this.props.googleMap.geoPoints);
      this.props.geoPointListIsCreate(true);
    }
    if (this.props.googleMap.selectedGeoPoint.idForMap && this.props.googleMap.position.isSuccess && this.props.isCheckIn) {
      getDistance();
    }

    if (prevProps.googleMap.position.lat !== this.props.googleMap.position.lat ||
      prevProps.googleMap.position.lng !== this.props.googleMap.position.lng) {
      setCoordinatesForUserMarker(this.props.googleMap.position);
    }

    if (prevProps.googleMap.selectedGeoPoint.lat !== this.props.googleMap.selectedGeoPoint.lat ||
      prevProps.googleMap.selectedGeoPoint.lng !== this.props.googleMap.selectedGeoPoint.lng) {
      setCoordinatesForMarker(this.props.googleMap.selectedGeoPoint);
    }

    if (this.props.googleMap.selectedGeoPoint.radius !== prevProps.googleMap.selectedGeoPoint.radius) {
      setRadiusMarker(this.props.googleMap.selectedGeoPoint);
    }

    if (this.props.googleMap.checkInGeoPoint.length > 0) {
      setIconCheckInGeoPoint();
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
