import ICheckListStateType from '../DTO/types/stateTypes/checkListStateType';
import { checkListState } from '../state/checkListState';
import {
  CHANGE_NAME_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  EDITING_PERMISSION_POINT,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST
} from '../DTO/constantsForReducer/checkList';

export default function checkListReducer( state: ICheckListStateType = checkListState, action: any ) {
  const reduceObject: any = {
    [ OPEN_MODAL_FOR_CREATE_CHECK_LIST ]: openModalForCreateCheckList,
    [ CLOSE_MODAL_FOR_CREATE_CHECK_LIST ]: closeModalForCreateCheckList,
    [ CREATE_CHECK_LIST ]: createCheckList,
    [ EDITING_PERMISSION_POINT ]: editingPermissionPoint,
    [ CHANGE_NAME_CHECK_LIST ]: changeNameChecklist,
    [ MODAL_PERIOD_OPEN_CLOSE ]: modalPeriodOpenClose,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function createCheckList( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { idChecklist: action.checklist.idCheckList } );
  return newState;
}

function openModalForCreateCheckList( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { isShowModal: action.isShow } );
  return newState;
}

function closeModalForCreateCheckList( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { isShowModal: action.isClose } );
  return newState;
}

function editingPermissionPoint( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign ( {}, state, { isEditing: action.isEditing } );
  return newState;
}

function changeNameChecklist( state: ICheckListStateType, action: any ) {
  const newState: ICheckListStateType = Object.assign( {}, state, { nameChecklist: action.nameChecklist } );
  return newState;
}

function modalPeriodOpenClose( state: ICheckListStateType, action: any ) {
  return Object.assign( {}, state, { isShowModal: action.isState } );
}