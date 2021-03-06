import IMarkerServiceType from '../../types/serviceTypes/markerServiceType';
import IGeoPoint from '../../DTO/geoPointDTO';

export default class MockMarkerService implements IMarkerServiceType {
  createNewMarker( marker: IGeoPoint ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'is added' );
        },
        1000
      );
    } );
  }

  deleteMarker( idCheckList: string, markerId: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( {
            id: idCheckList,
          } );
        },
        1000
      );
    } );
  }

  getAllMarkersForCheckList( idCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            JSON.parse( sessionStorage.getItem( 'localDB' ) ).points
              .filter( ( item: any ) => item.idList === idCheckList )
          );
        },
        1000
      );
    } );
  }

  updateMarker( marker: IGeoPoint ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'is Update' );
        },
        1000
      );
    } );
  }

  getMarkersForListAndUser( idList: string, idUser: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            JSON.parse( sessionStorage.getItem( 'localDB' ) ).check_in_statistics_point
              .filter( ( item: any ) => item.idList === idList && item.idUser === idUser )
          );
        },
        1000
      );
    } );
  }

  getChecksStatisticsForList( listId: string, data: any ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'is Update' );
        },
        1000
      );
    } );
  }

  getPointsForPublicList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve( 'ok' );
    } );
  }

}
