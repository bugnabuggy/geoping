import IDispatchFunction from '../DTO/types/dispatchFunction';
import { ITableHistoryStateType } from '../DTO/types/stateTypes/tableHistoryStateType';
import StaticStorage from '../services/staticStorage';
import ITableHistoryService from '../DTO/tableHistoryServiceType';

export const loadHistory = () => ( dispatch: IDispatchFunction ) => {

  const tableHistoryService: ITableHistoryService = StaticStorage.serviceLocator.get( 'ITableHistoryService' );
  tableHistoryService.getHistory()
    .then( ( response: any ) => {
      dispatch( loadHistoryAction( response ) );
    } );
};

/* Actions */

function loadHistoryAction( history: ITableHistoryStateType ): Object {
  return { type: 'HISTORY', history };
}