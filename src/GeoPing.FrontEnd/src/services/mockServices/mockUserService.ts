import IUser from '../../types/serviceTypes/userServiceType';
import { users } from '../../mocks/checkinStatisticsMock';

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

  loadUserForStatistic( idList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            JSON.parse( sessionStorage.getItem( 'localDB' ) ).check_in_statistics_users
              .filter( ( item: any ) => item.idList === idList )
          );
        },
        1000
      );
    } );
  }

}