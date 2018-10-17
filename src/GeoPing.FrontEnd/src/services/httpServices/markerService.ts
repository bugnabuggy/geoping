import IMarkerServiceType from '../../types/serviceTypes/markerServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import { createGeoNewPoint, getGeoPointsForList, removeGeoPoint, updateGeoPoint } from '../../constants/endpoints';
import IGeoPoint from '../../DTO/geoPointDTO';

export default class MarkerService implements IMarkerServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createNewMarker( marker: IGeoPoint ) {
    return this.communicator.post( createGeoNewPoint.replace( '%listid%', marker.id ), marker );
  }

  deleteMarker( idCheckList: string, markerId: string ) {
    return this.communicator.delete(
      removeGeoPoint.replace( '%listid%', idCheckList ).replace( '%id%', markerId )
    );
  }

  getAllMarkersForCheckList( idCheckList: string ) {
    return this.communicator.get( getGeoPointsForList.replace( '%listid%', idCheckList ) );
  }

  updateMarker( marker: IGeoPoint ) {
    return this.communicator.put(
      updateGeoPoint.replace( '%listid%', marker.idList ).replace( '%id%', marker.id ),
      marker
    );
  }

  getMarkersForListAndUser( idList: string, idUser: string ) {
    // return this.communicator.get( '' );
    return new Promise( resolve => '' );
  }

}
