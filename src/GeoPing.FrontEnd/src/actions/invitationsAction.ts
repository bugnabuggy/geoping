import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { dashboardFiltersMockService } from '../services/mockServices/dashboardFiltersMockService';
import { CLOSE_FILTER_INVITATIONS, FILTER_INVITATIONS_LIST } from '../constantsForReducer/filters';

import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { IGeoListSharingDTO } from '../DTO/geoListDTO';
import {
  ACCEPT_LIST_SHARING_INVITE,
  ACCEPT_SHARING_LISTS_LOADING,
  CANCEL_ACCEPT_NEW_SHARING_LIST,
  DELETE_LIST_SHARING,
  LOAD_ALL_ACCEPTED_SHARED_LISTS,
  LOAD_ALL_NEW_SHARED_LISTS,
  NEW_SHARING_LISTS_LOADING
} from '../constantsForReducer/checkList';
import { windowBlocking } from './windowAction';

export const filterInvitations = () => ( dispatch: IDispatchFunction ) => {
  dashboardFiltersMockService( 'filterInvitations' )
    .then( () => {
      dispatch( filterInvitationsAction( true ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};
export const closeFilterInvitations = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeFilterInvitationsAction( false ) );
};

export const loadAllNewSharedList = () => ( dispatch: IDispatchFunction ) => {
  dispatch( newSharingListsLoadingAction( true ) );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllNewSharedLists()
    .then( ( response: any ) => {
      dispatch( loadAllNewSharedListAction( response ) );
      dispatch( newSharingListsLoadingAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( newSharingListsLoadingAction( false ) );
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const loadAllAcceptedSharedLists = () => ( dispatch: IDispatchFunction ) => {
  dispatch( acceptSharingListsLoadingAction( true ) );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllAcceptedSharedLists()
    .then( ( response: any ) => {
      dispatch( loadAllAcceptedSharedListsAction( response ) );
      dispatch( acceptSharingListsLoadingAction( false ) );
    } )
    .catch( ( error: any ) => {
      dispatch( acceptSharingListsLoadingAction( false ) );
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const deleteListSharing = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.deleteListSharing( sharingId )
    .then( ( response: any ) => {
      dispatch( deleteListSharingAction( sharingId ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      windowBlocking( false )( dispatch );
    } );
};

const errorProcessing = {
  error: ( error: any, dispatch: IDispatchFunction ) => {
    if ( error.response ) {
      if ( error.response.status === 400 && error.response.data.data === null ) {
        loadAllNewSharedList()( dispatch );
        loadAllAcceptedSharedLists()( dispatch );
        dispatch( addNotificationAction( createNotification(
          'This shared list was not found or canceled by the owner.',
          EnumNotificationType.Danger ) ) );
      }
    }
  }
};

export const cancelAcceptNewSharingList = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.cancelAcceptanceNewSharingList( sharingId )
    .then( ( response: any ) => {
      dispatch( cancelAcceptNewSharingListAction( sharingId ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      errorProcessing.error( error, dispatch );
      // dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
      windowBlocking( false )( dispatch );
    } );
};

export const acceptListSharingInvite = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.acceptListSharingInvite( sharingId )
    .then( ( response: any ) => {
      dispatch( acceptListSharingInviteAction( sharingId ) );
      windowBlocking( false )( dispatch );
    } )
    .catch( ( error: any ) => {
      errorProcessing.error( error, dispatch );
      windowBlocking( false )( dispatch );
    } );
};

/* Actions */

function filterInvitationsAction( isShow: boolean ) {
  return { type: FILTER_INVITATIONS_LIST, isShow };
}

function closeFilterInvitationsAction( isShow: boolean ) {
  return { type: CLOSE_FILTER_INVITATIONS, isShow };
}

function loadAllNewSharedListAction( sharedLists: Array<IGeoListSharingDTO> ) {
  return { type: LOAD_ALL_NEW_SHARED_LISTS, sharedLists };
}

function loadAllAcceptedSharedListsAction( sharedLists: Array<IGeoListSharingDTO> ) {
  return { type: LOAD_ALL_ACCEPTED_SHARED_LISTS, sharedLists };
}

function deleteListSharingAction( sharingId: string ) {
  return { type: DELETE_LIST_SHARING, sharingId };
}

function cancelAcceptNewSharingListAction( sharingId: string ) {
  return { type: CANCEL_ACCEPT_NEW_SHARING_LIST, sharingId };
}

function acceptListSharingInviteAction( sharingId: string ) {
  return { type: ACCEPT_LIST_SHARING_INVITE, sharingId };
}

function newSharingListsLoadingAction( isLoading: boolean ) {
  return { type: NEW_SHARING_LISTS_LOADING, isLoading };
}

function acceptSharingListsLoadingAction( isLoading: boolean ) {
  return { type: ACCEPT_SHARING_LISTS_LOADING, isLoading };
}
