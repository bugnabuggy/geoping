import IAuthorization from '../../types/serviceTypes/authorizationServiceType';
import * as testUser from '../../mocks/testUser.json';
import IRegistrationUserType from '../../types/actionsType/registrationUserDataType';

export default class MockAuthorizationService implements IAuthorization {
  getVirtualDatabase() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          sessionStorage.setItem( 'localDB', JSON.stringify( testUser ) );
          resolve( 'ok');
        },
        1000
      );
    } );
  }

  signin( email: string, password: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          this.getVirtualDatabase()
            .then( ( response: any ) => {
              const token: string = JSON.parse(sessionStorage.getItem('localDB')).token;
              localStorage.setItem('token', token);
              resolve( token );
            })
            .catch( ( error: any ) => {
              reject(error);
            });
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
