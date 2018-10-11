import IMarkerServiceType from '../../DTO/markerServiceType';
import { IMarker } from '../../DTO/types/googleMapType';
import { points } from '../../mocks/checkinStatisticsMock';

export default class MockMarkerService implements IMarkerServiceType {
  createNewMarker( marker: IMarker ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'is added' );
        },
        1000
      );
    } );
  }

  deleteMarker( idCheckList: string ) {
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

  updateMarker( marker: IMarker ) {
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
          resolve( points.filter( ( item: any ) => item.idList === idList && item.idUser === idUser ) );
        },
        1000
      );
    } );
  }

}