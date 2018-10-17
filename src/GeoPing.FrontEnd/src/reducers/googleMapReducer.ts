import { googleMapState } from '../state/googleMapState';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import {
  ADD_LIST_POINTS,
  ADD_NEW_GEO_POINT,
  CANCEL_GEO_POINT,
  CHANGE_DATA_GEO_POINT,
  CHANGE_MOVING_GEO_POINT,
  CLEAR_STATE_GOOGLE_MAP,
  DELETE_GEO_POINT,
  FIND_GEO_POSITION,
  GEO_POINT_LIST_IS_CREATED,
  PERMISSION_TO_ADD,
  SAVE_GEO_POINT,
  SELECT_GEO_POINT
} from '../constantsForReducer/googleMap';
import { EnumStatusMarker } from '../enums/statusMarker';
import IGeoPoint from '../DTO/geoPointDTO';
import { ADD_GEO_POINT_FROM_MY_POSITION } from '../constantsForReducer/filters';
import { defaultMarker } from '../constants/defaultMarker';
import { CHECK_IN_SELECT_LIST } from '../constantsForReducer/checkin';

export default function googleMapReducer( state: IGoogleMapStateType = googleMapState, action: any ) {
  const reduceObject: any = {
    [ ADD_LIST_POINTS ]: addListPoints,
    [ SELECT_GEO_POINT ]: selectGeoPoint,
    [ DELETE_GEO_POINT ]: deleteGEOPoint,
    [ ADD_NEW_GEO_POINT ]: addNewGeoPoint,
    [ FIND_GEO_POSITION ]: findGeoPosition,
    [ PERMISSION_TO_ADD ]: permissionAdd,
    [ CHANGE_MOVING_GEO_POINT ]: changeMovingGeoPoint,
    [ SAVE_GEO_POINT ]: saveGeoPoint,
    [ CANCEL_GEO_POINT ]: cancelGeoPoint,
    [ CHANGE_DATA_GEO_POINT ]: changeDataGeoPoint,
    [ ADD_GEO_POINT_FROM_MY_POSITION ]: addGeoPointFromMyPosition,
    [ GEO_POINT_LIST_IS_CREATED ]: geoPointListCreate,
    [ CHECK_IN_SELECT_LIST ]: checkInSelectList,
    [ CLEAR_STATE_GOOGLE_MAP ]: clearStateGoogleMap,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function addListPoints( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: action.geoPoints,
    isGeoPointListIsCreated: false,
  };
}

function selectGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: state.geoPoints.find( geoPoint => geoPoint.id === action.geoPoint.id ) || action.geoPoint,
    statusMarker: action.geoPoint.id ? EnumStatusMarker.Edit : EnumStatusMarker.None,
  };
}

function deleteGEOPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: state.geoPoints.filter( geoPoint => geoPoint.id !== action.idPoint ),
    idDeleteMarker: action.idPoint,
  };
}

function addNewGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: action.geoPoint,
    statusMarker: EnumStatusMarker.New,
  };
}

function findGeoPosition( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    position: action.geoPosition,
  };
}

function permissionAdd( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    isAddMarker: action.isPermissionAdd
  };
}

function changeMovingGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  const tempGeoPoint: IGeoPoint = state.geoPoints
    .find( ( geoPoint: IGeoPoint ) => geoPoint.id === state.selectedGeoPoint.id );
  const moveStartMarker: { lat: number, lng: number } =
    state.statusMarker === EnumStatusMarker.Edit ?
      {
        lat: tempGeoPoint.lat,
        lng: tempGeoPoint.lng,
      }
      :
      {
        lng: 0,
        lat: 0,
      };

  return {
    ...state,
    moveStartMarker: moveStartMarker,
    selectedGeoPoint: {
      ...state.selectedGeoPoint,
      ...action.geoPoint,
    },
  };
}

function saveGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  const newGeoListGeopoints: Array<IGeoPoint> =
    state.statusMarker === EnumStatusMarker.New ?
      [
        ...state.geoPoints,
        action.geoPoint,
      ]
      :
      state.statusMarker === EnumStatusMarker.Edit ?
        [
          ...state.geoPoints.map( item => {
            return item.id === action.geoPoint.id ? action.geoPoint : item;
          } ),
        ]
        :
        [
          ...state.geoPoints,
        ];
  return {
    ...state,
    geoPoints: [
      ...newGeoListGeopoints,
    ],
    selectedGeoPoint: googleMapState.selectedGeoPoint,
    statusMarker: EnumStatusMarker.None,
  };
}

function cancelGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  if ( state.statusMarker === EnumStatusMarker.New ) {
    return {
      ...state,
      idDeleteMarker: state.selectedGeoPoint.id,
      selectedGeoPoint: googleMapState.selectedGeoPoint,
      statusMarker: EnumStatusMarker.None,
    };
  } else if ( state.statusMarker === EnumStatusMarker.Edit ) {
    return {
      ...state,
      geoPoints: [
        ...state.geoPoints.map( item => {
          return item.id === state.selectedGeoPoint.id ?
            {
              ...item,
              ...state.moveStartMarker,
            }
            :
            item;
        } )
      ],
      selectedGeoPoint: googleMapState.selectedGeoPoint,
      statusMarker: EnumStatusMarker.None,
    };
  }
}

function changeDataGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: {
      ...state.selectedGeoPoint,
      [ action.field ]: action.data,
    },
  };
}

function addGeoPointFromMyPosition( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    // idDeleteMarker: state.selectedGeoPoint.id ? state.selectedGeoPoint.id : '',
    selectedGeoPoint: {
      ...defaultMarker,
      // id: !!state.selectedGeoPoint.id ? state.selectedGeoPoint.id : uuidV4(),
      lat: state.position.lat,
      lng: state.position.lng,
    },
    statusMarker: EnumStatusMarker.New,
  };
}

function geoPointListCreate( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    isGeoPointListIsCreated: action.listCreated,
  };
}

function checkInSelectList( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: googleMapState.selectedGeoPoint,
  };
}

function clearStateGoogleMap( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...googleMapState,
  };
}
