import {
  ADD_DISTANCE_BETWEEN_POINTS,
  ADD_MARKERS,
  ADD_NEW_POINT,
  ADD_POINT,
  CANCEL_ADD_NEW_POINT,
  CANCEL_EDITING_GEO_POINT,
  CHANGE_DATA_GEO_POINT,
  CLEAR_MARKER_LIST,
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
} from '../constantsForReducer/googleMap';
import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumStatusMarker, IMarker, IPosition } from '../DTO/types/googleMapType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export const addPoints = ( markers: Array<any> ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addPointsAction( markers ) );
};

export const permissionToAddMarker = ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( permissionToAddMarkerAction( isAddMarker ) );
};

export const selectedMarker = ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectedMarkerAction( marker ) );
};

export const moveStartMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch( moveStartMarkerAction( markerCoords ) );
};

export const moveDragMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch( moveDragMarkerAction( markerCoords ) );
};

export const moveEndMarker = ( markerCoords: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch( moveEndMarkerAction( markerCoords ) );
};

export const changeDataGEOPoint = ( idMarker: string, field: string, value: string | number ) =>
  ( dispatch: IDispatchFunction ) => {
    dispatch( changeDataGEOPointAction( idMarker, field, value ) );
  };

export const editGEOPoint = ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch( editGEOPointAction( marker ) );
};

export const cancelEditingGEOPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch( cancelEditingGEOPointAction() );
};

export const addNewPoint = ( idMarker: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addNewPointAction( idMarker ) );
};

export const cancelAddNewPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch( cancelAddNewPointAction() );
};

export const markerInstalled = ( isMarkerInstaled: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( markerInstalledAction( isMarkerInstaled ) );
};

export const putStatusMarker = ( statusMarker: EnumStatusMarker ) => ( dispatch: IDispatchFunction ) => {
  dispatch( putStatusMarkerAction( statusMarker ) );
};

export const findLocationForCenterMap = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      const position: IPosition = {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
        isSuccess: true,
      };
      dispatch( findLocationForCenterMapAction( position ) );
    },
    ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const deleteMarker = ( idMarker: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( deleteMarkerAction( idMarker ) );
};

export const userMarkerCreate = ( isCreate: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( userMarkerCreateAction( isCreate ) );
};

export const markerRender = ( isMarkerRendered: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( markerRenderAction( isMarkerRendered ) );
};

export const addDistance = ( distance: number ) => ( dispatch: IDispatchFunction ) => {
  dispatch(addDistanceAction(Math.round( distance )));
};

export const clearMarkerList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearMarkerListAction() );
};

/* Actions **********************************************************************************************/
export function addPointsAction( markers: any ): Object {
  return { type: ADD_MARKERS, markers };
}

function permissionToAddMarkerAction( isAddMarker: boolean ): Object {
  return { type: PERMISSION_TO_ADD_MARKER, isAddMarker };
}

function selectedMarkerAction( marker: IMarker ): Object {
  return { type: SELECT_MARKER, marker };
}

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

function userMarkerCreateAction( isCreate: boolean ): Object {
  return { type: USER_MARKER_CREATED, isCreate };
}

function markerRenderAction( isMarkerRendered: boolean ): Object {
  return { type: MARKERS_RENDERED, isMarkerRendered };
}

function clearMarkerListAction(): Object {
  return { type: CLEAR_MARKER_LIST };
}

function addDistanceAction( distance: number ): Object {
  return { type: ADD_DISTANCE_BETWEEN_POINTS, distance };
}