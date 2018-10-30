import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { USER_AUTHORIZATION_TEST_PERIOD } from '../constantsForReducer/user';
import StaticStorage from '../services/staticStorage';
import IAuthorization from '../types/serviceTypes/authorizationServiceType';
import { buildEnvironment, environments, getBuildEnvironment } from '../services/environmentsServiceLocator';
import { EBuildEnvironment } from '../enums/environment';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { redirectDaschboardAction } from './userAction';

export const useTestPeriod = ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => {
  getBuildEnvironment( EBuildEnvironment.Test );
  StaticStorage.serviceLocator = environments.get( buildEnvironment );

  const authorizationService: IAuthorization = StaticStorage.serviceLocator.get( 'IAuthorization' );
  authorizationService.signin( email, password )
    .then( ( response: any ) => {
      localStorage.setItem( 'token', response );
      dispatch( useTestPeriodAction( true ) );
      dispatch( redirectDaschboardAction( true ) );
    } )
    .catch( ( error: any ) => {
      dispatch( addNotificationAction( createNotification( error.message, EnumNotificationType.Danger ) ) );
    } );
};

/* Actions */
function useTestPeriodAction( authorization: any ): Object {
  return { type: USER_AUTHORIZATION_TEST_PERIOD, authorization };
}