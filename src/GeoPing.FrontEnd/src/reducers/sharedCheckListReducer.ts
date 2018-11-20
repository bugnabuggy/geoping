import ISharedCheckListStateType from '../../GeoPing.FrontEnd/src/types/stateTypes/sharedCheckListStateType';
import { sharedCheckList } from '../../GeoPing.FrontEnd/src/state/sharedCheckListState';
import {
  CLEAR_SHARED_CHECK_LIST,
  LOAD_USERS_LIST_WITCH_SHARED_ACCESS,
  LOADING_USERS_WHO_HAS_ACCESS,
  SEND_SHARE_CHECK_LIST_FOR_USERS
} from '../../GeoPing.FrontEnd/src/constantsForReducer/sharedCheckList';

export default function sharedCheckListReducer( state: ISharedCheckListStateType = sharedCheckList, action: any ) {
  const reduceObject: any = {
    [ LOAD_USERS_LIST_WITCH_SHARED_ACCESS ]: loadUsersWitchSharedAccess,
    [ CLEAR_SHARED_CHECK_LIST ]: clear,
    [ SEND_SHARE_CHECK_LIST_FOR_USERS ]: sendShare,
    [ LOADING_USERS_WHO_HAS_ACCESS ]: loadingUsers,
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

function loadingUsers( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    isLoading: action.isLoading,
  };
}
