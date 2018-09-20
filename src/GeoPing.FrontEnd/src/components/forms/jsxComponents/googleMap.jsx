import * as React from 'react';
import * as ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import {
  setContext,
  setGoogleLibrary,
  createMap,
  dropMarker,
  toggleBounce,
  addNewMarker,
  removeMarker,
  setMarkerPosition,
  setMarkerTitle,
} from '../../../services/googleMapService';
import {EnumStatusMarker} from "../../../DTO/types/googleMapType";

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
    this.isAddMarker = props.isAddMarker || false;
    this.isSelectedMarker = false;
    this.options = {
      center: {lat: props.position.lat, lng: props.position.lng},
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
    setGoogleLibrary(google);
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
    if (prevProps.isAddMarker !== this.props.isAddMarker) {
      this.isAddMarker = this.props.isAddMarker;
    }

    if (prevProps.selectedMarker.id !== this.props.selectedMarker.id) {
      toggleBounce(this.props.selectedMarker);
    }
    // console.log(prevProps.markers.length);
    //   if (prevProps.markers.length < this.props.markers.length) {
    //     console.log(this.props.markers);
    //     dropMarker();
    //   }

    if (prevProps.statusMarker === EnumStatusMarker.New &&
      prevProps.isMarkerCanceled !== this.props.isMarkerCanceled &&
      this.props.isMarkerCanceled) {
      removeMarker(prevProps.selectedMarker.id);
      this.props.editingPermission(false);
    } else if (prevProps.isMarkerCanceled !== this.props.isMarkerCanceled && this.props.isMarkerCanceled) {
      setMarkerPosition(this.props.markers.find(item => item.id === prevProps.selectedMarker.id));
    }

    if (/*this.props.isThereIsNewMarker || */(prevProps.isCheckGeoPosition !== this.props.isCheckGeoPosition && this.props.isCheckGeoPosition)) {
      removeMarker(prevProps.selectedMarker.id);
      addNewMarker(this.props.selectedMarker);
    }

    if (prevProps.isMarkerSaved !== this.props.isMarkerSaved && this.props.isMarkerSaved) {
      setMarkerTitle(prevProps.selectedMarker);
    }

    if(this.props.deleteIdMarker) {
      removeMarker(this.props.deleteIdMarker);
      this.props.deleteMarker('');
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

export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyA8oFZtx1g0Pb6vGB8KboGYWXAiADslAMw')(GoogleMap);
