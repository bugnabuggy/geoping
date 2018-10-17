import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import IProfileServiceType from '../types/serviceTypes/profileServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { LOAD_INFO, UPGRADE_ACCOUNT } from '../constantsForReducer/profile';

export const loadProfileData = () => ( dispatch: IDispatchFunction ) => {
  const profileService: IProfileServiceType = StaticStorage.serviceLocator.get( 'IProfileServiceType' );
  profileService.loadProfileData()
    .then( (profile: any) => {
      dispatch( loadProfileDataAction( profile ) );
    })
    .catch(( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
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
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const upgradeAccount = () => ( dispatch: IDispatchFunction ) => {
  const co: any = 'a';
};
function loadProfileDataAction(profile: Array<string>): Object {
  return {type: LOAD_INFO, profile};
}