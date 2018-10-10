import IDispatchFunction from '../DTO/types/dispatchFunction';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { FILTER_INVITATIONS_LIST, CLOSE_FILTER_INVITATIONS} from '../DTO/constantsForReducer/filters';

export const filterInvitations = () => (dispatch: IDispatchFunction) => {
  dashboardFiltersMockService('filterInvitations')
    .then(() => {
      dispatch( filterInvitationsAction(true ));
    })
    .catch(( error: any) => {

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
