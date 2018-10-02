import { v4 as uuidV4 } from 'uuid';

import { defaultMarker } from '../DTO/constants/defaultMarker';
import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';

let _that: any = null;
let _google: any = null;
const pinColor: string = '26b430';
const iconUrl: string = 'http://chart.apis.google.com/chart' +
  `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColor}|0000FF`;
let pinImage: any = null;

const iconUser: string = 'assets/images/card-pin.png';
let pinUserImage: any = null;
let userMarker: null;

function createMarkerForMoved( event: any, position: any, description?: string ) {
  return {
    id: position.id,
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
    description,
  };
}

export function setContext( that: any ) {
  _that = that;
}

export function setGoogleLibrary( google: any ) {
  _google = google;
  pinImage = new _google.maps.MarkerImage(
    iconUrl,
    new _google.maps.Size( 45, 43 ),
    new _google.maps.Point( 0, 0 ),
    new _google.maps.Point( 13, 42 ),
    new _google.maps.Size( 50, 45 ) );
  pinUserImage = new _google.maps.MarkerImage(
    iconUser,
    new _google.maps.Size( 45, 43 ),
    new _google.maps.Point( 0, 0 ),
    new _google.maps.Point( 13, 42 ),
    new _google.maps.Size( 50, 45 ) );
}

export function clearMarkerIcon( marker: any ) {
  if ( marker !== null ) {
    marker.setIcon( null );
    marker.setDraggable( false );
  }
}

export function setMarkerPosition( marker: any ) {
  const point: any = findMarker( marker.id );
  const latLng: any = {
    lat: marker.lat,
    lng: marker.lng,
  };

  point.setPosition( latLng );
}

export function setMarkerTitle( marker: IMarker ) {
  const point: any = findMarker( marker.id );
  point.setTitle( marker.name );
}

function geocoderAddress( latLng: any, event: any, position: any, callback: any ) {
  _that.geocoder.geocode(
    {
      'latLng': latLng,
    },
    ( results: any, status: any ) => {
      if ( status === _google.maps.GeocoderStatus.OK ) {
        if ( results[ 0 ] ) {
          callback( createMarkerForMoved( event, position, results[ 0 ].formatted_address ) );
        }
      }
    } );
}

export function removeMarker( idMarker: string ) {
  _that.markers = _that.markers.filter( ( item: any ) => {
    if ( item.id === idMarker ) {
      item.setMap( null );
    } else {
      return item;
    }
  } );
}

export function clearMarkersIconAll( markers: Array<any> ) {
  markers.forEach( ( marker: any ) => {
    clearMarkerIcon( marker );
  } );
}

export function setMarkerIcon( marker: any ) {
  if ( marker !== null ) {
    marker.setIcon( pinImage );
    marker.setDraggable( _that.props.isEditing );
  }
}

export function findMarker( idMarker: string ) {
  return _that.markers.find( ( item: any ) => item.id === idMarker );
}

export function createIconMarker( idMarker: string ) {
  clearMarkersIconAll( _that.markers );
  setMarkerIcon( findMarker( idMarker ) );
}

export function toggleBounce( position: any ) {
  const marker = findMarker( position.id );
  if ( marker !== undefined ) {
    if ( marker.getIcon() !== null ) {
      clearMarkerIcon( marker );
    } else {
      createIconMarker( position.id );
      const center: any = { lat: position.lat, lng: position.lng };
      _that.map.setCenter( center );
    }
  } else {
    clearMarkersIconAll( _that.markers );
  }
}

export function createUserMarker( position: any ) {
  createMarker( position, true, 100, false );
}

export function addNewMarker( marker: any ) {
  removeMarker( marker.id );
  createMarker( marker, false, 1 * 400, true );
}

/********************************/

export function clearMarkersMap() {
  _that.markers.forEach( ( item: any ) => {
    item.setMap( null );
  } );
  _that.markers = [];
}

export function dropMarker() {
  clearMarkersMap();
  _that.props.googleMap.markersList.forEach( ( item: any, index: number ) => {
    createMarker( item, false, index * 400, false );
  } );
}

/****************************************/

export function createMarker( position: IMarker, isUser: boolean, timeout: number, select: any ) {
  window.setTimeout(
    function() {
      const marker = new _google.maps.Marker( {
        position: position,
        title: isUser ? 'Me' : position.name,
        map: _that.map,
        icon: null,
        draggable: false,
        id: position.id,
        animation: _google.maps.Animation.DROP,
      } );

      marker.addListener( 'click', ( e: any ) => {
        if ( !isUser ) {
          if ( _that.props.googleMap.selectedMarker.id !== position.id ) {
            if ( !_that.props.isCheckIn ) {
              _that.props.editingPermission( true );
              _that.props.putStatusMarker( EnumStatusMarker.Edit );
            }
            _that.props.selectMarker(
              _that.props.googleMap.markersList.find( ( item: IMarker ) => item.id === position.id )
            );
          } else {
            if ( _that.props.googleMap.isMarkerInstalled ) {
              removeMarker( _that.props.googleMap.selectedMarker.id );
              _that.props.cancelAddNewPoint();
              _that.props.markerInstalled( false );
            }
            _that.props.putStatusMarker( EnumStatusMarker.None );
            _that.props.selectMarker( defaultMarker );
            _that.props.markerInstalled( false );
            _that.props.editingPermission( false );
          }
        }
      } );

      marker.addListener( 'dragstart', ( event: any ) => {
        if ( _that.props.isEditing ) {
          geocoderAddress( event.latLng, event, position, _that.props.moveStartMarker );
        }
      } );

      marker.addListener( 'drag', ( event: any ) => {
        if ( _that.props.isEditing ) {
          _that.props.moveDragMarker( createMarkerForMoved( event, position ) );
        }
      } );

      marker.addListener( 'dragend', ( event: any ) => {
        if ( _that.props.isEditing ) {
          geocoderAddress( event.latLng, event, position, _that.props.moveEndMarker );
        }
      } );

      if ( !isUser ) {
        _that.markers.push( marker );
        if ( select ) {
          createIconMarker( position.id );
        }
      } else {
        marker.setIcon( pinUserImage );
        userMarker = marker;
      }
    },
    timeout || 100 );
}

export function addMarkerToTheMap( event: any ) {

  if ( _that.isAddMarker ) {
    const newMarker: IMarker = {
      ...defaultMarker,
      id: uuidV4(),
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      description: '',
    };
    _that.geocoder.geocode(
      {
        'latLng': event.latLng,
      },
      ( results: any, status: any ) => {
        if ( status === _google.maps.GeocoderStatus.OK ) {
          if ( results[ 0 ] ) {
            newMarker.description = results[ 0 ].formatted_address;
          }
        }
        createMarker( newMarker, false, 200, true );
        _that.props.selectMarker( newMarker );
        _that.props.permissionToAddMarker( false );
        _that.props.editingPermission( true );
        _that.props.markerInstalled( true );
      } );
  } else {
    if ( _that.props.googleMap.selectedMarker.id !== defaultMarker.id ) {
      if ( _that.props.googleMap.isMarkerInstalled ) {
        removeMarker( _that.props.googleMap.selectedMarker.id );
        _that.props.cancelAddNewPoint();
        _that.props.markerInstalled( false );
      }
      _that.props.selectMarker( defaultMarker );
      _that.props.editingPermission( false );
      _that.props.putStatusMarker( EnumStatusMarker.None );
    }
  }
}

export function createMap( map: any, options: any ) {
  const googleMap: any = new _google.maps.Map( map, options );

  googleMap.addListener( 'click', addMarkerToTheMap );

  return googleMap;
}

export function getDistance() {
  const origin: any = new _google.maps.LatLng(
    _that.props.googleMap.selectedMarker.lat,
    _that.props.googleMap.selectedMarker.lng,
  );
  const destination: any = new _google.maps.LatLng(
    _that.props.googleMap.position.lat,
    _that.props.googleMap.position.lng,
  );
  const distance: number = _google.maps.geometry.spherical.computeDistanceBetween( destination, origin );
  _that.props.addDistance( distance );
}