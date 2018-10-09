import IDispatchFunction from '../DTO/types/dispatchFunction';
import { CHECK_IN_FLAG_CHANGE, CHECK_IN_LOAD_LISTS, CHECK_IN_SELECT_LIST } from '../DTO/constantsForReducer/checkin';
import { addPointsAction } from './googleMapAction';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import serviceLocator from '../services/serviceLocator';

export const selectList = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( selectedListAction( idList ) );
};

export const checkin = () => ( dispatch: IDispatchFunction ) => {
  return '';
};

/* load */
export const loadLists = ( idUser: string ) => ( dispatch: IDispatchFunction ) => {
  serviceLocator.post( 'load_lists', idUser )
    .then( ( response: any ) => {
      dispatch( loadListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const loadPoints = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  serviceLocator.post( 'load_points', idList )
    .then( ( response: any ) => {
      dispatch( addPointsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const checkinFlag = ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( checkinFlagAction( isCheckin ) );
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
