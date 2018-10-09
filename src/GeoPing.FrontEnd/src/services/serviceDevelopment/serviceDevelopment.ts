import { loginMockService } from '../mockServices/loginMockService';
import IGeopingServicesType from '../../DTO/geopingServicesType';

export const serviceDevelopment: any = {
  'connect/token': loginMockService,
};

export class ServiceDevelopment implements IGeopingServicesType {

  get( url: string ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  post( url: string, data: any ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  put( url: string, data: any ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  delete( url: string, id: string ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }
}