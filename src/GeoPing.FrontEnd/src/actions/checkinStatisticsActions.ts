/* Select */
import IDispatchFunction from '../DTO/types/dispatchFunction';
import {
  STATISTICS_LOAD_LISTS,
  STATISTICS_LOAD_POINTS,
  STATISTICS_LOAD_USERS
} from '../DTO/constantsForReducer/checkinStatistics';
import {
  loadListsService,
  loadPointsService,
  loadUsersService
} from '../services/mockServices/checkinStatisticsMockService';
import { createNotification } from '../services/helper';
import { addNotificationAction } from './notificationsAction';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const selectList = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const selectUser = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const selectPeriod = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* may be*/
export const loadTableData = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* Load */
export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  loadListsService()
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );

};

export const loadUsers = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  loadUsersService( idList )
    .then( ( response: any ) => {
      dispatch( loadUsersAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const loadPoints = ( idList: string, idUser: string ) => ( dispatch: IDispatchFunction ) => {
  loadPointsService( idList, idUser )
    .then( ( response: any ) => {
      dispatch( loadPointsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

/* Actions*/

function loadListsAction( lists: any ): Object {
  return { type: STATISTICS_LOAD_LISTS, lists };
}

function loadUsersAction( users: any ): Object {
  return { type: STATISTICS_LOAD_USERS, users };
}

function loadPointsAction( points: any ): Object {
  return { type: STATISTICS_LOAD_POINTS, points };
}