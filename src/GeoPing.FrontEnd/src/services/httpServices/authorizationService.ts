import IAuthorization from '../../types/serviceTypes/authorizationServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { getToken } from '../../constants/endpoints';

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
    return this.communicator.post( getToken, userSignIn );
  }
}