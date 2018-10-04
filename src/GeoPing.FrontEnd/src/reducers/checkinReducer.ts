import ICheckinStateType from '../DTO/types/stateTypes/checkinStateType';
import { checkinState } from '../state/checkinState';
import {
  CHECK_IN_FLAG_CHANGE,
  CHECK_IN_LOAD_LISTS,
  CHECK_IN_SELECT_LIST
} from '../constantsForReducer/checkin';
import { ADD_DISTANCE_BETWEEN_POINTS, SELECT_MARKER } from '../constantsForReducer/googleMap';

export default function checkinReducer( state: ICheckinStateType = checkinState, action: any ) {
  const reduceObject: any = {
    [ CHECK_IN_LOAD_LISTS ]: checkinLoadLists,
    [ CHECK_IN_SELECT_LIST ]: selectList,
    [ CHECK_IN_FLAG_CHANGE ]: checkinFlag,
    [ ADD_DISTANCE_BETWEEN_POINTS ]: addDistanceBetweenPoints,
    [ SELECT_MARKER ]: selectMarker,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function checkinLoadLists( state: ICheckinStateType, action: any ) {
  return {
    ...state,
    selectList: action.lists,
  };
}

function selectList( state: ICheckinStateType, action: any ) {
  return {
    ...state,
    selectedListId: action.idList,
  };
}

function checkinFlag( state: ICheckinStateType, action: any ) {
  return {
    ...state,
    isCheckIn: action.isCheckin,
  };
}

function addDistanceBetweenPoints( state: ICheckinStateType, action: any ) {
  return {
    ...state,
    difference: action.distance,
  };
}

function selectMarker( state: ICheckinStateType, action: any ) {
  if ( action.marker.id === '' ) {
    return {
      ...state,
      difference: null,
    };
  }
  return state;
}