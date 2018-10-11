import IMarkerServiceType from '../../DTO/markerServiceType';
import { IMarker } from '../../DTO/types/googleMapType';
import IHttpCommunicator from '../../DTO/httpCommunicatorType';
import StaticStorage from '../staticStorage';

export default class MarkerService implements IMarkerServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createNewMarker( marker: IMarker ) {
    return this.communicator.post( '', marker );
  }

  deleteMarker( idCheckList: string ) {
    return this.communicator.delete( '' );
  }

  getAllMarkersForCheckList( idCheckList: string ) {
    return this.communicator.get( `api/geolist/${idCheckList}/geopoint` );
  }

  updateMarker( marker: IMarker ) {
    return this.communicator.post( '', marker );
  }

  getMarkersForListAndUser( idList: string, idUser: string ) {
    return this.communicator.get( '' );
  }

}