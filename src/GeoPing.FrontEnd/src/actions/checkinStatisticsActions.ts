import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  STATISTICS_LOAD_LISTS,
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

export const selectList = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* Load */
export const loadLists = () => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadAllMyCheckLists( '' )
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );

};

export const loadUsers = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.loadUsersForSharedList( idList )
    .then( ( response: any ) => {
      dispatch( loadUsersAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const loadPoints = ( idList: string, idUser: string ) => ( dispatch: IDispatchFunction ) => {
  const markerService: IMarkerServiceType = StaticStorage.serviceLocator.get( 'IMarkerServiceType' );
  markerService.getMarkersForListAndUser( idList, idUser )
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