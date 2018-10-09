import IGeopingServicesType from '../../DTO/geopingServicesType';

export const serviceQa: any = {};

export class ServiceQa implements IGeopingServicesType {
  delete( url: string, id: string ): Promise<any> {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

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

}