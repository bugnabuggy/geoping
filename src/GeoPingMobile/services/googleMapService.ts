import { v4 as uuidV4 } from 'uuid';

import { defaultMarker } from '../constants/defaultMarker';
import IGeoPoint, { ICheckInGeoPointDTO } from '../DTO/geoPointDTO';

let _googleLib: any;
let _googleMap: any;
let _geoCoder: any;
let _markers: Array<any> = [];
let _circles: Array<any> = [];

let _options: any;
let _that: any;

let idUserMarker: any = '';

const redColor: string = 'AA0000';
const blueColor: string = '70aae9';
const pinColor: string = '26b430';
const pinColorCheckInSelected: string = 'fbd661';
// const iconSelectedGeoPointUrl: string = 'http://chart.apis.google.com/chart' +
//   `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColor}|0000FF`;
// const iconSelectedCheckInGeoPointUrl: string = 'http://chart.apis.google.com/chart' +
//   `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColorCheckInSelected}|0000FF`;
const iconUserGeoPointUrl: string = '/assets/images/card-pin.png';
const defaultTimeForAnimateMarkers: number = 300;

function getIconGeoPointUrl( color: string ) {
  return 'http://chart.apis.google.com/chart' +
    `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${color}|0000FF`;
}

export function constructorMapService( google: any, options: any, that: any ) {
  _googleLib = google;
  _options = options;
  _geoCoder = new google.maps.Geocoder();
  _that = that;
}

export function createMapAPI() {
  createMap( document.getElementById( 'map' ) );
}

export function setCenterMap( lat: number, lng: number ) {
  _googleMap.setCenter( { lat, lng } );
}

export function createUserMarkerAPI() {
  iconUserGeoPoint( defaultTimeForAnimateMarkers );
}

export function createPlaceSelectMarkerAPI() {
  iconSelectedGeoPoint( defaultTimeForAnimateMarkers );
}

export function addListMarkersAPI( geoPoints: Array<IGeoPoint> ) {
  createListMarkers( geoPoints );
}

export function deleteMarkerAPI( idGeoPoint: string ) {
  deleteGeoPoint( idGeoPoint );
}

export function deleteAllMarkersAPI() {
  deleteAllGeoPoint();
  deleteAllCircles();
}

export function deselectMarkerAPI( geoPoint: IGeoPoint ) {
  clearIconSelectedGeoPoint( geoPoint );
}

export function selectMarkerAPI( geoPoint: IGeoPoint ) {
  setIconSelectedGeoPoint( geoPoint );
}

export function getDistance() {
  const origin: any = new _googleLib.maps.LatLng(
    _that.props.googleMap.selectedGeoPoint.lat,
    _that.props.googleMap.selectedGeoPoint.lng,
  );
  const destination: any = new _googleLib.maps.LatLng(
    _that.props.googleMap.position.lat,
    _that.props.googleMap.position.lng,
  );
  const distance: number = _googleLib.maps.geometry.spherical.computeDistanceBetween( destination, origin );
  _that.props.addDistance( distance );
}

export function setCoordinatesForUserMarker( coordinates: any ) {
  if ( idUserMarker ) {
    const marker: any = findGeoPoint( idUserMarker );
    if ( marker ) {
      const latLng: any = {
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      setPosition( marker, latLng );
    }
  }
}

function createMap( htmlElement: any ) {
  _googleMap = new _googleLib.maps.Map( htmlElement, _options );
  _googleMap.addListener( 'click', handleMapListener );
}

function iconSelectedGeoPoint( timeout: number, geoPoint?: IGeoPoint ) {
  setTimeout(
    () => {
      createGeoPoint(
        geoPoint,
        createMarkerImage( getIconGeoPointUrl( pinColor ) ),
        true
      );
    },
    timeout
  );
}

function iconDefaultGeoPoint( timeout: number ) {
  setTimeout(
    () => {
      createGeoPoint(
        _that.props.selectedGeoPoint,
        null,
        false
      );
    },
    timeout
  );
}

function iconUserGeoPoint( timeout: number ) {
  idUserMarker = uuidV4();
  const userGeoPoint: IGeoPoint = {
    ...defaultMarker,
    id: '',
    name: 'Me',
    lat: _that.props.googleMap.position.lat,
    lng: _that.props.googleMap.position.lng,
    idForMap: idUserMarker,
  };
  setTimeout(
    () => {
      createGeoPoint(
        userGeoPoint,
        createMarkerImage( iconUserGeoPointUrl ),
        false
      );
    },
    timeout
  );
}

export function setIconCheckInGeoPoint() {
  _that.props.googleMap.checkInGeoPoint.forEach( ( checkInPoint: any ) => {
    _that.props.googleMap.geoPoints.forEach( ( point: IGeoPoint ) => {
      if ( point.id === checkInPoint.pointId ) {
        const marker: any = findGeoPoint( point.idForMap );
        if ( marker ) {
          marker.setIcon( createMarkerImage(
            getIconGeoPointUrl( pinColor )
          ) );
        }
      }
    } );
  } );
}

function setIconSelectedGeoPoint( geoPoint: IGeoPoint ) {
  const marker: any = findGeoPoint( geoPoint.idForMap );
  // const circle: any = findCircles( geoPoint.idForMap );
  if ( marker ) {
    marker.setIcon( createMarkerImage(
      getIconGeoPointUrl( _that.props.isCheckIn ? pinColorCheckInSelected : pinColor )
    ) );
    // circle.setOptions( {
    //   fillColor: _that.props.isCheckIn ? `#${pinColorCheckInSelected}` : `#${pinColor}`,
    //   strokeColor: _that.props.isCheckIn ? `#${pinColorCheckInSelected}` : `#${pinColor}`
    // } );
    if ( !_that.props.isCheckIn && !_that.props.checkInStatistics.isCheckInStatistics ) {
      marker.setDraggable( true );
    } else {
      marker.setDraggable( false );
    }
  }
}

export function setRadiusMarker( geoPoint: IGeoPoint ) {
  const circle: any = findCircles( geoPoint.idForMap );
  if ( circle ) {
    circle.setOptions( {
      radius: geoPoint.radius,
    } );
  }
}

function clearIconSelectedGeoPoint( geoPoint: IGeoPoint ) {
  const marker: any = findGeoPoint( geoPoint.idForMap );
  // const circle: any = findCircles( geoPoint.idForMap );

  if ( marker ) {
    marker.setIcon( null );
    marker.setDraggable( false );
    // circle.setOptions( {
    //   fillColor: `#${redColor}`,
    //   strokeColor: `#${redColor}`
    // } );
  }
}

function createListMarkers( geoPoints: Array<IGeoPoint> ) {
  geoPoints.forEach( ( item: IGeoPoint ) => {
    if ( !_that.props.isCheckIn ) {
      createGeoPoint( item, null, false );
    } else {
      const checkIn: boolean = !!_that.props.googleMap.checkInGeoPoint.find(
        ( il: ICheckInGeoPointDTO ) => il.pointId === item.id
      );
      if ( checkIn ) {
        iconSelectedGeoPoint( 100, item );
      } else {
        createGeoPoint( item, null, false );
      }
    }
  } );
}

function createGeoPoint( geoPoint: IGeoPoint, imageMarker: any, draggable: any ) {
  const marker: any = new _googleLib.maps.Marker( {
    position: geoPoint,
    title: geoPoint.name || '',
    map: _googleMap,
    icon: imageMarker,
    draggable: draggable,
    idForMap: geoPoint.idForMap,
    animation: _googleLib.maps.Animation.DROP,
  } );
  if ( geoPoint.idForMap !== idUserMarker ) {
    const circle: any = new _googleLib.maps.Circle( {
      map: _googleMap,
      radius: geoPoint.radius,
      idForMap: geoPoint.idForMap,
      fillColor: `#${blueColor}`,
      fillOpacity: 0.35,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      strokeColor: `#${blueColor}`,
    } );
    circle.bindTo( 'center', marker, 'position' );
    _circles.push( circle );
  }
  marker.addListener( 'click', ( e: any ) => {
    handleGeoPointClick( e, geoPoint );
  } );
  marker.addListener( 'drag', ( e: any ) => {
    handleGeoPointDrag( e );
  } );
  _markers.push( marker );
}

function deleteGeoPoint( idGeoPoint: string ) {
  const marker: any = findGeoPoint( idGeoPoint );
  const circle: any = findCircles( idGeoPoint );
  if ( marker ) {
    marker.setMap( null );
    circle.setMap( null );
    _markers = _markers.filter( ( point: any ) => {
      return point.idForMap !== marker.idForMap;
    } );
    _circles = _circles.filter( ( cir: any ) => {
      return cir.idForMap !== circle.idForMap;
    } );
  }
}

function deleteAllGeoPoint() {
  _markers = _markers.filter( ( marker: any ) => {
    if ( marker.idForMap !== idUserMarker ) {
      marker.setMap( null );
    } else {
      return marker;
    }
  } );
}

function deleteAllCircles() {
  _circles = _circles.filter( ( circle: any ) => {
    if ( circle.idForMap !== idUserMarker ) {
      circle.setMap( null );
    } else {
      return circle;
    }
  } );
}

function handleMapListener( event: any ) {
  if ( _that.props.googleMap.isAddMarker ) {
    getGeoCode( event.latLng )
      .then( ( geocode: string ) => {
        const newMarker: IGeoPoint = {
          ...defaultMarker,
          id: '',
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          description: geocode,
          idForMap: uuidV4(),
        };
        iconSelectedGeoPoint( 400, newMarker );
        _that.props.addNewPoint( newMarker );
      } );
    _that.props.permissionAdd( false );
    _that.props.editingPermission( true );
  }
}

function handleGeoPointClick( e: any, geoPoint: IGeoPoint ) {
  if ( _that.props.googleMap.selectedGeoPoint.idForMap !== geoPoint.idForMap ) {
    _that.props.selectPoint( geoPoint );
    // if ( _that.props.isCheckIn ) {
    //   _that.props.editingPermission( false );
    // }
  }
}

function handleGeoPointDrag( e: any ) {
  const newGeoPoint: { lat: number, lng: number } = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  };
  _that.props.changeMovingGeoPoint( newGeoPoint );
}

export function getGeoCode( latLng: any ): Promise<string> {
  return new Promise<string>( ( resolve: any, reject: any ) => {
    _geoCoder.geocode(
      {
        latLng
      },
      ( results: any, status: any ) => {

        if ( status === _googleLib.maps.GeocoderStatus.OK ) {
          if ( results[ 0 ] ) {
            resolve( results[ 0 ].formatted_address );
          }
        } else {
          reject( status );
        }
      } );
  } );
}

export function settingPointsByCoordinates( geoPoints: Array<IGeoPoint> ) {
  geoPoints.forEach( ( geoPoint: IGeoPoint ) => {
    const marker: any = findGeoPoint( geoPoint.idForMap );
    if ( marker ) {
      const latLng: any = {
        lat: geoPoint.lat,
        lng: geoPoint.lng,
      };
      // marker.setPosition( latLng );
      setPosition( marker, latLng );
    }
  } );
}

export function addMyPositionPoint( geoPoint: IGeoPoint ) {
  const merker: any = findGeoPoint( geoPoint.idForMap );
  if ( !merker ) {
    const latLng: any = {
      lat: geoPoint.lat,
      lng: geoPoint.lng,
    };
    getGeoCode( latLng )
      .then( ( geocode: string ) => {
        const newGeoPoint: IGeoPoint = {
          ...geoPoint,
          description: geocode,
          idForMap: uuidV4(),
        };
        iconSelectedGeoPoint( 200, newGeoPoint );
        _that.props.addNewPoint( newGeoPoint );
      } );
  }
}

function createMarkerImage( iconUrl: string ) {
  return new _googleLib.maps.MarkerImage(
    iconUrl,
    new _googleLib.maps.Size( 45, 43 ),
    new _googleLib.maps.Point( 0, 0 ),
    new _googleLib.maps.Point( 13, 42 ),
    new _googleLib.maps.Size( 50, 45 ) );
}

function findGeoPoint( idGeoPoint: string ) {
  return _markers.find( item => item.idForMap === idGeoPoint );
}

function findCircles( idGeoPoint: string ) {
  return _circles.find( item => item.idForMap === idGeoPoint );
}

function setPosition( marker: any, coordinates: { lat: string, lng: string } ) {
  const latLng: any = {
    ...coordinates,
  };
  marker.setPosition( latLng );
}