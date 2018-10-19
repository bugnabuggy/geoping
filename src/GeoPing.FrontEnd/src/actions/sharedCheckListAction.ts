import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IUserWitchAccessDTO from '../DTO/userWitchAccessDTO';
import {
  CLEAR_SHARED_CHECK_LIST,
  LOAD_USERS_LIST_WITCH_SHARED_ACCESS, PROVIDE_PUBLIC_ACCESS,
  SEND_SHARE_CHECK_LIST_FOR_USERS
} from '../constantsForReducer/sharedCheckList';

export const loadUsersForShared = ( idList: string ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.loadUserWhoHasAccess(idList)
    .then( (response: any) => {
      dispatch(loadUsersForSharedAction(response));
    })
    .catch((error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });
};

export const clearSharedCheckList = () => ( dispatch: IDispatchFunction ) => {
  dispatch(clearSharedCheckListAction());
};

export const sendAccessUsersForCheckList = ( idCheckList: string, emails: Array<string> ) =>
  ( dispatch: IDispatchFunction ) => {
    const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
    checkListService.sharedCheckListForUser( idCheckList, emails )
      .then( (users: any) => {
        dispatch(sendAccessUsersForCheckListAction(users));
      })
      .catch( (error: any) => {
        dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
      });
};

export const providePublicAccess = ( idList: string, isPublic: boolean ) => ( dispatch: IDispatchFunction ) => {
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.providePublicAccess( idList, isPublic )
    .then( (response: any) => {
      dispatch(providePublicAccessAction(idList, isPublic));
    })
    .catch( (error: any) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    });
};

/* Actions */

function loadUsersForSharedAction( usersList: Array<IUserWitchAccessDTO> ):
  { type: string, usersList: Array<IUserWitchAccessDTO> } {
  return { type: LOAD_USERS_LIST_WITCH_SHARED_ACCESS, usersList };
}

function clearSharedCheckListAction(): { type: string } {
  return { type: CLEAR_SHARED_CHECK_LIST };
}

function sendAccessUsersForCheckListAction( users: any ): { type: string, users: any } {
  return { type: SEND_SHARE_CHECK_LIST_FOR_USERS, users };
}

function providePublicAccessAction(idList: string, isPublic: boolean):
  {type: string, idList: string, isPublic: boolean} {
  return {type: PROVIDE_PUBLIC_ACCESS, idList, isPublic };
}