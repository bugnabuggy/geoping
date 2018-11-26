import { AsyncStorage } from 'react-native';

import IAuthorization from '../../types/serviceTypes/authorizationServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { getToken, registration } from '../../constants/endpoints';
import IRegistrationUserType from '../../types/actionsType/registrationUserDataType';
import { client_id, client_secret, grant_type, scope } from '../../constants/secretSettings';

export default class AuthorizationService implements IAuthorization {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get ( 'IHttpCommunicator' );
  }

  signin( email: string, password: string ) {
    const userSignIn: FormData = new FormData ();
    userSignIn.append ( 'username', email );
    userSignIn.append ( 'password', password );
    userSignIn.append ( 'client_id', client_id );
    userSignIn.append ( 'client_secret', client_secret );
    userSignIn.append ( 'grant_type', grant_type );
    userSignIn.append ( 'scope', scope );

    return new Promise ( ( resolve: any, reject: any ) => {
      this.communicator.post ( getToken, userSignIn )
        .then ( ( response: any ) => {

          if ( response.status === 200 ) {
            AsyncStorage.setItem ( 'token', response.data.access_token );
            AsyncStorage.setItem ( 'token_type', response.data.token_type );
            resolve ( response.data.access_token );
          }
          reject ( { error: { response: { status: response.status } } } );
        } )
        .catch ( ( error: any ) => {
          reject ( error );
        } );
    } );
  }

  registrationUser( registrationUserData: IRegistrationUserType ) {
    const user: any = {
      UserName: registrationUserData.login,
      Email: registrationUserData.email,
      Password: registrationUserData.password,
    };

    return this.communicator.post ( registration, user );
  }

}