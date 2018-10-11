import IDispatchFunction from '../DTO/types/dispatchFunction';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../DTO/constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { ITableHistoryStateType } from '../DTO/types/stateTypes/tableHistoryStateType';
import StaticStorage from '../services/staticStorage';
import ITableHistoryService from '../DTO/tableHistoryServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const loadHistory = () => ( dispatch: IDispatchFunction ) => {

  const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  tableHistoryService.getHistory()
    .then( ( response: any ) => {
      dispatch( loadHistoryAction( response ) );
    } );
};
export const filterHistory = () => (dispatch: IDispatchFunction ) => {
  dashboardFiltersMockService( 'filterHistory')
    .then(() => {
      dispatch( filterHistoryAction( true ) );
    })
    .catch((error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });

};
export const closeFilterHistory = () => (dispatch: IDispatchFunction ) => {
  dispatch( closeFilterHistoryAction( false ) );
};

function filterHistoryAction(isShow: boolean): Object {
  return {type: FILTER_HISTORY_TABLE, isShow };
}
function closeFilterHistoryAction(isShow: boolean): Object {
  return {type: CLOSE_FILTER_HISTORY, isShow };
}
function loadHistoryAction( history: ITableHistoryStateType ): Object {
  return { type: 'HISTORY', history };
}