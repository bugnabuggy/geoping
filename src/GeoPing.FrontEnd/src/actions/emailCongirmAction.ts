import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { CONFIRM_EMAIL } from '../constantsForReducer/window';

export const confirmEmail = ( userId: string, token: string ) => ( dispatch: IDispatchFunction) => {
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.confirmEmail( userId, token)
    .then( ( response: any ) => {
      dispatch(confirmEmailAction());
    })
    .catch( ( error: any ) => {
      dispatch( addNotificationAction(
        createNotification(
          error.message,
          EnumNotificationType.Danger
        ) ) );
    });
};

/* Actions */
function confirmEmailAction() {
  return { type: CONFIRM_EMAIL };
}
