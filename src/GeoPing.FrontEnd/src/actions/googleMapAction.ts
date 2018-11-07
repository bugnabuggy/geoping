import {
  ADD_DISTANCE_BETWEEN_POINTS,
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
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { IPosition } from '../types/stateTypes/googleMapStateType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import StaticStorage from '../services/staticStorage';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';
import IGeoPoint from '../DTO/geoPointDTO';
import { EnumStatusMarker } from '../enums/statusMarker';
import { getGeoCode } from '../services/googleMapService';

export const addListPoints = ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => {
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  markerService.getAllMarkersForCheckList( idCheckList )
    .then( ( geoPoints: Array<IGeoPoint> ) => {
      dispatch( addListPointsAction( geoPoints ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const selectPoint = ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectPointAction( geoPoint ) );
  if ( !geoPoint.id ) {
    dispatch( addDistanceAction( null ) );
  }
};

export const deleteGeoPoint = ( geoPoint: IGeoPoint, statusMarker: EnumStatusMarker, idList: string ) =>
  ( dispatch: IDispatchFunction ) => {
    if ( statusMarker === EnumStatusMarker.Edit || statusMarker === EnumStatusMarker.None ) {
      if ( geoPoint.id ) {
        const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
        markerService.deleteMarker( idList, geoPoint.id )
          .then( ( response: any ) => {
            dispatch( deleteGeoPointAction( geoPoint.idForMap ) );
          } )
          .catch( ( error: any ) => {
            dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
          } );
      } else {
        dispatch( deleteGeoPointAction( '' ) );
      }
    } else if ( statusMarker === EnumStatusMarker.New ) {
      dispatch( deleteGeoPointAction( geoPoint.idForMap ) );
    }
  };

export const addNewPoint = ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addNewPointAction( geoPoint ) );
};

export const findGeoPosition = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      const position: IPosition = {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
        isSuccess: true,
        address: '',
      };
      dispatch( findGeoPositionAction( position ) );
    },
    ( error: any ) => {
      if ( error.code === 1 ) {
        dispatch( addNotificationAction( createNotification(
          'Please allow access to browser geo location',
          EnumNotificationType.Danger ) ) );
      } else {
        dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      }
    } );
};

export const getMyAddress = () => ( dispatch: IDispatchFunction ) => {
  window.navigator.geolocation.getCurrentPosition(
    ( location: any ) => {
      const pos: any = {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      };
      getGeoCode( pos )
        .then( ( address: string ) => {
          const position: IPosition = {
            lng: location.coords.longitude,
            lat: location.coords.latitude,
            isSuccess: true,
            address: address,
          };
          dispatch( findGeoPositionAction( position ) );
        } )
        .catch( ( error: any ) => {
          dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
        } );
    },
    ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const permissionAdd = ( isPermissionAdd: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( permissionAddAction( isPermissionAdd ) );
};

export const changeMovingGeoPoint = ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeMovingGeoPointAction( geoPoint ) );
};

export const createGeoPoint = ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => {
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  markerService.createNewMarker( marker )
    .then( ( geoPoint: any ) => {
      dispatch( saveGeoPointAction( geoPoint ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const updateGeoPoint = ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => {
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  markerService.updateMarker( marker )
    .then( ( geoPoint: any ) => {
      dispatch( saveGeoPointAction( geoPoint ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const saveGeoPoint = ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => {
  if ( !geoPoint.id ) {
    createGeoPoint( geoPoint )( dispatch );
  } else {
    updateGeoPoint( geoPoint )( dispatch );
  }
};

export const cancelGeoPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch( cancelGeoPointAction() );
};

export const changeDataGeoPoint = ( field: string, data: string | number ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeDataGeoPointAction( field, data ) );
};

export const geoPointListIsCreate = ( isGeoPointListIsCreated: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( geoPointListIsCreateAction( isGeoPointListIsCreated ) );
};

export const addDistance = ( distance: number ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addDistanceAction( Math.round( distance ) ) );
};

export const clearStateGoogleMap = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearStateGoogleMapAction() );
};

export const clearGeoPoint = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearGeoPointAction() );
};

/* Actions */

export function addListPointsAction( geoPoints: Array<IGeoPoint> ): { type: string, geoPoints: Array<IGeoPoint> } {
  return { type: ADD_LIST_POINTS, geoPoints };
}

function selectPointAction( geoPoint: IGeoPoint ): { type: string, geoPoint: IGeoPoint } {
  return { type: SELECT_GEO_POINT, geoPoint };
}

function deleteGeoPointAction( idPoint: string ): { type: string, idPoint: string } {
  return { type: DELETE_GEO_POINT, idPoint };
}

function addNewPointAction( geoPoint: IGeoPoint ): { type: string, geoPoint: IGeoPoint } {
  return { type: ADD_NEW_GEO_POINT, geoPoint };
}

function findGeoPositionAction( geoPosition: IPosition ): { type: string, geoPosition: IPosition } {
  return { type: FIND_GEO_POSITION, geoPosition };
}

function permissionAddAction( isPermissionAdd: boolean ): { type: string, isPermissionAdd: boolean } {
  return { type: PERMISSION_TO_ADD, isPermissionAdd };
}

function changeMovingGeoPointAction( geoPoint: { lat: number, lng: number } ):
  { type: string, geoPoint: { lat: number, lng: number } } {
  return { type: CHANGE_MOVING_GEO_POINT, geoPoint };
}

function saveGeoPointAction( geoPoint: IGeoPoint ): { type: string, geoPoint: IGeoPoint } {
  return { type: SAVE_GEO_POINT, geoPoint };
}

function changeDataGeoPointAction( field: string, data: string | number ):
  { type: string, field: string, data: string | number } {
  return { type: CHANGE_DATA_GEO_POINT, field, data };
}

function cancelGeoPointAction(): { type: string } {
  return { type: CANCEL_GEO_POINT };
}

function geoPointListIsCreateAction( listCreated: boolean ): { type: string, listCreated: boolean } {
  return { type: GEO_POINT_LIST_IS_CREATED, listCreated };
}

function addDistanceAction( distance: number ): { type: string, distance: number } {
  return { type: ADD_DISTANCE_BETWEEN_POINTS, distance };
}

function clearStateGoogleMapAction(): { type: string } {
  return { type: CLEAR_STATE_GOOGLE_MAP };
}

function clearGeoPointAction(): { type: any } {
  return { type: CLEAR_GEO_POINT };
}
