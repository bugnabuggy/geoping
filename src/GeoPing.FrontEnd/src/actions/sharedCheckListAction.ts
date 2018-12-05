import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IUserWithAccessDTO from '../DTO/userWitchAccessDTO';
import {
  CLEAR_AUTOCOMPLETE_LIST_USERS,
  CLEAR_SHARED_CHECK_LIST,
  GET_AUTOCOMPLETED_LIST_USERS,
  LOAD_USERS_LIST_WITCH_SHARED_ACCESS,
  LOADING_USERS_WHO_HAS_ACCESS,
  PROVIDE_PUBLIC_ACCESS,
  REMOVE_ACCESS_USER_FOR_LIST,
  SEND_SHARE_CHECK_LIST_FOR_USERS
} from '../constantsForReducer/sharedCheckList';
import { windowBlocking } from './windowAction';

export const loadUsersForShared = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( loadingUsersWhoHasAccess( true ) );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadUserWhoHasAccess( idList )
    .then( ( response: any ) => {
      dispatch( loadUsersForSharedAction( response ) );
      dispatch( loadingUsersWhoHasAccess( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' loadUsersForShared', EnumNotificationType.Danger )
      ) );
      dispatch( loadingUsersWhoHasAccess( false ) );
    } );
};

export const clearSharedCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearSharedCheckListAction() );
};

export const sendAccessUsersForCheckList = ( idCheckList: string, emails: Array<string> ) =>
  ( dispatch: IDispatchFunction ) => {
    windowBlocking( true )( dispatch );
    const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
    checkListService.sharedCheckListForUser( idCheckList, emails )
      .then( ( users: any ) => {
        dispatch( sendAccessUsersForCheckListAction( users ) );
        windowBlocking( false )( dispatch );
      } )
      .catch( ( error: any ) => {
        windowBlocking( false )( dispatch );
        dispatch( addNotificationAction(
          createNotification( error.message + ' sendAccessUsersForCheckList', EnumNotificationType.Danger )
        ) );
      } );
  };

export const providePublicAccess = ( idList: string, isPublic: boolean ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.providePublicAccess( idList, isPublic )
    .then( ( response: any ) => {
      dispatch( providePublicAccessAction( idList, isPublic ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' providePublicAccess', EnumNotificationType.Danger )
      ) );
    } );
};

export const getAutocompletedListUsers = ( userName: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAutocompletedListUsers( userName )
    .then( ( response: any ) => {
      dispatch( getAutocompletedListUsersAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' getAutocompletedListUsers', EnumNotificationType.Danger )
      ) );
    } );
};

export const clearAutocompleteListUsers = () => ( dispatch: IDispatchFunction ) => {
  dispatch( clearAutocompleteListUsersAction() );
};

export const removeAccessUserForList = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.removeAccessUserForList( sharingId )
    .then( ( response: any ) => {
      dispatch( removeAccessUserForListAction( sharingId ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification( error.message + ' removeAccessUserForList', EnumNotificationType.Danger )
      ) );
    } );
};

/* Actions */

function loadUsersForSharedAction( usersList: Array<IUserWithAccessDTO> ):
  { type: string, usersList: Array<IUserWithAccessDTO> } {
  return { type: LOAD_USERS_LIST_WITCH_SHARED_ACCESS, usersList };
}

function clearSharedCheckListAction(): { type: string } {
  return { type: CLEAR_SHARED_CHECK_LIST };
}

function sendAccessUsersForCheckListAction( users: any ): { type: string, users: any } {
  return { type: SEND_SHARE_CHECK_LIST_FOR_USERS, users };
}

function providePublicAccessAction( idList: string, isPublic: boolean ):
  { type: string, idList: string, isPublic: boolean } {
  return { type: PROVIDE_PUBLIC_ACCESS, idList, isPublic };
}

function loadingUsersWhoHasAccess( isLoading: boolean ): { type: string, isLoading: boolean } {
  return { type: LOADING_USERS_WHO_HAS_ACCESS, isLoading };
}

function getAutocompletedListUsersAction( users: Array<any> ) {
  return { type: GET_AUTOCOMPLETED_LIST_USERS, users };
}

function clearAutocompleteListUsersAction() {
  return { type: CLEAR_AUTOCOMPLETE_LIST_USERS };
}

function removeAccessUserForListAction( sharingId: string ) {
  return { type: REMOVE_ACCESS_USER_FOR_LIST, sharingId };
}
