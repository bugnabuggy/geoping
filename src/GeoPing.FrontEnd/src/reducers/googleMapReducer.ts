import { googleMapState } from '../state/googleMapState';
import IGoogleMapType from '../DTO/types/googleMapType';
import { ADD_MARKER, PERMISSION_TO_ADD_MARKER } from '../DTO/constantsForReducer/googleMap';

export default function googleMapReducer(state: IGoogleMapType = googleMapState, action: any) {
  const reduceObject: any = {
    [ADD_MARKER]: addPoints,
    [PERMISSION_TO_ADD_MARKER]: permissionToAddMarker,
  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}

function addPoints( state: IGoogleMapType, action: any ) {
  const newState: any = Object.assign({}, state);
  newState.markers = [...action.markers];
  return newState;
}

function permissionToAddMarker(state: IGoogleMapType, action: any) {
  const newState: any = Object.assign({}, state);
  newState.isAddMarker = action.isAddMarker;
  return newState;
}