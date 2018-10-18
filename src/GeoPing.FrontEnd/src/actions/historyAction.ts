import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import StaticStorage from '../services/staticStorage';
import ITableHistoryService from '../types/serviceTypes/tableHistoryServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IHistoryDataDTO from '../DTO/historyDataDTO';
import { LOAD_LIST_HISTORY, SAVE_RECORD_HISTORY } from '../constantsForReducer/historyTable';

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
export const saveHistory = (idUser: string, historyData: IHistoryDataDTO) => ( dispatch: IDispatchFunction ) => {
  const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  tableHistoryService.addRecordForHistory( idUser, historyData )
    .then( (response: any) => {
      dispatch(saveHistoryAction(historyData));
    })
    .catch((error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });
};

/* Actions */

function filterHistoryAction(isShow: boolean): Object {
  return {type: FILTER_HISTORY_TABLE, isShow };
}
function closeFilterHistoryAction(isShow: boolean): Object {
  return {type: CLOSE_FILTER_HISTORY, isShow };
}
function loadHistoryAction( history: ITableHistoryStateType ): Object {
  return { type: LOAD_LIST_HISTORY, history };
}
function saveHistoryAction(historyData: IHistoryDataDTO): {type: string, historyData: IHistoryDataDTO} {
  return { type: SAVE_RECORD_HISTORY, historyData};
}