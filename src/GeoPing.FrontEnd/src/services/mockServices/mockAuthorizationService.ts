import IAuthorization from '../../DTO/authorizationServiceType';
import * as testUser from '../../mocks/testUser.json';
import * as uuidV5 from 'uuid/v5';

export default class MockAuthorizationService implements IAuthorization {
  getVirtualDatabase() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( JSON.stringify( testUser ) );
        },
        1000
      );
    } );
  }

  signin( email: string, password: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( uuidV5( email, uuidV5.DNS ) );
        },
        1000
      );
    } );
  }

}