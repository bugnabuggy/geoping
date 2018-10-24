import IRegistrationUserType from '../types/actionsType/registrationUserDataType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { USER_AUTHORIZATION, USER_SIGN_OUT } from '../constantsForReducer/user';
import IAuthorization from '../types/serviceTypes/authorizationServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export const authorizationUser = ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => {
  const authorizeService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizeService.signin( email, password )
    .then( ( token: string ) => {
      // dispatch ( authorizationUserAction ( true ) );
      dispatch( addNotificationAction( createNotification( 'You authorized', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      // if ( error.response.status === 400 ) {
      dispatch( addNotificationAction( createNotification( 'Invalid client', EnumNotificationType.Danger ) ) );
      // }
    } );
};

export const registrationUser = ( registrationUserData: IRegistrationUserType ) => ( dispatch: IDispatchFunction ) => {
  const authorizeService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizeService.registrationUser( registrationUserData )
    .then( ( response: any ) => {
      dispatch( addNotificationAction( createNotification( 'You registered', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      // if ( error.response.status === 404 ) {
      dispatch( addNotificationAction(
        createNotification(
          'Registration is not possible at this time',
          EnumNotificationType.Danger
        ) ) );
      // }
    } );
};

export const resetPasswordEnterLoginOrEmail = ( emailOrLogin: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const resetPasswordEnterNewPassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const signOutUser = () => ( dispatch: IDispatchFunction ) => {
  localStorage.removeItem('token');
  localStorage.removeItem('token_type');
  dispatch( signOutUserAction() );
};

/* Actions */

function authorizationUserAction( authorization: boolean ): Object {
  return { type: USER_AUTHORIZATION, authorization };
}

function signOutUserAction(): Object {
  return { type: USER_SIGN_OUT };
}