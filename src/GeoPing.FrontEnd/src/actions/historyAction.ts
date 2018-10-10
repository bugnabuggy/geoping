import IDispatchFunction from '../DTO/types/dispatchFunction';
import { FILTER_HISTORY_TABLE, CLOSE_FILTER_HISTORY } from '../DTO/constantsForReducer/filters';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';

import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const loadHistory = () => ( dispatch: IDispatchFunction ) => {
  return '';
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
