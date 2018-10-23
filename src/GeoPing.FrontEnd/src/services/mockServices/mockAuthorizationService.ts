import IAuthorization from '../../types/serviceTypes/authorizationServiceType';
import * as testUser from '../../mocks/testUser.json';
import * as uuidV5 from 'uuid/v5';
import IRegistrationUserType from '../../types/actionsType/registrationUserDataType';

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

  registrationUser( registrationUserData: IRegistrationUserType ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( '' );
        },
        1000
      );
    } );
  }

}