import { loadTestData, loginMockService } from '../mockServices/loginMockService';
import IGeopingServicesType from '../../DTO/geopingServicesType';
import { loadMyCheckLists, loadTableHistoryMockService, deleteMyChecklist } from '../mockServices/dashboardMockService';
import { loadListsMockService, loadPointsMockService } from '../mockServices/checkinMockService';
import { createCheckListMockService } from '../mockServices/createCheckListMockService';
import { filterRecords, loadPublicListsMockService } from '../mockServices/publicGEOCheckListsMockService';

export const serviceTest: any = {
  'connect/token': loginMockService,

  'load_test_data': loadTestData,
  'load_history': loadTableHistoryMockService,
  'load_my_check_lists': loadMyCheckLists,
  'load_lists': loadListsMockService,
  'load_points': loadPointsMockService,
  'load_public_check_lists': loadPublicListsMockService,

  'filters_public_check_lists': filterRecords,

  'create_check_list': createCheckListMockService,

  'delete_my_check_list': deleteMyChecklist,
};

export class ServiceTest implements IGeopingServicesType {

  get( url: string ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( serviceTest[ url ]() ),
        1000
      );
    } );
  }

  post( url: string, data: any ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( serviceTest[ url ]( data ) ),
        1000
      );
    } );
  }

  put( url: string, data: any ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve(),
        1000
      );
    } );
  }

  delete( url: string, id: string ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve(),
        1000
      );
    } );
  }
}