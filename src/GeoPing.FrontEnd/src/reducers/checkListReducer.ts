import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { checkListState } from '../state/checkListState';
import {
  ACCEPT_LIST_SHARING_INVITE,
  ADD_GEO_POINT_FROM_MY_POSITION,
  CANCEL_ACCEPT_NEW_SHARING_LIST,
  CHANGE_NAME_CHECK_LIST,
  CLEAR_STATE_CHECK_LIST,
  CLOSE_MODAL_FOR_CREATE_CHECK_LIST,
  CREATE_CHECK_LIST,
  DELETE_LIST_SHARING,
  DELETE_MY_CHECK_LISTS,
  EDITING_PERMISSION_POINT,
  IS_CHECK_LIST_PAGE,
  LOAD_ALL_ACCEPTED_SHARED_LISTS,
  LOAD_ALL_NEW_SHARED_LISTS,
  LOAD_CHECK_LIST_DATA,
  LOAD_MARKERS_FOR_CHECK_LIST,
  LOAD_MY_CHECK_LISTS,
  MODAL_PERIOD_OPEN_CLOSE,
  OPEN_MODAL_FOR_CREATE_CHECK_LIST,
  SELECT_CHECK_LIST,
  UPDATE_CHECK_LIST
} from '../constantsForReducer/checkList';
import { CLOSE_FILTER_CHECKLIST, FILTER_CHECKLIST_LIST, } from '../constantsForReducer/filters';
import { CANCEL_GEO_POINT, SAVE_GEO_POINT, SELECT_GEO_POINT } from '../constantsForReducer/googleMap';
import { CLOSE_MODAL_SHARE } from '../constantsForReducer/modal';
import { PUBLIC_LIST_LOAD_INFO, PUBLIC_LIST_LOAD_LISTS } from '../constantsForReducer/publicCheckList';
import { GET_GEO_LIST_MY_AND_HAS_ACCESS } from '../constantsForReducer/checkin';

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
    [ LOAD_MARKERS_FOR_CHECK_LIST ]: loadMarkersForReducer,
    [ SELECT_CHECK_LIST ]: selectCheckList,

    [ LOAD_MY_CHECK_LISTS ]: loadCheckLists,
    [ DELETE_MY_CHECK_LISTS ]: deleteCheckList,
    [ UPDATE_CHECK_LIST ]: updateCheckList,
    [ CLOSE_MODAL_SHARE ]: clearSelectedGeoList,
    [ PUBLIC_LIST_LOAD_LISTS ]: loadPublicCheckLists,
    [ IS_CHECK_LIST_PAGE ]: checkListFlag,

    [ LOAD_ALL_NEW_SHARED_LISTS ]: loadAllNewSharedLists,
    [ LOAD_ALL_ACCEPTED_SHARED_LISTS ]: loadAllAcceptedSharedLists,
    [ DELETE_LIST_SHARING ]: deleteListSharing,
    [ CANCEL_ACCEPT_NEW_SHARING_LIST ]: cancelAcceptNewSharingList,
    [ ACCEPT_LIST_SHARING_INVITE ]: acceptListSharingInvite,
    [ GET_GEO_LIST_MY_AND_HAS_ACCESS ]: checkListForCheckIn,
    [ PUBLIC_LIST_LOAD_INFO ]: loadPublicListInfo,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function createCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    selectedGeoList: {
      ...state.selectedGeoList,
      id: action.checklist.id,
      name: action.checklist.name,
    },
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
    selectedGeoList: {
      ...action.checkList
    },
  };
}

function clearStateCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...checkListState,
  };
}

function loadMarkersForReducer( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isGeoPointLoading: action.isLoading,
  };
}

function selectCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    selectedGeoList: {
      ...action.checkList,
    },
  };
}

function loadCheckLists( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    checkLists: action.checklists,
  };
}

function deleteCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    checkLists: state.checkLists.filter( ( item: any ) => item.id !== action.checkListId )
  };
}

function updateCheckList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    selectedGeoList: {
      ...state.selectedGeoList,
      ...action.checkList,
    },
    checkLists: [
      ...state.checkLists.map( item => {
        if ( item.id === action.checkList.id ) {
          return {
            ...item,
            ...action.checkList,
          };
        } else {
          return item;
        }
      } ),
    ]
  };
}

function clearSelectedGeoList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    selectedGeoList: checkListState.selectedGeoList,
  };
}

function loadPublicCheckLists( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    checkListPublic: action.lists,
  };
}

function checkListFlag( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    isCheckList: action.isCheckList,
  };
}

function loadAllNewSharedLists( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    newSharedLists: action.sharedLists,
  };
}

function loadAllAcceptedSharedLists( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    acceptedSharedLists: action.sharedLists,
  };
}

function deleteListSharing( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    acceptedSharedLists: [
      ...state.acceptedSharedLists.filter( item => item.shareId !== action.sharingId )
    ],
  };
}

function cancelAcceptNewSharingList( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    newSharedLists: [
      ...state.newSharedLists.filter( item => item.shareId !== action.sharingId )
    ],
    acceptedSharedLists: [
      ...state.acceptedSharedLists.filter( item => item.shareId !== action.sharingId )
    ],
  };
}

function acceptListSharingInvite( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    acceptedSharedLists: [
      ...state.acceptedSharedLists,
      state.newSharedLists.find( item => item.shareId === action.sharingId )
    ],
    newSharedLists: [
      ...state.newSharedLists.filter( item => item.shareId !== action.sharingId )
    ],
  };
}

function checkListForCheckIn( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    checkInLists: action.checkInLists,
  };
}

function loadPublicListInfo( state: ICheckListStateType, action: any ): ICheckListStateType {
  return {
    ...state,
    checkListPublicInfo: {
      ...action.listInfo,
    },
  };
}
