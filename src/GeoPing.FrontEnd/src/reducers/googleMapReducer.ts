import { googleMapState } from '../state/googleMapState';
import IGoogleMapType, { EnumStatusMarker } from '../DTO/types/googleMapType';
import { defaultMarker } from '../DTO/constants/defaultMarker';
import {
  ADD_MARKERS,
  ADD_NEW_POINT,
  ADD_POINT,
  CANCEL_ADD_NEW_POINT,
  CANCEL_EDITING_GEO_POINT,
  CHANGE_DATA_GEO_POINT, CLEAR_MARKER_LIST,
  DELETE_MARKER,
  EDIT_GEO_POINT,
  FIND_LOCATION_FOR_CENTER_MAP,
  MARKER_INSTALED,
  MARKERS_RENDERED,
  MOVE_DRAG_MARKER,
  MOVE_END_MARKER,
  MOVE_START_MARKER,
  PERMISSION_TO_ADD_MARKER,
  PUT_STATUS_MARKER,
  SELECT_MARKER,
  USER_MARKER_CREATED
} from '../DTO/constantsForReducer/googleMap';

export default function googleMapReducer( state: IGoogleMapType = googleMapState, action: any ) {
  const reduceObject: any = {
    [ ADD_MARKERS ]: addPoints,
    [ PERMISSION_TO_ADD_MARKER ]: permissionToAddMarker,
    [ SELECT_MARKER ]: selectMarker,
    [ MOVE_START_MARKER ]: moveStartMarker,
    [ MOVE_DRAG_MARKER ]: moveDragMarker,
    [ MOVE_END_MARKER ]: moveEndMarker,
    [ CHANGE_DATA_GEO_POINT ]: changeDataGEOPoint,
    [ CANCEL_EDITING_GEO_POINT ]: cancelEditingGEOPoint,
    [ EDIT_GEO_POINT ]: editGEOPoint,
    [ ADD_POINT ]: addPoint,
    [ MARKER_INSTALED ]: markerInstaled,
    [ CANCEL_ADD_NEW_POINT ]: cancelAddNewPoint,
    [ ADD_NEW_POINT ]: addNewPoint,
    [ PUT_STATUS_MARKER ]: putStatusMarker,
    [ FIND_LOCATION_FOR_CENTER_MAP ]: findLocationForCenterMap,
    [ DELETE_MARKER ]: deleteMarker,
    [ USER_MARKER_CREATED ]: userMarkerCreated,
    [ MARKERS_RENDERED ]: markerRendered,
    [CLEAR_MARKER_LIST]: clearMarkerList,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function addPoints( state: IGoogleMapType, action: any ) {
  return {
    ...state,
    markersList: [ ...action.markers ],
  };
}

function permissionToAddMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state );
  newState.isAddMarker = action.isAddMarker;
  return newState;
}

function selectMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign(
    {},
    state,
    { selectedMarker: action.marker },
    { moveStartMarker: googleMapState.moveStartMarker },
    { moveEndMarker: googleMapState.moveEndMarker }
  );
  return newState;
}

function moveStartMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    moveStartMarker: action.markerCoords,
    isThereIsNewMarker: false,
  } );
  return newState;
}

function moveDragMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    selectedMarker: {
      ...state.selectedMarker,
      ...action.markerCoords
    }
  } );
  return newState;
}

function moveEndMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    selectedMarker: {
      ...state.selectedMarker,
      ...action.markerCoords
    }
  } );
  return newState;
}

function changeDataGEOPoint( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    selectedMarker: {
      ...state.selectedMarker,
      [ action.field ]: action.value,
    },
    isMarkerCanceled: false,
    isMarkerSaved: false,
    isThereIsNewMarker: false,
  } );
  return newState;
}

function cancelEditingGEOPoint( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    isMarkerInstalled: false,
    isMarkerCanceled: true,
    isMarkerSaved: false,
    isCheckGeoPosition: false,
    selectedMarker: {
      ...defaultMarker,
    },
    markersList: [
      ...state.markersList,
      // ...state.markersList.map ( ( item: any ) => {
      //   debugger
      //   if ( item.id === newSelectedMarker.id ) {
      //     return state.selectedMarker;
      //   } else {
      //     return item;
      //   }
      // } )
    ]
  } );
  return newState;
}

function editGEOPoint( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    markers: [
      ...state.markersList.map( item => {
        return item.id === state.selectedMarker.id ? state.selectedMarker : item;
      } )
    ]
  } );
  return newState;
}

function addPoint( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    selectedMarker: {
      ...action.marker,
    },
    isThereIsNewMarker: true,
    isMarkerCanceled: false,
    isMarkerSaved: false,
    isCheckGeoPosition: true,
  } );
  return newState;
}

function markerInstaled( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    isMarkerInstalled: action.isMarkerInstaled,
    isMarkerCanceled: false,
    isMarkerSaved: false,
  } );
  return newState;
}

function cancelAddNewPoint( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    selectedMarker: { ...defaultMarker },
    isMarkerInstalled: false,
    isMarkerCanceled: true,
    isMarkerSaved: false,
    isCheckGeoPosition: false,
    isThereIsNewMarker: false,
    markersForMap: [
      ...state.markersForMap.filter( item => {
        if ( state.selectedMarker.id === item.id ) {
          item.setMap( null );
        } else {
          return item;
        }
      } )
    ],
  } );
  return newState;
}

function addNewPoint( state: IGoogleMapType, action: any ) {
  let markerList: any;
  if ( state.statusMarker === EnumStatusMarker.Edit ) {
    markerList = state.markersList.map( item => {
      if ( action.idMarker === item.id ) {
        return state.selectedMarker;
      } else {
        return item;
      }
    } );
  } else {
    markerList = [
      ...state.markersList,
      state.selectedMarker
    ];
  }
  const newState: IGoogleMapType = Object.assign( {}, state, {
    markersList: [
      ...markerList
    ],
    selectedMarker: { ...defaultMarker },
    isMarkerSaved: true,
    isMarkerInstalled: false,
    isMarkerCanceled: false,
    isCheckGeoPosition: false,
    isThereIsNewMarker: false,
  } );
  return newState;
}

function putStatusMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, { statusMarker: action.statusMarker } );
  return newState;
}

function findLocationForCenterMap( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, { position: action.position } );
  return newState;
}

function deleteMarker( state: IGoogleMapType, action: any ) {
  const newState: IGoogleMapType = Object.assign( {}, state, {
    markersList: [
      ...state.markersList.filter( item => {
        if ( item.id !== action.idMarker ) {
          return item;
        }
      } )
    ],
    deleteIdMarker: action.idMarker,
    selectedMarker: { ...defaultMarker },
    isMarkerSaved: false,
    isMarkerInstalled: false,
    isMarkerCanceled: false,
    isCheckGeoPosition: false,
    isThereIsNewMarker: false,
  } );
  return newState;
}

function userMarkerCreated( state: IGoogleMapType, action: any ) {
  return {
    ...state,
    isUserMarkerCreated: action.isCreate,
  };
}

function markerRendered( state: IGoogleMapType, action: any ) {
  return {
    ...state,
    isMarkerRendered: action.isMarkerRendered,
  };
}

function clearMarkerList( state: IGoogleMapType, action: any ) {
  return {
    ...state,
    markersList: googleMapState.markersList,
  };
}