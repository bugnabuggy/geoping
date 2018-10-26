import IAuthorization from '../../types/serviceTypes/authorizationServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { getToken, registration } from '../../constants/endpoints';
import IRegistrationUserType from '../../types/actionsType/registrationUserDataType';

export default class AuthorizationService implements IAuthorization {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  signin( email: string, password: string ) {
    const userSignIn: FormData = new FormData();
    userSignIn.append( 'username', email );
    userSignIn.append( 'password', password );
    userSignIn.append( 'client_id', process.env.REACT_APP_CLIENT_ID );
    userSignIn.append( 'client_secret', process.env.REACT_APP_CLIENT_SECRET );
    userSignIn.append( 'grant_type', process.env.REACT_APP_GRANT_TYPE );
    userSignIn.append( 'scope', process.env.REACT_APP_SCOPE );

    // return this.communicator.post( getToken, userSignIn );
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.post( getToken, userSignIn )
        .then( ( response: any ) => {
          if ( response.status === 200 ) {
            localStorage.setItem( 'token', response.data.access_token );
            localStorage.setItem( 'token_type', response.data.token_type );
            resolve( response.data.access_token );
          }
          reject( { error: { response: { status: response.status } } } );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  registrationUser( registrationUserData: IRegistrationUserType ) {
    const user: any = {
      UserName: registrationUserData.login,
      Email: registrationUserData.email,
      Password: registrationUserData.password,
    };

    return this.communicator.post( registration, user );
  }

}