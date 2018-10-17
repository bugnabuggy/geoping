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
import {
  ADD_GEO_POINT_FROM_MY_POSITION,
  CLEAR_STATE_CHECK_LIST,
  CLOSE_FILTER_CHECKLIST,
  FILTER_CHECKLIST_LIST,
  LOAD_CHECK_LIST_DATA
} from '../constantsForReducer/filters';
import { CANCEL_GEO_POINT, SAVE_GEO_POINT, SELECT_GEO_POINT } from '../constantsForReducer/googleMap';

export default function checkListReducer( state: ICheckListStateType = checkListState, action: any ) {
  const reduceObject: any = {
    [ OPEN_MODAL_FOR_CREATE_CHECK_LIST ]: openModalForCreateCheckList,
    [ CLOSE_MODAL_FOR_CREATE_CHECK_LIST ]: closeModalForCreateCheckList,
    [ CREATE_CHECK_LIST ]: createCheckList,
    [ EDITING_PERMISSION_POINT ]: editingPermissionPoint,
    [ CHANGE_NAME_CHECK_LIST ]: changeNameChecklist,
    [ MODAL_PERIOD_OPEN_CLOSE ]: modalPeriodOpenClose,
    [ FILTER_CHECKLIST_LIST ]: filterCheckLists,
    [ CLOSE_FILTER_CHECKLIST ]: closeFilterCheckLists,

    [ SAVE_GEO_POINT ]: saveGeoPoint,
    [ SELECT_GEO_POINT ]: selectGeoPoint,
    [ CANCEL_GEO_POINT ]: cancelGeoPoint,
    [ ADD_GEO_POINT_FROM_MY_POSITION ]: addGeoPointFromMyPosition,
    [ LOAD_CHECK_LIST_DATA ]: loadCheckListData,
    [ CLEAR_STATE_CHECK_LIST ]: clearStateCheckList,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function createCheckList( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    id: action.checklist.id,
    name: action.checklist.name
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
    name: action.nameChecklist,
  };
}

function modalPeriodOpenClose( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    isShowModal: action.isState,
  };
}

function filterCheckLists( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    showFilterCheckList: action.isShow
  };
}

function closeFilterCheckLists( state: ICheckListStateType, action: any ) {
  return {
    ...state,
    showFilterCheckList: action.isShow
  };
}

function saveGeoPoint( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isEditing: false,
  };
}

function selectGeoPoint( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isEditing: !!action.geoPoint.id,
  };
}

function cancelGeoPoint( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isEditing: false,
  };
}

function addGeoPointFromMyPosition( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isMyGeoPosition: action.isMyGeoPosition,
    isEditing: true,
  };
}

function loadCheckListData( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    ...action.checkList,
  };
}

function clearStateCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...checkListState,
  };
}