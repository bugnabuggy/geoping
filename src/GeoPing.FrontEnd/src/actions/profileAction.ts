import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import IProfileServiceType from '../types/serviceTypes/profileServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { LOAD_INFO, UPGRADE_ACCOUNT, SHOW_MODAL_WINDOW, CLOSE_MODAL_WINDOW } from '../constantsForReducer/profile';

export const loadProfileData = (idUser: string) => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get( 'IProfileServiceType' );
  profileService.loadProfileData( idUser )
    .then( (profile: any) => {
      dispatch( loadProfileDataAction( profile ) );
    })
    .catch(( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const changePassword = ( password: string, newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.changePassword(password, newPassword)
    .then( (message: string) => {
      dispatch( addNotificationAction( createNotification (
        message, EnumNotificationType.Success ) ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

export const updateProfileData = ( data: any ) => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get('IProfileServiceType');
  profileService.updateProfileData(data)
    .then((message: string) => {
      dispatch(addNotificationAction(createNotification(
        message, EnumNotificationType.Success)));
    })
    .catch((error: any) => {
      dispatch(addNotificationAction(createNotification(error.message, EnumNotificationType.Danger)));
    });
};
export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  const co: any = 'a';
};

export const showModalChangePassword = () => (dispatch: IDispatchFunction ) => {
  dispatch(showModalChangePasswordAction( true ));
};
export const closeModalChangePassword = () => (dispatch: IDispatchFunction ) => {
  dispatch(closeModalChangePasswordAction( false ));
};

/* Action */
function closeModalChangePasswordAction(isShow: boolean): Object {
  return {type: CLOSE_MODAL_WINDOW, isShow};
}
function showModalChangePasswordAction(isShow: boolean): Object {
  return {type: SHOW_MODAL_WINDOW, isShow};
}
function loadProfileDataAction(profile: any): Object {
  return {type: LOAD_INFO, profile};
}