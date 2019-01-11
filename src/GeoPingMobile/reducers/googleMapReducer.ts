import { googleMapState } from '../state/googleMapState';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import {
  ADD_LIST_POINTS,
  ADD_NEW_GEO_POINT,
  CANCEL_GEO_POINT,
  CHANGE_DATA_GEO_POINT,
  CHANGE_MOVING_GEO_POINT,
  CLEAR_GEO_POINT,
  CLEAR_STATE_GOOGLE_MAP,
  DELETE_GEO_POINT,
  FIND_GEO_POSITION,
  GEO_POINT_LIST_IS_CREATED,
  PERMISSION_TO_ADD,
  SAVE_GEO_POINT,
  SELECT_GEO_POINT
} from '../constantsForReducer/googleMap';
import { EnumStatusMarker } from '../enums/statusMarker';
import IGeoPoint, { ETypeCheckInPoint, ICheckInGeoPointDTO } from '../DTO/geoPointDTO';
import { defaultMarker } from '../constants/defaultMarker';
import { CHECK_IN_GEO_POINTS, CHECK_IN_SELECT_LIST } from '../constantsForReducer/checkin';
import { ADD_GEO_POINT_FROM_MY_POSITION } from '../constantsForReducer/checkList';
import { STATISTICS_LOAD_POINTS } from '../constantsForReducer/checkinStatistics';
import { v4 as uuidV4 } from 'uuid';

export default function googleMapReducer( state: IGoogleMapStateType = googleMapState, action: any ) {
  const reduceObject: any = {
    [ADD_LIST_POINTS]: addListPoints,
    [SELECT_GEO_POINT]: selectGeoPoint,
    [DELETE_GEO_POINT]: deleteGEOPoint,
    [ADD_NEW_GEO_POINT]: addNewGeoPoint,
    [FIND_GEO_POSITION]: findGeoPosition,
    [PERMISSION_TO_ADD]: permissionAdd,
    [CHANGE_MOVING_GEO_POINT]: changeMovingGeoPoint,
    [SAVE_GEO_POINT]: saveGeoPoint,
    [CANCEL_GEO_POINT]: cancelGeoPoint,
    [CHANGE_DATA_GEO_POINT]: changeDataGeoPoint,
    [ADD_GEO_POINT_FROM_MY_POSITION]: addGeoPointFromMyPosition,
    [GEO_POINT_LIST_IS_CREATED]: geoPointListCreate,
    [CHECK_IN_SELECT_LIST]: checkInSelectList,
    [CLEAR_STATE_GOOGLE_MAP]: clearStateGoogleMap,
    [STATISTICS_LOAD_POINTS]: statisticsLoadPoints,
    [CLEAR_GEO_POINT]: clearGeoPoint,
    [CHECK_IN_GEO_POINTS]: checkInGeoPoint,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function addListPoints( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: action.geoPoints.map ( item => {
      return {
        ...item,
        color: 'red',
      }
    } ),
    isGeoPointListIsCreated: false,
  };
}

function selectGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: {
      ...state.geoPoints.find ( geoPoint => geoPoint.idForMap === action.geoPoint.idForMap ),
      color: '#bfb914',
    },
    statusMarker: action.geoPoint.id ? EnumStatusMarker.Edit : EnumStatusMarker.None,
  };
}

function deleteGEOPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: state.geoPoints.filter ( geoPoint => geoPoint.idForMap !== action.idPoint ),
    idDeleteMarker: action.idPoint,
  };
}

function addNewGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: [
      ...state.geoPoints,
      action.geoPoint
    ],
    selectedGeoPoint: {
      ...action.geoPoint,
      radius: 50,
    },
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
    .find ( ( geoPoint: IGeoPoint ) => geoPoint.id === state.selectedGeoPoint.id );
  const moveStartMarker: { lat: number, lng: number } =
    state.statusMarker === EnumStatusMarker.Edit ?
      {
        lat: tempGeoPoint.lat,
        lng: tempGeoPoint.lng,
      }
      :
      {
        lng: null,
        lat: null,
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
        ...state.geoPoints.filter ( item => !!item.id ),
        action.geoPoint,
      ]
      :
      state.statusMarker === EnumStatusMarker.Edit ?
        [
          ...state.geoPoints.map ( item => {
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
      geoPoints: [
        ...state.geoPoints.filter ( item => {
          return item.idForMap !== state.selectedGeoPoint.idForMap;
        } )
      ],
      idDeleteMarker: state.selectedGeoPoint.id,
      selectedGeoPoint: googleMapState.selectedGeoPoint,
      statusMarker: EnumStatusMarker.None,
    };
  } else if ( state.statusMarker === EnumStatusMarker.Edit ) {
    let moveMarker: any = {};
    if ( state.moveStartMarker.lat !== null && state.moveStartMarker.lng !== null ) {
      moveMarker = {
        ...state.moveStartMarker,
      };
    }
    return {
      ...state,
      geoPoints: [
        ...state.geoPoints.map ( item => {
          return item.id === state.selectedGeoPoint.id ?
            {
              ...item,
              ...moveMarker,
            }
            :
            item;
        } )
      ],
      selectedGeoPoint: googleMapState.selectedGeoPoint,
      statusMarker: EnumStatusMarker.None,
    };
  }
  return {
    ...state,
  };
}

function changeDataGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: {
      ...state.selectedGeoPoint,
      [action.field]: action.data,
    },
  };
}

function addGeoPointFromMyPosition( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    selectedGeoPoint: {
      ...defaultMarker,
      lat: state.position.lat,
      lng: state.position.lng,
      radius: 50,
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

function statisticsLoadPoints( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  const colorMarker = {
    [ETypeCheckInPoint.FreeCheck]: '#2f36ff',
    [ETypeCheckInPoint.Unchecked]: '#d71f27',
    [ETypeCheckInPoint.Checked]: '#188c25',
  };
  return {
    ...state,
    geoPoints: action.points.map ( ( item ) => {
      const point: IGeoPoint = {
        id: item.pointId,
        name: item.name,
        radius: item.radius || 50,
        idList: '',
        description: item.address,
        lng: item.longitude,
        lat: item.latitude,
        idForMap: uuidV4 (),
        color: colorMarker[item.type],
      };
      return point;
    } ),
    checkInGeoPoint: action.points.map ( ( item ) => {
      const check: ICheckInGeoPointDTO = {
        pointId: item.checkInId && item.pointId,
        userId: item.userId,
        date: item.checkInDate,
        distance: item.distance,
        longitude: item.longitude,
        latitude: item.latitude,
        description: item.address,
        deviceId: '',
        checkInId: item.checkInId,
        ip: '',
        userAgent: '',
        geopoint: '',
        type: item.type,
      };
      return check;
    } ),
    isGeoPointListIsCreated: false,
  };
}

function clearGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: googleMapState.geoPoints,
    selectedGeoPoint: googleMapState.selectedGeoPoint,
    statusMarker: googleMapState.statusMarker,
    isGeoPointListIsCreated: googleMapState.isGeoPointListIsCreated,
  };
}

function checkInGeoPoint( state: IGoogleMapStateType, action: any ): IGoogleMapStateType {
  return {
    ...state,
    geoPoints: [
      ...state.geoPoints.map ( item => {
        return {
          ...item,
          color: action.checkInGeoPoint.find( check => check.pointId === item.id )  ? '#188c25' : '#d71f27',
        };
      } ),
    ],
    checkInGeoPoint: [
      ...state.checkInGeoPoint,
      ...action.checkInGeoPoint
    ],
  };
}