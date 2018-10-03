import { lists, points, users } from '../../mocks/checkinStatisticsMock';

export function loadListsService() {
  return new Promise( ( resolve, reject ) => {
    setTimeout(
      () => resolve( lists ),
      1000
    );
  } );
}

export function loadUsersService( idList: string ) {
  return new Promise( ( resolve, reject ) => {
    // console.log( users.filter( ( item: any ) => item.idList === idList ) );
    setTimeout(
      () => resolve( users.filter( ( item: any ) => item.idList === idList ) ),
      1000
    );
  } );
}

export function loadPointsService( idList: string, idUser: string ) {
  return new Promise( ( resolve, reject ) => {
    setTimeout(
      () => resolve( points.filter( ( item: any ) => item.idList === idList && item.idUser === idUser ) ),
      1000
    );
  } );
}