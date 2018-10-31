import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import { IGeoListForUpdateDTO } from '../../DTO/geoListDTO';
import IHttpCommunicator from '../../types/serviceTypes/httpCommunicatorType';
import StaticStorage from '../staticStorage';
import {
  createNewGeoList,
  endpointBaseUrl,
  getAllGeoLists,
  getAllPublicGeoLosts,
  getGeoListForId,
  removeGeoList,
  updateGeoList
} from '../../constants/endpoints';
import { getDataFromResponse } from '../helper';

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

  updateNameMyCheckList( newNameCheckList: string ) {
    // return this.communicator.put( '', { newNameCheckList } );
    return new Promise( resolve => '' );
  }

  filterPublicCheckList( filters: any ) {
    return this.communicator.post( endpointBaseUrl + '/publick', filters );
  }

  loadUserWhoHasAccess( idList: string ) {
    return new Promise( resolve => '' );
  }

  sharedCheckListForUser( idList: string, emails: Array<string> ) {
    return new Promise( resolve => '' );
  }

  providePublicAccess( idList: string, isPublic: boolean ) {
    return new Promise( resolve => '' );
  }

}