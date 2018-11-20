import IProfileServiceType from '../../types/serviceTypes/profileServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IUserType from '../../DTO/userDTO';
import { loadUserProfile, updateAvatar, updateUserProfile } from '../../constants/endpoints';
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
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.put( updateUserProfile, data )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
    // return this.communicator.put( updateUserProfile, data );
  }

  saveAvatar( avatar: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.put( updateAvatar, { Avatar: avatar } )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }
}