import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  CLEAR_STATISTIC,
  STATISTICS_CLEAR,
  STATISTICS_LOAD_FREE_CHECKS,
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
import { LOAD_MY_CHECK_LISTS } from '../constantsForReducer/checkList';
import { windowBlockingAction } from './windowAction';

/* Load */
export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists()
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadLists', EnumNotificationType.Danger )
      ) );
    } );

};

export const loadUsers = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.loadUserForStatistic( idList )
    .then( ( response: any ) => {
      dispatch( loadUsersAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadUsers', EnumNotificationType.Danger )
      ) );
    } );
};

export const loadPoints = ( listId: string, data: any ) =>
  ( dispatch: IDispatchFunction ) => {
    dispatch( windowBlockingAction( true ) );
    const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
    markerService.getChecksStatisticsForList( listId, data )
      .then( ( response: any ) => {
        dispatch( windowBlockingAction( false ) );
        dispatch( loadPointsAction( response ) );
      } )
      .catch( ( error: any ) => {
        dispatch( windowBlockingAction( false ) );
        dispatch( addNotificationAction(
          createNotification( error.message + ' loadPoints', EnumNotificationType.Danger )
        ) );
      } );
  };

export const checkInStatisticsClear = () => ( dispatch: IDispatchFunction ) => {
  dispatch( checkInStatisticsClearAction() );
};

export const getAllCheckForList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllCheckForList( idList )
    .then( ( response: any ) => {
      console.info( response );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' getAllCheckForList', EnumNotificationType.Danger )
      ) );
    } );
};

export const getFreeChecksInStatisticsByFilter = ( dateFrom: string, dateTo: string ) =>
  ( dispatch: IDispatchFunction ) => {
    const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
    checkListService.getFreeChecksInStatisticsByFilter( dateFrom, dateTo )
      .then( ( points: any ) => {
        // console.log( 'response', response );
        dispatch( loadFreeChecksAction( points ) );
      } )
      .catch( ( error: any ) => {
        dispatch( addNotificationAction(
          createNotification( error.message + ' getFreeChecksInStatisticsByFilter', EnumNotificationType.Danger )
        ) );
      } );
  };

export const clearStatistic = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearStatisticAction() );
};

/* Actions*/

function loadListsAction( checklists: any ): Object {
  return { type: LOAD_MY_CHECK_LISTS, checklists };
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

function loadFreeChecksAction( points: any ) {
  return { type: STATISTICS_LOAD_FREE_CHECKS, points };
}

function clearStatisticAction() {
  return { type: CLEAR_STATISTIC };
}
