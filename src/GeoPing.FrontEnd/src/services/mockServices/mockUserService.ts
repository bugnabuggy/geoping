import IUser from '../../types/serviceTypes/userServiceType';
import { users } from '../../mocks/checkinStatisticsMock';
// import * as uuidV5 from 'uuid/v5';

export default class MockUserService implements IUser {
  getUserProfile( idUser: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'profile' );
        },
        1000
      );
    } );
  }

  loadUsersForSharedList( idCheckLists: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( users.filter( ( item: any ) => item.idList === idCheckLists ) );
        },
        1000
      );
    } );
  }

  changePassword (password: string, newPassword: string) {
    return new Promise(( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve ( 'Password was successfully changed' );
        },
        1000
      );
    });
  }
}