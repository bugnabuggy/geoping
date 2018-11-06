import IProfileServiceType from '../../types/serviceTypes/profileServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IUserType from '../../DTO/userDTO';
import { loadUserProfile, updateUserProfile } from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';

export default class ProfileService implements IProfileServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  loadProfileData() {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( loadUserProfile )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  upgradeAccount() {
    return new Promise( resolve => '' );
  }

  updateProfileData( data: IUserType ) {
    return this.communicator.put( updateUserProfile, data );
  }
}