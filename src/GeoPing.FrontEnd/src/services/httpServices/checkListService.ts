import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import IGeoListType from '../../DTO/geoListDTO';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import {
  createNewGeoList,
  endpointBaseUrl,
  getGeoListForId,
  removeGeoList,
  updateGeoList
} from '../../constants/endpoints';

export default class CheckListService implements ICheckListServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createMyCheckList( nameCheckList: string ) {
    return this.communicator.post( createNewGeoList, { Name: nameCheckList } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return this.communicator.delete( removeGeoList.replace( '%id%', idCheckLIst ) );
  }

  loadAllMyCheckLists( idUser: string ) {
    return this.communicator.post( endpointBaseUrl + '/myCheckList', { idUser } );
  }

  loadMyCheckList( idCheckLIst: string ) {
    return this.communicator.get( getGeoListForId.replace( '%id%', idCheckLIst ) );
  }

  loadPublicCheckLists() {
    // return this.communicator.get( '' );
    return new Promise( resolve => '' );
  }

  updateMyCheckList( checkList: IGeoListType ) {
    return this.communicator.put( updateGeoList.replace( '%id%', checkList.id ), { checkList } );
  }

  updateNameMyCheckList( newNameCheckList: string ) {
    // return this.communicator.put( '', { newNameCheckList } );
    return new Promise( resolve => '' );
  }

  filterPublicCheckList(filters: any) {
    return this.communicator.post( endpointBaseUrl + '/publick', filters );
  }

  loadUserWhoHasAccess( idList: string ) {
    return new Promise( resolve => '' );
  }
  sharedCheckListForUser(  idList: string, emails: Array<string> ) {
    return new Promise( resolve => '' );
  }

  providePublicAccess( idList: string, isPublic: boolean ) {
    return new Promise( resolve => '' );
  }

}