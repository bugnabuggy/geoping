import { ADD_MARKER, PERMISSION_TO_ADD_MARKER } from '../DTO/constantsForReducer/googleMap';

export const addPoints = ( markers: Array<any> ) => ( dispatch: Function ) => {
  dispatch ( addPointsAction ( markers ) );
};

export const permissionToAddMarker = ( isAddMarker: boolean ) => ( dispatch: Function ) => {
  dispatch(permissionToAddMarkerAction(isAddMarker));
};

/* Actions */
function addPointsAction( markers: any ): Object {
  return { type: ADD_MARKER, markers };
}

function permissionToAddMarkerAction( isAddMarker: boolean ): Object {
  return { type: PERMISSION_TO_ADD_MARKER, isAddMarker };
}