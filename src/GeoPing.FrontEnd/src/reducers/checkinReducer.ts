import ICheckinStateType from '../types/stateTypes/checkinStateType';
import { checkinState } from '../state/checkinState';
import {
  CHECK_IN_CLEAR,
  CHECK_IN_FLAG_CHANGE,
  CHECK_IN_LOAD_LISTS,
  CHECK_IN_SELECT_LIST,
  LOADING_CHECK_LISTS,
  LOADING_GEO_POINTS
} from '../constantsForReducer/checkin';
import { ADD_DISTANCE_BETWEEN_POINTS, SELECT_MARKER } from '../constantsForReducer/googleMap';

export default function checkinReducer( state: ICheckinStateType = checkinState, action: any ) {
  const reduceObject: any = {
    [ CHECK_IN_LOAD_LISTS ]: checkinLoadLists,
    [ CHECK_IN_SELECT_LIST ]: selectList,
    [ CHECK_IN_FLAG_CHANGE ]: checkinFlag,
    [ ADD_DISTANCE_BETWEEN_POINTS ]: addDistanceBetweenPoints,
    [ SELECT_MARKER ]: selectMarker,
    [ LOADING_CHECK_LISTS ]: loadingCheckLIst,
    [ LOADING_GEO_POINTS ]: loadingGeoPoints,
    [ CHECK_IN_CLEAR ]: clear,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function checkinLoadLists( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    selectList: action.lists,
  };
}

function selectList( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    selectedListId: action.idList,
    difference: null,
  };
}

function checkinFlag( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    isCheckIn: action.isCheckin,
  };
}

function addDistanceBetweenPoints( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    difference: action.distance,
  };
}

function selectMarker( state: ICheckinStateType, action: any ): ICheckinStateType {
  if ( action.marker.id === '' ) {
    return {
      ...state,
      difference: null,
    };
  }
  return state;
}

function loadingCheckLIst( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    isListLoading: action.isLoading
  };
}

function loadingGeoPoints( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...state,
    isPointLoading: action.isLoading
  };
}

function clear( state: ICheckinStateType, action: any ): ICheckinStateType {
  return {
    ...checkinState,
  };
}
