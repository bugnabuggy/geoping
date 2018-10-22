import IProfileServiceType from '../../types/serviceTypes/profileServiceType';

export default class MockProfileService implements IProfileServiceType {
  loadProfileData() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( JSON.parse( sessionStorage.getItem( 'localDB' ) ).user_profile );
        },
        1000
      );
    } );
  }
  upgradeAccount() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'profile' );
        },
        1000
      );
    } );
  }

  updateProfileData() {
    return new Promise ((resolve: any, reject: any) => {
      resolve ('your credentials was updated');
    });
  }
}