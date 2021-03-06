import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import { IGeoListForUpdateDTO } from '../../DTO/geoListDTO';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import {
  acceptListSharingInvite,
  addCheckIn,
  cancelAcceptListSharing,
  createNewGeoList,
  deleteListSharing,
  endpointBaseUrl,
  getAllAcceptedSharedList,
  getAllChecksInForUserAndGivenList,
  getAllGeoLists,
  getAllNewSharedLists,
  getAllPublicGeoLosts,
  getAllUsersForListShared,
  getAutocompletedListUsers,
  getCertainPublicList,
  getFreeChecksStatisticsByFilter,
  getGeoListForId,
  getGeoListMyAndHasAccess,
  getGeoListStatistics,
  getInfoAboutToken,
  inviteUsersToShareList,
  removeGeoList,
  removeToken,
  updateGeoList
} from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';
import { ICheckInDTO } from '../../DTO/checkInDTO';

export default class CheckListService implements ICheckListServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createMyCheckList( nameCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.post( createNewGeoList, { Name: nameCheckList } )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.delete( removeGeoList.replace( '%id%', idCheckLIst ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  loadAllMyCheckLists() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllGeoLists )
        .then( ( response: any ) => {
          // resolve( response.data.data );
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  loadMyCheckList( idCheckLIst: string ) {
    // return new Promise<any>( ( resolve: any, reject: any ) => {});
    return this.communicator.get( getGeoListForId.replace( '%id%', idCheckLIst ) );
  }

  loadPublicCheckLists() {
    // return this.communicator.get( '' );
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllPublicGeoLosts )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  updateMyCheckList( idCheckList: string, checkList: IGeoListForUpdateDTO ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.put( updateGeoList.replace( '%id%', idCheckList ), checkList )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
    // return this.communicator.put( updateGeoList.replace( '%id%', idCheckList ), checkList );
  }

  addCheckIn( idPoint: string, data: ICheckInDTO ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.post( addCheckIn.replace( '%id%', idPoint ), data )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  updateNameMyCheckList( newNameCheckList: string ) {
    // return this.communicator.put( '', { newNameCheckList } );
    return new Promise( resolve => '' );
  }

  filterPublicCheckList( filters: any ) {
    return this.communicator.post( endpointBaseUrl + '/publick', filters );
  }

  loadUserWhoHasAccess( idList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllUsersForListShared.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  sharedCheckListForUser( idList: string, emails: Array<string> ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.post( inviteUsersToShareList.replace( '%listid%', idList ), emails )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  providePublicAccess( idList: string, isPublic: boolean ) {
    return new Promise( resolve => '' );
  }

  getAllChecksForUserAndList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllChecksInForUserAndGivenList.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getAllCheckForList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getGeoListStatistics.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getAllNewSharedLists() {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllNewSharedLists )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getAllAcceptedSharedLists() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getAllAcceptedSharedList )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  deleteListSharing( sharingId: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.delete( deleteListSharing.replace( '%sharingId%', sharingId ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  cancelAcceptanceNewSharingList( sharingId: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.delete( cancelAcceptListSharing.replace( '%sharingId%', sharingId ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  acceptListSharingInvite( sharingId: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      this.communicator.post( acceptListSharingInvite.replace( '%sharingId%', sharingId ), {} )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getAutocompletedListUsers( userName: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getAutocompletedListUsers.replace( '%query%', userName ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getInfoAboutToken( token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getInfoAboutToken.replace( '%token%', token ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  removeToken( token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.delete( removeToken.replace( '%token%', token ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  removeAccessUserForList( sharingId: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.delete( deleteListSharing.replace( '%sharingId%', sharingId ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getGeoListMyAndHasAccess() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getGeoListMyAndHasAccess )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getFreeChecksInStatisticsByFilter( dateFrom: string, dateTo: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getFreeChecksStatisticsByFilter +
        `DatePeriodFrom=${dateFrom}&DatePeriodTo=${dateTo}` )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getCertainPublicList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getCertainPublicList.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

}
