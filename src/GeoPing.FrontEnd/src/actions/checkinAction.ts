import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  CHECK_IN_CLEAR,
  CHECK_IN_FLAG_CHANGE,
  CHECK_IN_LOAD_LISTS,
  CHECK_IN_SELECT_LIST,
  LOADING_CHECK_LISTS,
  LOADING_GEO_POINTS
} from '../constantsForReducer/checkin';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';
import { addListPointsAction } from './googleMapAction';

export const selectList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectedListAction( idList ) );
};

export const checkin = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* load */
export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingCheckLists( true ) );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists()
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
      dispatch( loadingCheckLists( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      dispatch( loadingCheckLists( false ) );
    } );
};

export const loadPoints = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingGeoPoints( true ) );
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  markerService.getAllMarkersForCheckList( idList )
    .then( ( response: any ) => {
      dispatch( addListPointsAction( response ) );
      dispatch( loadingGeoPoints( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      dispatch( loadingGeoPoints( false ) );
    } );
};

export const checkinFlag = ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( checkinFlagAction( isCheckin ) );
};

export const checkInClear = () => ( dispatch: IDispatchFunction ) => {
  dispatch( checkInClearAction() );
};

/* Actions */

function loadListsAction( lists: Array<any> ): Object {
  return { type: CHECK_IN_LOAD_LISTS, lists };
}

function selectedListAction( idList: string ): Object {
  return { type: CHECK_IN_SELECT_LIST, idList };
}

function checkinFlagAction( isCheckin: boolean ): Object {
  return { type: CHECK_IN_FLAG_CHANGE, isCheckin };
}

function loadingCheckLists( isLoading: boolean ): { type: string, isLoading: boolean } {
  return { type: LOADING_CHECK_LISTS, isLoading };
}

function loadingGeoPoints( isLoading: boolean ): { type: string, isLoading: boolean } {
  return { type: LOADING_GEO_POINTS, isLoading };
}

function checkInClearAction(): { type: string } {
  return { type: CHECK_IN_CLEAR };
}