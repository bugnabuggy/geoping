import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { checkListState } from '../state/checkListState';
import {
  CHANGE_NAME_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  EDITING_PERMISSION_POINT,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST
} from '../constantsForReducer/checkList';
import { FILTER_CHECKLIST_LIST, CLOSE_FILTER_CHECKLIST } from '../constantsForReducer/filters';

export default function checkListReducer( state: ICheckListStateType = checkListState, action: any ) {
  const reduceObject: any = {
    [ OPEN_MODAL_FOR_CREATE_CHECK_LIST ]: openModalForCreateCheckList,
    [ CLOSE_MODAL_FOR_CREATE_CHECK_LIST ]: closeModalForCreateCheckList,
    [ CREATE_CHECK_LIST ]: createCheckList,
    [ EDITING_PERMISSION_POINT ]: editingPermissionPoint,
    [ CHANGE_NAME_CHECK_LIST ]: changeNameChecklist,
    [ MODAL_PERIOD_OPEN_CLOSE ]: modalPeriodOpenClose,
    [ FILTER_CHECKLIST_LIST ]: filterCheckLists,
    [ CLOSE_FILTER_CHECKLIST ]: closeFilterCheckLists

  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function createCheckList( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    idChecklist: action.checklist.id,
    nameChecklist: action.checklist.name
  };
}

function openModalForCreateCheckList( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    isShowModal: action.isShow,
  };
}

function closeModalForCreateCheckList( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    isShowModal: action.isClose,
  };
}

function editingPermissionPoint( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    isEditing: action.isEditing,
  };
}

function changeNameChecklist( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    nameChecklist: action.nameChecklist,
  };
}

function modalPeriodOpenClose( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    isShowModal: action.isState,
  };
}
function filterCheckLists( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { showFilterCheckList: action.isShow } );
  return newState;
}
function closeFilterCheckLists( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { showFilterCheckList: action.isShow } );
  return newState;
}