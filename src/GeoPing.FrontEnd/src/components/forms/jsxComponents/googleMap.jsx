import * as React from 'react';
import * as ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import {
  addNewMarker,
  clearMarkersMap,
  createMap,
  createUserMarker,
  dropMarker,
  removeMarker,
  setContext,
  setGoogleLibrary,
  setMarkerPosition,
  setMarkerTitle,
  toggleBounce,
  getDistance,
} from '../../../services/googleMapService';
import {EnumStatusMarker} from "../../../types/stateTypes/googleMapStateType";

class GoogleMap extends React.Component {
  map;
  markers;
  isAddMarker;
  isSelectedMarker;
  options;
  geocoder;

  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };
    this.markers = [];
    this.isAddMarker = props.googleMap.isAddMarker || false;
    this.isSelectedMarker = false;
    this.options = {
      center: {lat: props.googleMap.position.lat, lng: props.googleMap.position.lng},
      zoom: 12,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
    setContext(this);
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({showMap: true});
    }
  }

  componentDidUpdate(prevProps) {
    setContext(this);
    if (prevProps.isScriptLoaded !== this.props.isScriptLoaded) {
      const isLoadedButWasntLoadedBefore =
        !this.state.showMap &&
        !prevProps.isScriptLoaded &&
        this.props.isScriptLoaded;

      this.setState({
        showMap: isLoadedButWasntLoadedBefore && this.props.isScriptLoadSucceed && true,
      });
      setGoogleLibrary(google);

      this.map = createMap(map, this.options);
      this.geocoder = new google.maps.Geocoder();
      dropMarker();
    }
    if (this.state.showMap) {
      if (prevProps.googleMap.isAddMarker !== this.props.googleMap.isAddMarker) {
        this.isAddMarker = this.props.googleMap.isAddMarker;
      }

      if (prevProps.googleMap.selectedMarker.id !== this.props.googleMap.selectedMarker.id) {
        toggleBounce(this.props.googleMap.selectedMarker);
      }

      if (prevProps.googleMap.statusMarker === EnumStatusMarker.New &&
        prevProps.googleMap.isMarkerCanceled !== this.props.googleMap.isMarkerCanceled &&
        this.props.googleMap.isMarkerCanceled) {
        removeMarker(prevProps.googleMap.selectedMarker.id);
        this.props.editingPermission(false);
      } else if (prevProps.googleMap.isMarkerCanceled !== this.props.googleMap.isMarkerCanceled && this.props.googleMap.isMarkerCanceled) {
        setMarkerPosition(this.props.googleMap.markersList.find(item => item.id === prevProps.googleMap.selectedMarker.id));
      }

      if (prevProps.googleMap.isCheckGeoPosition !== this.props.googleMap.isCheckGeoPosition && this.props.googleMap.isCheckGeoPosition) {
        removeMarker(prevProps.googleMap.selectedMarker.id);
        addNewMarker(this.props.googleMap.selectedMarker);
      }

      if (prevProps.googleMap.isMarkerSaved !== this.props.googleMap.isMarkerSaved && this.props.googleMap.isMarkerSaved) {
        setMarkerTitle(prevProps.googleMap.selectedMarker);
      }

      if (this.props.googleMap.deleteIdMarker) {
        removeMarker(this.props.googleMap.deleteIdMarker);
        this.props.deleteMarker('');
      }

      if (!this.props.googleMap.isUserMarkerCreated && this.props.googleMap.position.isSuccess && this.props.isCheckIn) {
        createUserMarker(this.props.googleMap.position);
        this.props.userMarkerCreate(true);
      }

      if (this.props.selectedListId &&
        !this.props.googleMap.isMarkerRendered && this.props.isCheckIn) {
        dropMarker();
        if(this.props.googleMap.markersList.length > 0 ) {
          this.props.markerRender(true);
        }
      } else if ( this.props.selectedListId !== prevProps.selectedListId) {
        clearMarkersMap();
        this.props.markerRender(false);
      }

      if (this.props.googleMap.selectedMarker.id && this.props.googleMap.position.isSuccess && this.props.isCheckIn) {
        getDistance();
      }
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"/>
      </React.Fragment>
    );
  }
}

export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyA8oFZtx1g0Pb6vGB8KboGYWXAiADslAMw&v=3&libraries=geometry')(GoogleMap);
