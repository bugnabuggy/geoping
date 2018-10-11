import IAuthorization from '../../DTO/authorizationServiceType';
import IHttpCommunicator from '../../DTO/httpCommunicatorType';
import StaticStorage from '../staticStorage';

export default class AuthorizationService implements IAuthorization {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  signin( email: string, password: string ) {
    const userSignIn: { email: string, password: string } = {
      email,
      password,
    };
    return this.communicator.post( '', userSignIn );
  }
}