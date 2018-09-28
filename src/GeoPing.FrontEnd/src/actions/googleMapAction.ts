import {
  ADD_MARKER, ADD_MARKER_FOR_MAP, ADD_NEW_POINT,
  ADD_POINT,
  CANCEL_ADD_NEW_POINT,
  CANCEL_EDITING_GEO_POINT, DELETE_MARKER,
  EDIT_GEO_POINT, FIND_LOCATION_FOR_CENTER_MAP,
  MARKER_INSTALED,
  MOVE_DRAG_MARKER,
  MOVE_END_MARKER,
  MOVE_START_MARKER,
  PERMISSION_TO_ADD_MARKER, PUT_STATUS_MARKER,
  SELECT_MARKER, SELECT_MARKER_FOR_MAP
} from '../DTO/constantsForReducer/googleMap';
import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumStatusMarker, IMarker, IPosition } from '../DTO/types/googleMapType';
import { CHANGE_DATA_GEO_POINT } from '../DTO/constantsForReducer/googleMap';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const addPoints = ( markers: Array<any> ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( addPointsAction ( markers ) );
};

export const permissionToAddMarker = ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( permissionToAddMarkerAction ( isAddMarker ) );
};

export const selectedMarker = ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( selectedMarkerAction ( marker ) );
};

// export const selectedMarkerForMap = ( marker: any ) => ( dispatch: IDispatchFunction ) => {
//   dispatch ( selectedMarkerForMapAction ( marker ) );
// };

export const moveStartMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( moveStartMarkerAction ( markerCoords ) );
};

export const moveDragMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( moveDragMarkerAction ( markerCoords ) );
};

export const moveEndMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( moveEndMarkerAction ( markerCoords ) );
};

export const changeDataGEOPoint = ( idMarker: string, field: string, value: string | number ) =>
  ( dispatch: IDispatchFunction ) => {
    dispatch ( changeDataGEOPointAction ( idMarker, field, value ) );
  };

export const editGEOPoint = ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( editGEOPointAction ( marker ) );
};

export const cancelEditingGEOPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( cancelEditingGEOPointAction () );
};

export const addNewPoint = ( idMarker: string ) => ( dispatch: IDispatchFunction ) => {
  // dispatch ( addNotificationAction ( createNotification (
  //   'Click on the place on the map where you want to set the point or click cancel',
  //   EnumNotificationType.Primary
  // ) ) );
  dispatch ( addNewPointAction ( idMarker ) );
};

// export const addPoint = ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => {
//   dispatch ( addPointAction ( marker ) );
// };

export const cancelAddNewPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( cancelAddNewPointAction () );
};

export const markerInstalled = ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( markerInstalledAction ( isMarkerInstaled ) );
};

export const putStatusMarker = ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( putStatusMarkerAction ( statusMarker ) );
};

export const findLocationForCenterMap = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition ( ( location: any ) => {
      const position: IPosition = {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
        isSuccess: true,
      };
      dispatch ( findLocationForCenterMapAction ( position ) );
    },
    ( error: any ) => {
      console.log ( error );
    } );
};

export const deleteMarker = ( idMarker: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( deleteMarkerAction ( idMarker ) );
};

/* Actions **********************************************************************************************/
function addPointsAction( markers: any ): Object {
  return { type: ADD_MARKER, markers };
}

function permissionToAddMarkerAction( isAddMarker: boolean ): Object {
  return { type: PERMISSION_TO_ADD_MARKER, isAddMarker };
}

function selectedMarkerAction( marker: IMarker ): Object {
  return { type: SELECT_MARKER, marker };
}

// function selectedMarkerForMapAction( marker: any ): Object {
//   return { type: SELECT_MARKER_FOR_MAP, marker };
// }

function moveStartMarkerAction( markerCoords: any ): Object {
  return { type: MOVE_START_MARKER, markerCoords };
}

function moveDragMarkerAction( markerCoords: any ): Object {
  return { type: MOVE_DRAG_MARKER, markerCoords };
}

function moveEndMarkerAction( markerCoords: any ): Object {
  return { type: MOVE_END_MARKER, markerCoords };
}

function changeDataGEOPointAction( idMarker: string, field: string, value: string | number ): Object {
  return { type: CHANGE_DATA_GEO_POINT, ...{ idMarker, field, value } };
}

function editGEOPointAction( marker: IMarker ): Object {
  return { type: EDIT_GEO_POINT, marker };
}

function cancelEditingGEOPointAction(): Object {
  return { type: CANCEL_EDITING_GEO_POINT };
}

function addNewPointAction( idMarker: string ): Object {
  return { type: ADD_NEW_POINT, idMarker };
}

function cancelAddNewPointAction(): Object {
  return { type: CANCEL_ADD_NEW_POINT };
}

export function addPointAction( marker: IMarker ): Object {
  return { type: ADD_POINT, marker };
}

function markerInstalledAction( isMarkerInstaled: boolean ): Object {
  return { type: MARKER_INSTALED, isMarkerInstaled };
}

function putStatusMarkerAction( statusMarker: EnumStatusMarker ): Object {
  return { type: PUT_STATUS_MARKER, statusMarker };
}

function findLocationForCenterMapAction( position: IPosition ): Object {
  return { type: FIND_LOCATION_FOR_CENTER_MAP, position };
}

function deleteMarkerAction( idMarker: string ): Object {
  return { type: DELETE_MARKER, idMarker };
}