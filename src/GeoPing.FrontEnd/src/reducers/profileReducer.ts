import { profileState } from '../state/profileState';
import IProfileStateType from '../types/stateTypes/profileStateType';
import { LOAD_INFO, UPGRADE_ACCOUNT, SHOW_MODAL_WINDOW, CLOSE_MODAL_WINDOW } from '../constantsForReducer/profile';

export default function profileReducer(state: IProfileStateType = profileState, action: any) {
  const reduceObject: any = {
    [LOAD_INFO]: loadProfileData,
    [SHOW_MODAL_WINDOW]: showModalChangePassword,
    [CLOSE_MODAL_WINDOW]: closeModalChangePassword
  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}

function loadProfileData(state: IProfileStateType, action: any) {
  return {
    ...state,
    ...action.profile,
    isLoaded: true
  };
}
function showModalChangePassword ( state: IProfileStateType, action: any ) {
  const newState: IProfileStateType = Object.assign ( {}, state, { isShowModal: action.isShow } );
  return newState;
}
function closeModalChangePassword ( state: IProfileStateType, action: any ) {
  const newState: IProfileStateType = Object.assign({}, state, {isShowModal: action.isShow});
  return newState;
}