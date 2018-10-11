import { CLOSE_MODAL_SHARE, SHOW_MODAL_SHARE } from '../constantsForReducer/modal';
import { DELETE_MY_CHECK_LISTS, LOAD_MY_CHECK_LISTS } from '../constantsForReducer/checkList';
import { myCheckList } from '../state/myCheckListState';

export default function myCheckListReducer( state: any = myCheckList, action: any ) {
  const reduceObject: any = {
    [ SHOW_MODAL_SHARE ]: showModalShare,
    [ CLOSE_MODAL_SHARE ]: closeModalShare,
    [ LOAD_MY_CHECK_LISTS ]: loadMyCheckLists,
    [ DELETE_MY_CHECK_LISTS ]: deleteMyCheckList,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function showModalShare( state: any, action: any ) {
  return {
    ...state,
    isShowModalShare: !!action.checkListId,
    idCheckListShow: action.checkListId,
  };
}

function closeModalShare( state: any, action: any ) {
  return {
    ...state,
    isShowModalShare: action.isShow,
    idCheckListShow: '',
  };
}

function loadMyCheckLists( state: any, action: any ) {
  return {
    ...state,
    checkLists: action.checklists,
  };
}

function deleteMyCheckList( state: any, action: any ) {
  return {
    ...state,
    checkLists: state.checkLists.filter( ( item: any ) => item.id !== action.checkListId )
  };
}