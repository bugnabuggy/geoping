import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';
import { sharedCheckList } from '../state/sharedCheckListState';
import {
  CLEAR_SHARED_CHECK_LIST,
  LOAD_USERS_LIST_WITCH_SHARED_ACCESS,
  SEND_SHARE_CHECK_LIST_FOR_USERS
} from '../constantsForReducer/sharedCheckList';

export default function sharedCheckListReducer( state: ISharedCheckListStateType = sharedCheckList, action: any ) {
  const reduceObject: any = {
    [LOAD_USERS_LIST_WITCH_SHARED_ACCESS]: loadUsersWitchSharedAccess,
    [CLEAR_SHARED_CHECK_LIST]: clear,
    [SEND_SHARE_CHECK_LIST_FOR_USERS]: sendShare,
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function loadUsersWitchSharedAccess( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    listUsersWitchAccess: action.usersList,
  };
}

function clear( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...sharedCheckList,
  };
}

function sendShare( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    listUsersWitchAccess: action.users,
  };
}
