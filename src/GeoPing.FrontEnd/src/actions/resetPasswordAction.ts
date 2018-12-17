import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { SEND_LOGIN_OR_EMAIL, SEND_NEW_PASSWORD } from '../constantsForReducer/resetPassword';
import { isRedirect, windowBlockingAction } from './windowAction';
import StaticStorage from '../services/staticStorage';
import IUser from '../types/serviceTypes/userServiceType';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { loginUrl } from '../constants/routes';

export const sendLoginOrEmail = ( loginOrEmail: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( true ) );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.sendLoginOrEmail( loginOrEmail )
    .then( ( response: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction(
        createNotification( response.data.messages[0], EnumNotificationType.Success )
      ) );
      isRedirect(loginUrl)(dispatch);
    } )
    .catch( ( error: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction(
        createNotification( 'Login or email not found', EnumNotificationType.Danger )
      ) );
    } );
};

export const sendNewPassword = ( userId: string, token: string, newPassword: string ) =>
  ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( true ) );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.sendNewPassword( userId, token, newPassword )
    .then( ( response: any ) => {
      dispatch( windowBlockingAction( false ) );
      console.info( 'response', response );
      isRedirect(loginUrl)(dispatch);
    } )
    .catch( ( error: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction(
        createNotification( 'Failed to change password', EnumNotificationType.Danger )
      ) );
    } );
};

/* Actions */
function sendLoginOrEmailAction( loginOrEmail: string ): { type: string, loginOrEmail: string } {
  return { type: SEND_LOGIN_OR_EMAIL, loginOrEmail };
}

function sendNewPasswordAction( newPassword: string ): {  type: string, newPassword: string} {
  return { type: SEND_NEW_PASSWORD, newPassword };
}
