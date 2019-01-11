import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import IProfileServiceType from '../types/serviceTypes/profileServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { CLOSE_MODAL_WINDOW, LOAD_INFO, SAVE_AVATAR, SHOW_MODAL_WINDOW } from '../constantsForReducer/profile';

export const loadProfileData = ( idUser: string ) => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get( 'IProfileServiceType' );
  profileService.loadProfileData( idUser )
    .then( ( profile: any ) => {
      dispatch( loadProfileDataAction( profile ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const changePassword = ( password: string, newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.changePassword( password, newPassword )
    .then( ( message: string ) => {
      dispatch( addNotificationAction( createNotification(
        message, EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const updateProfileData = ( data: any ) => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get( 'IProfileServiceType' );
  profileService.updateProfileData( data )
    .then( ( profile: any ) => {
      dispatch( addNotificationAction( createNotification(
        'Profile saved', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};
export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  const co: any = 'a';
};

export const showModalChangePassword = () => ( dispatch: IDispatchFunction ) => {
  dispatch( showModalChangePasswordAction( true ) );
};
export const closeModalChangePassword = () => ( dispatch: IDispatchFunction ) => {
  dispatch( closeModalChangePasswordAction( false ) );
};

export const saveAvatar = ( avatar: string ) => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get( 'IProfileServiceType' );
  profileService.saveAvatar( avatar )
    .then( ( response: any ) => {
      dispatch( saveAvatarAction( response.avatar ) );
      dispatch( addNotificationAction( createNotification(
        'Avatar saved', EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

/* Action */
function closeModalChangePasswordAction( isShow: boolean ): Object {
  return { type: CLOSE_MODAL_WINDOW, isShow };
}

function showModalChangePasswordAction( isShow: boolean ): Object {
  return { type: SHOW_MODAL_WINDOW, isShow };
}

function loadProfileDataAction( profile: any ): Object {
  return { type: LOAD_INFO, profile };
}

function saveAvatarAction( avatar: string ) {
  return { type: SAVE_AVATAR, avatar };
}