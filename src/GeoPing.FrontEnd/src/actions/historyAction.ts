import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { ITableHistoryStateType } from '../types/stateTypes/tableHistoryStateType';
import { FILTER_HISTORY_TABLE } from '../constantsForReducer/filters';
import StaticStorage from '../services/staticStorage';
import ITableHistoryService from '../types/serviceTypes/tableHistoryServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IHistoryDataDTO from '../DTO/historyDataDTO';
import {
  CLEAR_TABLE_HISTORY,
  LOAD_LIST_HISTORY,
  SAVE_RECORD_HISTORY,
  TABLE_HISTORY_LOADING
} from '../constantsForReducer/historyTable';

export const loadHistory = ( filter?: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingAction( true ) );
  const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  tableHistoryService.getHistory( filter )
    .then( ( response: any ) => {
      dispatch( loadHistoryAction( response ) );
      dispatch( loadingAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadHistory', EnumNotificationType.Danger )
      ) );
      dispatch( loadingAction( false ) );
    } );
};
export const filterHistory = ( filter: any ) => ( dispatch: IDispatchFunction ) => {
  // const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  // tableHistoryService
  // dashboardFiltersMockService( 'filterHistory' )
  //   .then( () => {
  //     dispatch( filterHistoryAction( true ) );
  //   } )
  //   .catch( ( error: any ) => {
  //     dispatch( addNotificationAction(
  //       createNotification( error.message + ' filterHistory', EnumNotificationType.Danger )
  //     ) );
  //   } );
};

export const saveHistory = ( idUser: string, historyData: IHistoryDataDTO ) => ( dispatch: IDispatchFunction ) => {
  const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  tableHistoryService.addRecordForHistory( idUser, historyData )
    .then( ( response: any ) => {
      dispatch( saveHistoryAction( historyData ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' saveHistory', EnumNotificationType.Danger )
      ) );
    } );
};

export const clearTableHistory = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearTableHistoryAction() );
};

/* Actions */

function filterHistoryAction( isShow: boolean ): Object {
  return { type: FILTER_HISTORY_TABLE, isShow };
}

function loadHistoryAction( history: ITableHistoryStateType ): Object {
  return { type: LOAD_LIST_HISTORY, history };
}

function saveHistoryAction( historyData: IHistoryDataDTO ): { type: string, historyData: IHistoryDataDTO } {
  return { type: SAVE_RECORD_HISTORY, historyData };
}

function loadingAction( isLoading: boolean ): { type: string, isLoading: boolean } {
  return { type: TABLE_HISTORY_LOADING, isLoading };
}

function clearTableHistoryAction(): { type: string } {
  return { type: CLEAR_TABLE_HISTORY };
}