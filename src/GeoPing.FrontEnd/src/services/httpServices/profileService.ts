import IProfileServiceType from '../../types/serviceTypes/profileServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import IUserType from '../../DTO/userDTO';
import { updateUserProfile, loadUserProfile} from '../../constants/endpoints';

export default class ProfileService implements IProfileServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  loadProfileData( ) {
    return this.communicator.get(loadUserProfile);
  }

  upgradeAccount() {
    return new Promise( resolve => '');
  }

  updateProfileData(data: IUserType) {
    return this.communicator.put(updateUserProfile, data);
  }
}