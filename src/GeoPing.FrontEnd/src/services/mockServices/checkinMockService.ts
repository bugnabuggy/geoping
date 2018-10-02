import { lists, points } from '../../mocks/checkinMock/lists';

export function loadListsMockService(): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout( () => resolve( lists ), 3000 );
  } );
}

export function loadPointsMockService( idList: string ): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout( () => resolve( points.filter( item => item.idList === idList ) ), 1000 );
  } );
}