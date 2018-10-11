import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { FILTER_INVITATIONS_LIST, CLOSE_FILTER_INVITATIONS } from '../DTO/constantsForReducer/filters';

import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export const filterInvitations = () => (dispatch: IDispatchFunction) => {
  dashboardFiltersMockService('filterInvitations')
    .then(() => {
      dispatch( filterInvitationsAction(true ));
    })
    .catch(( error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });
};
export const closeFilterInvitations = () => (dispatch: IDispatchFunction) => {
  dispatch(closeFilterInvitationsAction (false));
};

function filterInvitationsAction(isShow: boolean) {
  return {type: FILTER_INVITATIONS_LIST, isShow};
}
function closeFilterInvitationsAction(isShow: boolean) {
  return {type: CLOSE_FILTER_INVITATIONS, isShow};
}
