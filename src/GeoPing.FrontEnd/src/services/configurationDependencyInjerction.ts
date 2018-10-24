import {
  buildEnvironment,
  environments,
  httpServiceLocator,
  testServiceLocator
} from './environmentsServiceLocator';
import { EBuildEnvironment } from '../enums/environment';
import TableHistoryService from './httpServices/tableHistoryService';
import HttpCommunicator from './httpService';
import StaticStorage from './staticStorage';
import MockTableHistoryService from './mockServices/mockTableHistoryService';
import MockAuthorizationService from './mockServices/mockAuthorizationService';
import MockCheckListService from './mockServices/mockCheckListService';
import MockMarkerService from './mockServices/mockMarkerService';
import ITableHistoryService from '../types/serviceTypes/tableHistoryServiceType';
import AuthorizationService from './httpServices/authorizationService';
import CheckListService from './httpServices/checkListService';
import MockUserService from './mockServices/mockUserService';
import MarkerService from './httpServices/markerService';
import { AxiosRequestConfig } from 'axios';

export function configurationDependencyInjerction() {

  environments.set( EBuildEnvironment.Test, testServiceLocator );
  environments.set( EBuildEnvironment.HTTP, httpServiceLocator );

  StaticStorage.serviceLocator = environments.get( buildEnvironment );

  const httpHeader: AxiosRequestConfig = {
    headers: {}
  };

  /* http services */
  httpServiceLocator.set( 'IHttpCommunicator', new HttpCommunicator( httpHeader ) );
  httpServiceLocator.set( 'IAuthorization', new AuthorizationService() );
  httpServiceLocator.set( 'ITableHistoryService', new TableHistoryService() );
  httpServiceLocator.set( 'ICheckListServiceType', new CheckListService() );
  httpServiceLocator.set( 'IMarkerServiceType', new MarkerService() );
  httpServiceLocator.set( 'IUser', new MockUserService() );

  /* test services */
  testServiceLocator.set( 'IAuthorization', new MockAuthorizationService() );
  testServiceLocator.set( 'ITableHistoryService', new MockTableHistoryService() );
  testServiceLocator.set( 'ICheckListServiceType', new MockCheckListService() );
  testServiceLocator.set( 'IMarkerServiceType', new MockMarkerService() );
  testServiceLocator.set( 'IUser', new MockUserService() );

}