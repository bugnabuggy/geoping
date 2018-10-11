import {
  buildEnvironment,
  environments,
  httpServiceLocator,
  testServiceLocator
} from '../DTO/environmentsServiceLocator';
import { EBuildEnvironment } from '../DTO/environment';
import TableHistoryService from './httpServices/tableHistoryService';
import HttpCommunicator from './httpService';
import StaticStorage from './staticStorage';
import MockTableHistoryService from './mockServices/mockTableHistoryService';
import MockAuthorizationService from './mockServices/mockAuthorizationService';
import MockCheckListService from './mockServices/mockCheckListService';
import MockMarkerService from './mockServices/mockMarkerService';
import ITableHistoryService from '../DTO/tableHistoryServiceType';
import AuthorizationService from './httpServices/authorizationService';
import CheckListService from './httpServices/checkListService';
import MockUserService from './mockServices/mockUserService';
import MarkerService from './httpServices/markerService';

export function configurationDependencyInjerction() {

  environments.set( EBuildEnvironment.Test, testServiceLocator );
  environments.set( EBuildEnvironment.HTTP, httpServiceLocator );

  StaticStorage.serviceLocator = environments.get( buildEnvironment );

  /* http services */
  httpServiceLocator.set( 'IHttpCommunicator', new HttpCommunicator() );
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