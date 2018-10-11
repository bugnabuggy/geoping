import IDispatchFunction from '../DTO/types/dispatchFunction';
import { USER_AUTHORIZATION_TEST_PERIOD } from '../DTO/constantsForReducer/user';
import StaticStorage from '../services/staticStorage';
import IAuthorization from '../DTO/authorizationServiceType';
import { buildEnvironment, environments, getBuildEnvironment } from '../DTO/environmentsServiceLocator';
import { EBuildEnvironment } from '../DTO/environment';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const useTestPeriod = ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => {
  getBuildEnvironment( EBuildEnvironment.Test );
  StaticStorage.serviceLocator = environments.get( buildEnvironment );

  const authorizationService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizationService.signin( email, password )
    .then( ( response: any ) => {
      localStorage.setItem( 'token', response );
      dispatch( useTestPeriodAction( true ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

export const getVirtualDatabase = () => ( dispatch: IDispatchFunction ) => {
  const authorizationService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizationService.getVirtualDatabase()
    .then( ( response: any ) => {
      sessionStorage.setItem( 'localDB', response );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error, EnumNotificationType.Danger ) ) );
    } );
};

/* Actions */
function useTestPeriodAction( authorization: any ): Object {
  return { type: USER_AUTHORIZATION_TEST_PERIOD, authorization };
}