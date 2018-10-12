import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import IGeoListType from '../../DTO/geoListDTO';
import { v4 as uuidV4 } from 'uuid';

export default class MockCheckListService implements ICheckListServiceType {
  createMyCheckList( nameCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            {
              id: uuidV4(),
              name: nameCheckList,
            }
          );
        },
        1000
      );
    } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'Ok' );
    } );
  }

  loadAllMyCheckLists( idUser: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_my_check_lists );
        },
        1000
      );
    } );
  }

  loadMyCheckList( idCheckLIst: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'loadMyCheckList' );
    } );
  }

  loadPublicCheckLists() {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'loadPublicCheckLists' );
    } );
  }

  updateMyCheckList( checkList: IGeoListType ) {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'updateMyCheckList' );
    } );
  }

  updateNameMyCheckList( newNameCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( newNameCheckList );
        },
        1000
      );
    } );
  }

  filterPublicCheckList() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'ds' );
        },
        1000
      );
    } );
  }

}