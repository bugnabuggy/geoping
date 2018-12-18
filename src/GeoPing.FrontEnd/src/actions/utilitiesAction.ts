import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IUser from '../types/serviceTypes/userServiceType';
import StaticStorage from '../services/staticStorage';
import { addNotificationAction } from './notificationsAction';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { LOAD_COUTRIES, LOAD_TIME_ZONES } from '../constantsForReducer/utilities';
import { ITimeZoneDTO } from '../DTO/timeZoneDTO';
import { windowBlocking } from './windowAction';
import ICountriesDTO from '../DTO/countriesDTO';

export const getTimeZones = () => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.getTimeZones()
    .then( ( response: any ) => {
      windowBlocking( false )( dispatch );
      dispatch( getTimeZonesAction( response ) );
    } )
    .catch( ( error: any ) => {
      windowBlocking( false )( dispatch );
      dispatch( addNotificationAction(
        createNotification(
          error.response.data.messages[ 0 ] + ' authorizationUser',
          EnumNotificationType.Danger
        ) ) );
    } );
};

export const getCountries = () => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
  const userService: IUser = StaticStorage.serviceLocator.get( 'IUser' );
  userService.getCountries()
    .then( ( coutries: Array<ICountriesDTO> ) => {
      dispatch( getCountriesAction( coutries ) );
    } )
    .catch( ( error: any ) => {
      windowBlocking( false )( dispatch );
      dispatch( addNotificationAction(
        createNotification(
          error.response.data.messages[ 0 ] + ' authorizationUser',
          EnumNotificationType.Danger
        ) ) );
    } );
};

/* Actions */
function getTimeZonesAction( timeZones: Array<ITimeZoneDTO> ) {
  return { type: LOAD_TIME_ZONES, timeZones };
}

function getCountriesAction( coutries: Array<ICountriesDTO> ) {
  return { type: LOAD_COUTRIES, coutries };
}