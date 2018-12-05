import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { CONFIRM_EMAIL } from '../constantsForReducer/window';
import { windowBlocking } from './windowAction';

export const confirmEmail = ( userId: string, token: string ) => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.confirmEmail( userId, token )
    .then( ( response: any ) => {
      dispatch( confirmEmailAction() );
      windowBlocking( false )( dispatch );
      dispatch( addNotificationAction(
        createNotification(
          'Email Confirm',
          EnumNotificationType.Danger
        ) ) );
    } )
    .catch( ( error: any ) => {
      if ( error.response ) {
        if ( error.response.status === 400 && error.response.data.data === null ) {
          error.response.data.messages.forEach( ( message: string ) => {
            dispatch( addNotificationAction(
              createNotification(
                message + ' confirmEmail',
                EnumNotificationType.Danger
              ) ) );
          } );
        } else {
          dispatch( addNotificationAction(
            createNotification(
              error.message + ' confirmEmail',
              EnumNotificationType.Danger
            ) ) );
        }
      }
      windowBlocking( false )( dispatch );
    } );
};

/* Actions */
function confirmEmailAction() {
  return { type: CONFIRM_EMAIL };
}
