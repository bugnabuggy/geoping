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
    userSignIn.append( 'email', email );
    userSignIn.append( 'password', password );

    return this.communicator.post( getToken, userSignIn );
  }

  registrationUser( registrationUserData: IRegistrationUserType ) {
    const user: FormData = new FormData();

    user.append( 'login', registrationUserData.login );
    user.append( 'email', registrationUserData.email );
    user.append( 'password', registrationUserData.password );

    return this.communicator.post( registration, user );
  }

}