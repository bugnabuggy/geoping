import IDispatchFunction from '../DTO/types/dispatchFunction';
import serviceLocator from '../services/serviceLocator';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import { ITableHistoryStateType } from '../DTO/types/stateTypes/tableHistoryStateType';

export const loadHistory = () => ( dispatch: IDispatchFunction ) => {
  serviceLocator.get( 'load_history' )
    .then( ( response: any ) => {
      dispatch( loadHistoryAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

/* Actions */

function loadHistoryAction( history: ITableHistoryStateType ): Object {
  return { type: 'HISTORY', history };
}