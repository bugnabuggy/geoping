import { AsyncStorage } from 'react-native';
import IRegistrationUserType from '../types/actionsType/registrationUserDataType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import {
  LOAD_USER_NAME,
  REDIRECT_DASHBOARD_FOR_LOGIN, SAVE_TOKEN,
  USER_AUTHORIZATION,
  USER_SIGN_OUT
} from '../constantsForReducer/user';
import IAuthorization from '../types/serviceTypes/authorizationServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { isRedirect, redirectOnSignInForm, windowBlocking, windowBlockingAction } from './windowAction';
import IUser from '../types/serviceTypes/userServiceType';
import { func } from "prop-types";

export const authorizationUser = ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( true ) );
  const authorizeService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizeService.signin( email, password )
    .then( ( token: string ) => {
      console.log('----------------------------------------');
      dispatch( windowBlockingAction( false ) );
      dispatch( authorizationUserAction( true ) );
      dispatch( redirectDaschboardAction( true ) );
      dispatch( saveTokenAction(token));
      isRedirect('Dashboard')(dispatch);
      dispatch( addNotificationAction( createNotification( 'You authorized', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction(
        createNotification( 'Invalid user name or password', EnumNotificationType.Danger )
      ) );
    } );
};

export const registrationUser = ( registrationUserData: IRegistrationUserType ) => ( dispatch: IDispatchFunction ) => {
  dispatch( windowBlockingAction( true ) );
  const authorizeService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizeService.registrationUser( registrationUserData )
    .then( ( response: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction( createNotification( 'You registered', EnumNotificationType.Success ) ) );
      authorizationUser( registrationUserData.login, registrationUserData.password )( dispatch );
    } )
    .catch( ( error: any ) => {
      dispatch( windowBlockingAction( false ) );
      dispatch( addNotificationAction(
        createNotification(
          error.response.data.messages[ 0 ],
          EnumNotificationType.Danger
        ) ) );
    } );
};

export const resetPasswordEnterLoginOrEmail = ( emailOrLogin: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const resetPasswordEnterNewPassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const signOutUser = () => ( dispatch: IDispatchFunction ) => {
  AsyncStorage.removeItem( 'token' );
  AsyncStorage.removeItem( 'token_type' );
  dispatch( signOutUserAction() );
};

export const authorizationUserFlag = ( isAuthorize: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( authorizationUserAction( isAuthorize ) );
};

export const redirectDashboard = ( isRedirect: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch( redirectDaschboardAction( isRedirect ) );
};

export const loadUserData = () => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.loadUserData()
    .then( ( userData: any ) => {
      windowBlocking( false )( dispatch );
      dispatch( loadUserDataAction( userData ) );
    } )
    .catch( ( error: any ) => {
      windowBlocking( false )( dispatch );
      if ( error.response.status === 401 ) {
        redirectOnSignInForm( true )( dispatch );
      } else {
        dispatch( addNotificationAction(
          createNotification(
            error.message,
            EnumNotificationType.Danger
          ) ) );
      }
    } );
};

/* Actions */

function authorizationUserAction( authorization: boolean ): Object {
  return { type: USER_AUTHORIZATION, authorization };
}

function signOutUserAction(): Object {
  return { type: USER_SIGN_OUT };
}

export function redirectDaschboardAction( isRedirect: boolean ) {
  return { type: REDIRECT_DASHBOARD_FOR_LOGIN, isRedirect };
}

export function loadUserDataAction( userData: any ) {
  return { type: LOAD_USER_NAME, userData };
}

function saveTokenAction( token: string ) {
  return { type: SAVE_TOKEN, token };
}
