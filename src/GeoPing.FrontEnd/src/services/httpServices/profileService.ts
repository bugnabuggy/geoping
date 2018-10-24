import IProfileServiceType from '../../types/serviceTypes/profileServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';

export default class ProfileService implements IProfileServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  loadProfileData( idUser: string) {
    // return this.communicator.post()
    return new Promise( resolve => '');
  }

  upgradeAccount() {
    return new Promise( resolve => '');
  }
  updateProfileData() {
    return new Promise( resolve => '');
  }
}