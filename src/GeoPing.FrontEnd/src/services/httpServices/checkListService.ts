import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import IGeoListType from '../../DTO/geoListDTO';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { createNewGeoList, getGeoListForId, removeGeoList, updateGeoList } from '../../constants/endpoints';

export default class CheckListService implements ICheckListServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createMyCheckList( nameCheckList: string ) {
    return this.communicator.post( createNewGeoList, { nameCheckList } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return this.communicator.delete( removeGeoList.replace( '%id%', idCheckLIst ) );
  }

  loadAllMyCheckLists( idUser: string ) {
    // return this.communicator.post( '', { idUser } );
    return new Promise( resolve => '' );
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

  filterPublicCheckList() {
    // return this.communicator.post( '', 'filter'  );
    return new Promise( resolve => '' );
  }

}