import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { isRedirect, windowBlocking } from './windowAction';
import ICheckListServiceType from '../types/serviceTypes/checkListServiceType';
import StaticStorage from '../services/staticStorage';
import { dashboardUrl, loginUrl, registerUrl, tokenError } from '../constants/routes';
import { createNotification } from '../services/helper';
import { addNotificationAction } from './notificationsAction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { signOutUser } from './userAction';
import { MESSAGE_FOR_ACTIVATE_TOKEN } from '../constantsForReducer/sharedCheckList';

const statusError: any = {
  404: ( dispatch: IDispatchFunction ) => {
    dispatch( addNotificationAction(
      createNotification( 'There is no such token', EnumNotificationType.Danger )
    ) );
  },
  410: ( dispatch: IDispatchFunction ) => {
    dispatch( addNotificationAction(
      createNotification( 'This token has already been used', EnumNotificationType.Danger )
    ) );
  },
};

export const removeToken = ( token: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.removeToken( token )
    .then( ( response: any ) => {
      windowBlocking( false )( dispatch );
      dispatch(messageForActivateTokenAction('Your token verified'));
    } )
    .catch( ( error: any ) => {
      windowBlocking( false )( dispatch );
      dispatch( addNotificationAction(
        createNotification( error.message + ' removeToken', EnumNotificationType.Danger )
      ) );
    } );
};

const tokenType: any = {
  Sharing: ( response: any, userId: string, token: string, dispatch: IDispatchFunction ) => {
    // if ( response.userId === userId ) {
    //   // isRedirect( dashboardUrl )( dispatch );
    //   removeToken( token )( dispatch );
    // } else {
    //   signOutUser()( dispatch );
    //   windowBlocking( false )( dispatch );
    //   isRedirect( loginUrl )( dispatch );
    // }
    isRedirect( dashboardUrl )( dispatch );
    windowBlocking( false )( dispatch );
  },
  SharingInvite: ( response: any, userId: string, token: string, dispatch: IDispatchFunction ) => {
    signOutUser()( dispatch );
    isRedirect( registerUrl )( dispatch );
    windowBlocking( false )( dispatch );
  },
};

export const verifyToken = ( token: string, userId: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  dispatch(messageForActivateTokenAction('Please wait we verifying your token'));
  const checkListService: ICheckListServiceType = StaticStorage.serviceLocator.get( 'ICheckListServiceType' );
  checkListService.getInfoAboutToken( token )
    .then( ( response: any ) => {
      tokenType[ response.tokenType ]( response, userId, token, dispatch );
    } )
    .catch( ( error: any ) => {
      windowBlocking( false )( dispatch );
      if ( error.response ) {
        statusError[ error.response.status ]( dispatch );
      }
      isRedirect( tokenError )( dispatch );
      // dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

/* Action */

function messageForActivateTokenAction( message: string ) {
  return { type: MESSAGE_FOR_ACTIVATE_TOKEN, message };
}
