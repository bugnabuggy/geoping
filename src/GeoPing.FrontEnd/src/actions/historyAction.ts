import IDispatchFunction from '../DTO/types/dispatchFunction';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../DTO/constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltesMockService';

export const loadHistory = () => ( dispatch: IDispatchFunction ) => {
  return '';
};
export const filterHistory = () => (dispatch: IDispatchFunction ) => {
  dashboardFiltersMockService( 'filterHistory')
    .then(() => {
      dispatch( filterHistoryAction( true ) );
    })
    .catch(() => {

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
