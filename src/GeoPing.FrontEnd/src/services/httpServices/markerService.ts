import IMarkerServiceType from '../../types/serviceTypes/markerServiceType';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import {
  createGeoNewPoint,
  getCheckInStatisticsForListByFilter,
  getGeoPointsForList,
  getPointsForPublicList,
  removeGeoPoint,
  updateGeoPoint
} from '../../constants/endpoints';
import IGeoPoint, { IGeoPintForCreateDTO } from '../../DTO/geoPointDTO';
import { formattingGeoPoints, getDataFromResponse } from '../helper';
import { v4 as uuidV4 } from 'uuid';

export default class MarkerService implements IMarkerServiceType {
  private communicator: IHttpCommunicator;

  constructor() {
    this.communicator = StaticStorage.serviceLocator.get( 'IHttpCommunicator' );
  }

  createNewMarker( marker: IGeoPoint ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      const idList: string = marker.idList;
      const GeoPoint: IGeoPintForCreateDTO = {
        Name: marker.name,
        Description: marker.description,
        Longitude: marker.lng,
        Latitude: marker.lat,
        Radius: marker.radius,
        Address: marker.description,
      };
      this.communicator.post( createGeoNewPoint.replace( '%listid%', idList ), GeoPoint )
        .then( ( response: any ) => {
          const tempMarker: any = getDataFromResponse( response );
          const geoPoint: IGeoPoint = {
            id: tempMarker.id,
            name: tempMarker.name,
            radius: tempMarker.radius,
            lat: Number( tempMarker.latitude ),
            lng: Number( tempMarker.longitude ),
            description: tempMarker.description,
            idList: tempMarker.listId,
            idForMap: marker.idForMap,
          };
          resolve( geoPoint );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  deleteMarker( idCheckList: string, markerId: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.delete(
        removeGeoPoint.replace( '%listid%', idCheckList ).replace( '%id%', markerId )
      )
        .then( ( response: any ) => {
          if ( response.data.success ) {
            resolve();
          } else {
            reject( { message: 'failed to delete point' } );
          }
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getAllMarkersForCheckList( idCheckList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getGeoPointsForList.replace( '%listid%', idCheckList ) )
        .then( ( response: any ) => {

          // const markers: Array<any> = getDataFromResponse( response ).map( ( item: any ) => {
          //   return {
          //     id: item.id,
          //     name: item.name,
          //     radius: item.radius,
          //     lat: Number( item.latitude ),
          //     lng: Number( item.longitude ),
          //     description: item.description,
          //     idList: item.listId,
          //     idForMap: uuidV4(),
          //   };
          // } );
          resolve( formattingGeoPoints(getDataFromResponse( response )) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  updateMarker( marker: IGeoPoint ) {
    return new Promise( ( resolve: any, reject: any ) => {
      const idList: string = marker.idList;
      const GeoPoint: IGeoPintForCreateDTO = {
        Name: marker.name,
        Description: marker.description,
        Longitude: marker.lng,
        Latitude: marker.lat,
        Radius: marker.radius,
        Address: marker.description,
      };
      this.communicator.put(
        updateGeoPoint.replace( '%listid%', idList ).replace( '%id%', marker.id ),
        GeoPoint
      )
        .then( ( response: any ) => {
          const tempMarker: any = getDataFromResponse( response );
          const geoPoint: IGeoPoint = {
            id: tempMarker.id,
            name: tempMarker.name,
            radius: tempMarker.radius,
            lat: Number( tempMarker.latitude ),
            lng: Number( tempMarker.longitude ),
            description: tempMarker.description,
            idList: tempMarker.listId,
            idForMap: marker.idForMap,
          };
          resolve( geoPoint );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getMarkersForListAndUser( idList: string, idUser: string ) {
    // return this.communicator.get( '' );
    return new Promise( resolve => '' );
  }

  getChecksStatisticsForList( listId: string, data: any ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get(
        getCheckInStatisticsForListByFilter.replace( '%listid%', listId ) +
        `?UserId=${data.UserId}&DatePeriodFrom=${data.DatePeriodFrom}&DatePeriodTo=${data.DatePeriodTo}`
      )
        .then( ( response: any ) => {
          resolve( getDataFromResponse( response ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }

  getPointsForPublicList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      this.communicator.get( getPointsForPublicList.replace( '%listid%', idList ) )
        .then( ( response: any ) => {
          resolve( formattingGeoPoints( getDataFromResponse( response ) ) );
        } )
        .catch( ( error: any ) => {
          reject( error );
        } );
    } );
  }
}
