import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  CHECK_IN_CLEAR,
  CHECK_IN_FLAG_CHANGE,
  CHECK_IN_GEO_POINTS,
  CHECK_IN_LOAD_LISTS,
  CHECK_IN_SELECT_LIST,
  LOADING_CHECK_LISTS,
  LOADING_GEO_POINTS,
  SET_TIMER_COUNT,
  START_TIMER
} from '../constantsForReducer/checkin';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import StaticStorage from '../services/staticStorage';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';
import { addListPointsAction } from './googleMapAction';
import { ICheckInDTO } from '../DTO/checkInDTO';
import { ETimer } from '../enums/timerEnum';

export const setTimer = ( isStartTimer: ETimer ) => ( dispatch: IDispatchFunction ) => {
  dispatch( setTimerAction( isStartTimer ) );
};

export const checkIn = ( idPoint: string, data: ICheckInDTO ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.addCheckIn( idPoint, data )
    .then( ( response: any ) => {
      const geoPoint: Array<any> = [ response ];
      dispatch( getAllChecksForUserAndListAction( geoPoint ) );
      dispatch( addNotificationAction( createNotification( 'Point marked', EnumNotificationType.Success ) ) );
      setTimer( ETimer.Start )( dispatch );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' checkIn', EnumNotificationType.Danger )
      ) );
      setTimer( ETimer.Start )( dispatch );
    } );
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
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadLists', EnumNotificationType.Danger )
      ) );
      dispatch( loadingCheckLists( false ) );
    } );
};

export const loadPoints = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingGeoPoints( true ) );
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllChecksForUserAndList( idList )
    .then( ( checkInGeoPoint: Array<any> ) => {
      dispatch( getAllChecksForUserAndListAction( checkInGeoPoint || [] ) );
      return markerService.getAllMarkersForCheckList( idList );
    } )
    .then( ( response: any ) => {
      dispatch( addListPointsAction( response ) );
      dispatch( loadingGeoPoints( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadPoints', EnumNotificationType.Danger )
      ) );
      dispatch( loadingGeoPoints( false ) );
    } );
};

export const checkinFlag = ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( checkinFlagAction( isCheckin ) );
};

export const checkInClear = () => ( dispatch: IDispatchFunction ) => {
  dispatch( checkInClearAction() );
};

export const messagesForUser = ( message: string, type: EnumNotificationType ) => ( dispatch: IDispatchFunction ) => {
  dispatch( addNotificationAction( createNotification( message, type ) ) );
};

export const getAllChecksForUserAndList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllChecksForUserAndList( idList )
    .then( ( checkInGeoPoint: Array<any> ) => {
      dispatch( getAllChecksForUserAndListAction( checkInGeoPoint ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' getAllChecksForUserAndList', EnumNotificationType.Danger )
      ) );
    } );
};

export const selectList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectedListAction( idList ) );
  // getAllChecksForUserAndList( idList )( dispatch );
};

export const timerAccount = ( countTimer: number ) => ( dispatch: IDispatchFunction ) => {
  dispatch( timerAccountAction( countTimer ) );
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

function getAllChecksForUserAndListAction( checkInGeoPoint: Array<any> ):
  { type: string, checkInGeoPoint: Array<any> } {
  return { type: CHECK_IN_GEO_POINTS, checkInGeoPoint };
}

function setTimerAction( isStartTimer: ETimer ) {
  return { type: START_TIMER, isStartTimer };
}

function timerAccountAction( countTimer: number ) {
  return { type: SET_TIMER_COUNT, countTimer };
}
