import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';
import { sharedCheckList } from '../state/sharedCheckListState';
import {
  CLEAR_AUTOCOMPLETE_LIST_USERS,
  CLEAR_SHARED_CHECK_LIST,
  GET_AUTOCOMPLETED_LIST_USERS,
  LOAD_USERS_LIST_WITCH_SHARED_ACCESS,
  LOADING_USERS_WHO_HAS_ACCESS, MESSAGE_FOR_ACTIVATE_TOKEN,
  REMOVE_ACCESS_USER_FOR_LIST,
  SEND_SHARE_CHECK_LIST_FOR_USERS
} from '../constantsForReducer/sharedCheckList';

export default function sharedCheckListReducer( state: ISharedCheckListStateType = sharedCheckList, action: any ) {
  const reduceObject: any = {
    [ LOAD_USERS_LIST_WITCH_SHARED_ACCESS ]: loadUsersWitchSharedAccess,
    [ CLEAR_SHARED_CHECK_LIST ]: clear,
    [ SEND_SHARE_CHECK_LIST_FOR_USERS ]: sendShare,
    [ LOADING_USERS_WHO_HAS_ACCESS ]: loadingUsers,
    [ GET_AUTOCOMPLETED_LIST_USERS ]: autocompletedListUsers,
    [ CLEAR_AUTOCOMPLETE_LIST_USERS ]: clearautocompleteListUser,
    [ REMOVE_ACCESS_USER_FOR_LIST ]: removeAccessUserForList,
    [MESSAGE_FOR_ACTIVATE_TOKEN]: messageForActivateToken,
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
    listUsersWitchAccess: [
      ...state.listUsersWitchAccess,
      ...action.users,
    ],
  };
}

function loadingUsers( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    isLoading: action.isLoading,
  };
}

function autocompletedListUsers( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    autocompleteUsers: action.users,
  };
}

function clearautocompleteListUser( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    autocompleteUsers: [],
  };
}

function removeAccessUserForList( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    listUsersWitchAccess: [
      ...state.listUsersWitchAccess.filter( item => item.sharingId !== action.sharingId )
    ]
  };
}

function messageForActivateToken( state: ISharedCheckListStateType, action: any ): ISharedCheckListStateType {
  return {
    ...state,
    messageForActivateToken: action.message,
  };
}
