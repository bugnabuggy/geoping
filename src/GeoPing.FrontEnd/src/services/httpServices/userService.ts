import IUser from '../../types/serviceTypes/userServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { changeUserPassword, loadUserData } from '../../constants/endpoints';
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
    return new Promise( resolve => '' );
  }

  changePassword( password: string, newPassword: string ) {
    const data = {
      'OldPassword': password,
      'NewPassword': newPassword,
    };
    return this.communicator.post( changeUserPassword, data );
  }

  loadUserData() {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( loadUserData )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        })
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }
}