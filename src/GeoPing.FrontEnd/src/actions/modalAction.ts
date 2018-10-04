import { SHOW_MODAL_SHARE, CLOSE_MODAL_SHARE } from '../constantsForReducer/modal';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export const showModalShare = () => (dispatch: IDispatchFunction) => {
  dispatch(showModalShareAction(true));
};

export const closeModalShare = () => (dispatch: IDispatchFunction) => {
  dispatch(closeModalShareAction(false));
};

/* Action */
function showModalShareAction(isShow: boolean): Object {
  return {type: SHOW_MODAL_SHARE, isShow };
}

function closeModalShareAction(isShow: boolean): Object {
  return {type: CLOSE_MODAL_SHARE, isShow };
}
