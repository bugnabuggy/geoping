import { v4 as uuidV4 } from 'uuid';

import { defaultMarker } from '../DTO/constants/defaultMarker';
import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';

let _that: any = null;
let _google: any = null;
const pinColor: string = '26b430';
const iconUrl: string = 'http://chart.apis.google.com/chart' +
  `?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|${pinColor}|0000FF`;
let pinImage: any = null;

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
    marker.setDraggable( true );
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

export function addNewMarker( marker: any ) {
  removeMarker( marker.id );
  createMarker( marker, _that.markers.length, 1 * 400, true );
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
  _that.props.markers.forEach( ( item: any, index: number ) => {
    createMarker( item, index, index * 400, false );
  } );
}

/****************************************/

export function createMarker( position: IMarker, index: number, timeout: number, select: any ) {
  window.setTimeout(
    function() {
      const marker = new _google.maps.Marker( {
        position: position,
        title: position.name,
        map: _that.map,
        icon: null,
        draggable: false,
        id: position.id,
        animation: _google.maps.Animation.DROP,
      } );

      marker.addListener( 'click', ( e: any ) => {
        if ( _that.props.selectedMarker.id !== position.id ) {
          _that.props.selectMarker( _that.props.markers.find( ( item: IMarker ) => item.id === position.id ) );
          _that.props.editingPermission( true );
          _that.props.putStatusMarker( EnumStatusMarker.Edit );
        } else {
          if ( _that.props.isMarkerInstalled ) {
            removeMarker( _that.props.selectedMarker.id );
            _that.props.cancelAddNewPoint();
            _that.props.markerInstalled( false );
          }
          _that.props.putStatusMarker( EnumStatusMarker.None );
          _that.props.selectMarker( defaultMarker );
          _that.props.markerInstalled( false );
          _that.props.editingPermission( false );
        }
      } );

      marker.addListener( 'dragstart', ( event: any ) => {
        geocoderAddress( event.latLng, event, position, _that.props.moveStartMarker );
      } );

      marker.addListener( 'drag', ( event: any ) => {
        _that.props.moveDragMarker( createMarkerForMoved( event, position ) );
      } );

      marker.addListener( 'dragend', ( event: any ) => {
        geocoderAddress( event.latLng, event, position, _that.props.moveEndMarker );
      } );

      _that.markers.push( marker );
      if ( select ) {
        createIconMarker( position.id );
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
        createMarker( newMarker, _that.markers.length, 200, true );
        _that.props.selectMarker( newMarker );
        _that.props.permissionToAddMarker( false );
        _that.props.editingPermission( true );
        _that.props.markerInstalled( true );
      } );
  } else {
    if ( _that.props.selectedMarker.id !== defaultMarker.id ) {
      if ( _that.props.isMarkerInstalled ) {
        removeMarker( _that.props.selectedMarker.id );
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