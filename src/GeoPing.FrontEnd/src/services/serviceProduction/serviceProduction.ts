export const serviceProduction: any = {};

export class ServiceProduction {
  get() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  post() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  update() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }

  delete() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => resolve( '' ),
        1000
      );
    } );
  }
}