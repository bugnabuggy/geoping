import ICheckListServiceType from '../../DTO/checkListServiceType';
import IGeolistType from '../../DTO/geolistType';
import IHttpCommunicator from '../../DTO/httpCommunicatorType';
import StaticStorage from '../staticStorage';

export default class CheckListService implements ICheckListServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createMyCheckList( nameCheckList: string ) {
    return this.communicator.post( '', { nameCheckList } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return this.communicator.delete( '' );
  }

  loadAllMyCheckLists( idUser: string ) {
    return this.communicator.post( '', { idUser } );
  }

  loadMyCheckList( idCheckLIst: string ) {
    return this.communicator.post( '', { idCheckLIst } );
  }

  loadPublicCheckLists() {
    return this.communicator.get( '' );
  }

  updateMyCheckList( checkList: IGeolistType ) {
    return this.communicator.put( '', { checkList } );
  }

  updateNameMyCheckList( newNameCheckList: string ) {
    return this.communicator.put( '', { newNameCheckList } );
  }

  filterPublicCheckList() {
    // return this.communicator.post( '', 'filter'  );
    return new Promise( resolve => 'ffff');
  }

}