import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../constantsForReducer/modal';
import {
  CLEAR_STATE_MY_CHECK_LIST,
  DELETE_MY_CHECK_LISTS,
  LOAD_MY_CHECK_LISTS
} from '../constantsForReducer/checkList';
import { myCheckList } from '../state/myCheckListState';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';

export default function myCheckListReducer( state: IMyCheckListsStateType = myCheckList, action: any ) {
  const reduceObject: any = {
    [ SHOW_MODAL_SHARE ]: showModalShare,
    [ CLOSE_MODAL_SHARE ]: closeModalShare,
    [ LOAD_MY_CHECK_LISTS ]: loadMyCheckLists,
    [ DELETE_MY_CHECK_LISTS ]: deleteMyCheckList,
    [ CLEAR_STATE_MY_CHECK_LIST ]: clearStateMyCheckList,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function showModalShare( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isShowModalShare: !!action.checkListId,
    idCheckListShow: action.checkListId,
  };
}

function closeModalShare( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    isShowModalShare: action.isShow,
    idCheckListShow: '',
  };
}

function loadMyCheckLists( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    checkLists: action.checklists,
  };
}

function deleteMyCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...state,
    checkLists: state.checkLists.filter( ( item: any ) => item.id !== action.checkListId )
  };
}

function clearStateMyCheckList( state: IMyCheckListsStateType, action: any ): IMyCheckListsStateType {
  return {
    ...myCheckList,
  };
}
