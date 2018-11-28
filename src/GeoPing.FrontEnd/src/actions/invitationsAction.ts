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
  CANCEL_ACCEPT_NEW_SHARING_LIST,
  DELETE_LIST_SHARING,
  LOAD_ALL_ACCEPTED_SHARED_LISTS,
  LOAD_ALL_NEW_SHARED_LISTS
} from '../constantsForReducer/checkList';

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
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllNewSharedLists()
    .then( ( response: any ) => {
      console.info( 'response', response );
      dispatch( loadAllNewSharedListAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const loadAllAcceptedSharedLists = () => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getAllAcceptedSharedLists()
    .then( ( response: any ) => {
      console.info( 'response', response );
      dispatch( loadAllAcceptedSharedListsAction( response ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const deleteListSharing = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.deleteListSharing( sharingId )
    .then( ( response: any ) => {
      console.info( 'response', response );
      dispatch( deleteListSharingAction( sharingId ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const cancelAcceptNewSharingList = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.cancelAcceptanceNewSharingList( sharingId )
    .then( ( response: any ) => {
      console.info( 'response', response );
      dispatch( cancelAcceptNewSharingListAction( sharingId ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const acceptListSharingInvite = ( sharingId: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.acceptListSharingInvite( sharingId )
    .then( ( response: any ) => {
      console.info( 'response', response );
      dispatch( acceptListSharingInviteAction( sharingId ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
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
