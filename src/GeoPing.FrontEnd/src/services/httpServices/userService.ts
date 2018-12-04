import IUser from '../../types/serviceTypes/userServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import {
  changeUserPassword,
  confirmEmail,
  getUserAccessedToList,
  loadUserData,
  resetPassword,
  sendLoginOrEmail
} from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';

export default class UserService implements IUser {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  loadUsersForSharedList( idChecklists: string ) {
    return new Promise( resolve => '' );
  }

  loadUserForStatistic( idList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( getUserAccessedToList.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  changePassword( password: string, newPassword: string ) {
    const data = {
      'OldPassword': password,
      'NewPassword': newPassword,
    };
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.post( changeUserPassword, data )
        .then( ( response: any ) => {
          resolve( response.data.messages[ 0 ] );
        } )
        .catch( ( error: any ) => {
          if ( error.response.status === 400 ) {
            reject( { message: error.response.data.messages[ 0 ] } );
          } else {
            reject( error );
          }
        } );
    } );

    // ;
  }

  loadUserData() {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( loadUserData )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  sendLoginOrEmail( loginOrEmail: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      // const formData: FormData = new FormData();
      // formData.append( 'UserData', loginOrEmail );
      this.communicator.post( sendLoginOrEmail, {'UserData': loginOrEmail } )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  sendNewPassword( userId: string, token: string, newPassword: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.post(
        resetPassword.replace( '%id%', userId ).replace( '%token%', token ),
        {
          NewPassword: newPassword,
        }
      )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  confirmEmail( userId: string, token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( confirmEmail.replace( '%userId%', userId ).replace( '%token%', token ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }
}