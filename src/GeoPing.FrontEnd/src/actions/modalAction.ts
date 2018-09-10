import { SHOW_MODAL_SHARE, CLOSE_MODAL_SHARE } from '../DTO/constantsForReducer/modal';

export const showModalShare = () => (dispatch: Function) => {
  dispatch(showModalShareAction(true));
};

export const closeModalShare = () => (dispatch: Function) => {
  dispatch(closeModalShareAction(false));
};

/* Action */
function showModalShareAction(isShow: boolean): Object {
  return {type: SHOW_MODAL_SHARE, isShow };
}

function closeModalShareAction(isShow: boolean): Object {
  return {type: CLOSE_MODAL_SHARE, isShow };
}
