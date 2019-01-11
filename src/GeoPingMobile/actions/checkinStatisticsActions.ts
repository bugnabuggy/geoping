import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  LOAD_CHECK_LISTS_STATISTICS,
  STATISTICS_CLEAR,
  STATISTICS_LOAD_POINTS,
  STATISTICS_LOAD_USERS
} from '../constantsForReducer/checkinStatistics';
import { createNotification } from '../services/helper';
import { addNotificationAction } from './notificationsAction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import IUser from '../types/serviceTypes/userServiceType';
import IMarkerServiceType from '../types/serviceTypes/markerServiceType';

export const selectList = ( listId: string ) => ( dispatch: IDispatchFunction ) => {

};

/* Load */
export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get ( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists ()
    .then ( ( response: any ) => {
      dispatch ( loadListsAction ( response ) );
    } )
    .catch ( ( error: any ) => {
      dispatch ( addNotificationAction ( createNotification ( error.message, EnumNotificationType.Danger ) ) );
    } );

};

export const loadUsers = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const userService: IUser = StaticStorage.serviceLocator.get ( 'IUser' );
  userService.loadUserForStatistic ( idList )
    .then ( ( response: any ) => {
      dispatch ( loadUsersAction ( response ) );
    } )
    .catch ( ( error: any ) => {
      dispatch ( addNotificationAction ( createNotification ( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const loadPoints = ( listId: string, userId: string, dateFrom: string, dateTo: string ) =>
  ( dispatch: IDispatchFunction ) => {
    // dispatch( windowBlockingAction( true ) );
    const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get ( 'IMarkerServiceType' );
    markerService.getChecksStatisticsForList ( listId, userId, dateFrom, dateTo )
      .then ( ( response: any ) => {
        // dispatch( windowBlockingAction( false ) );
        dispatch ( loadPointsAction ( response ) );
        // console.log ( 'response', response );
      } )
      .catch ( ( error: any ) => {
        // dispatch( windowBlockingAction( false ) );
        dispatch ( addNotificationAction ( createNotification ( error.message, EnumNotificationType.Danger ) ) );
      } );
  };

export const getFreeCheck = ( dateFrom: string, dateTo: string ) => ( dispatch: IDispatchFunction ) => {
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get ( 'IMarkerServiceType' );
  markerService.getStatisticsFreeCheck (  dateFrom, dateTo )
    .then( ( resp: any ) => {
      dispatch ( loadPointsAction ( resp ) );
      // console.log ( 'resp', resp );
    })
    .catch ( ( error: any ) => {
      // dispatch( windowBlockingAction( false ) );
      dispatch ( addNotificationAction ( createNotification ( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const checkInStatisticsClear = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( checkInStatisticsClearAction () );
};

export const getAllCheckForList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get ( 'ICheckListServiceType' );
  checkListService.getAllCheckForList ( idList )
    .then ( ( response: any ) => {
      console.info ( response );
    } )
    .catch ( ( error: any ) => {
      dispatch ( addNotificationAction ( createNotification ( error.message, EnumNotificationType.Danger ) ) );
    } );
};

/* Actions*/

function loadListsAction( checklists: any ): Object {
  return { type: LOAD_CHECK_LISTS_STATISTICS, checklists };
}

function loadUsersAction( users: any ): Object {
  return { type: STATISTICS_LOAD_USERS, users };
}

function loadPointsAction( points: any ): Object {
  return { type: STATISTICS_LOAD_POINTS, points };
}

function checkInStatisticsClearAction(): { type: string } {
  return { type: STATISTICS_CLEAR };
}
