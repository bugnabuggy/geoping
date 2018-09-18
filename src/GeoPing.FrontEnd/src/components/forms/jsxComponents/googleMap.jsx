import * as React from 'react';
import * as ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class GoogleMap extends React.Component {
  map;
  markers;
  isAddMarker;

  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };
    this.markers = [];
    this.isAddMarker = props.isAddMarker || false;

    window.React = React;
    window.ReactDOM = ReactDOM;
    this.createMarker = this.createMarker.bind(this);
    this.createMap = this.createMap.bind(this);
    this.toggleBounce = this.toggleBounce.bind(this);
    this.dropMarker = this.dropMarker.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.addMarkerToTheMap = this.addMarkerToTheMap.bind(this);
    this.createImageMarker = this.createImageMarker.bind(this);
    this.createAnimationMarker = this.createAnimationMarker.bind(this);
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
    if (prevProps.isScriptLoaded !== this.props.isScriptLoaded) {
      const isLoadedButWasntLoadedBefore =
        !this.state.showMap &&
        !prevProps.isScriptLoaded &&
        this.props.isScriptLoaded;

      this.setState({
        showMap: isLoadedButWasntLoadedBefore && this.props.isScriptLoadSucceed && true,
      });
      this.map = this.createMap();
      this.dropMarker();
    }
    if (prevProps.isAddMarker !== this.props.isAddMarker) {
      this.isAddMarker = this.props.isAddMarker;
    }
  }

  componentWillUnmount() {
    // markers.forEach((item) => {
    //   item.removeEventListener('click', )
    // });
    // this.map.removeEventListener('click', this.addMarkerToTheMap);
  }

  addMarkerToTheMap(event) {
    if (this.isAddMarker) {
      this.createMarker(event.latLng, this.markers.length, 200, true);
      this.props.permissionToAddMarker(false);
    }
  }

  createMap() {
    let googleMap = new google.maps.Map(map, {
      center: {lat: 54.9924400, lng: 73.3685900},
      zoom: 5
    });

    googleMap.addListener('click', this.addMarkerToTheMap);

    return googleMap;
  }

  dropMarker() {
    this.clearMarkers();
    this.props.positions.forEach((item, index) => {
      this.createMarker(item, index, index * 400);
    })
  }

  clearMarkers() {
    this.markers.forEach((item) => {
      item.setMap(null);
    });
    this.markers = [];
  }

  createImageMarker(index) {
    const pinColor = "26b430";
    const iconUrl = `http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColor}|0000FF`;
    const pinImage = new google.maps.MarkerImage(iconUrl,
      new google.maps.Size(45, 43),
      new google.maps.Point(0, 0),
      new google.maps.Point(13, 42),
      new google.maps.Size(50, 45));
    this.markers.forEach((item, id) => {
      if (index === id) {
        this.markers[id].setIcon(pinImage);
        this.markers[id].setDraggable(true);
      } else {
        this.markers[id].setIcon(null);
      }
    });
  }

  createAnimationMarker(index) {
    // this.markers[index].setAnimation(google.maps.Animation.BOUNCE);
  }

  toggleBounce(e, index) {

    this.markers[index].getIcon() !== null ? this.markers[index].setIcon(null) : this.createImageMarker(index);
    this.markers[index].getAnimation() !== null ? this.markers[index].setAnimation(null) : this.createAnimationMarker(index);
  }

  createMarker(position, index, timeout, select) {
    const that = this;
    window.setTimeout(function () {
      const marker = new google.maps.Marker({
        position: position,
        title: index.toString(),
        map: that.map,
        icon: null,
        draggable: false,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', (e) => {
        that.toggleBounce(e, index)
      });
      that.markers.push(marker);
      select && that.createImageMarker(index);
      // select && that.createAnimationMarker(index);
    }, timeout || 100);
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    );
  }
}

export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyA8oFZtx1g0Pb6vGB8KboGYWXAiADslAMw')(GoogleMap);
