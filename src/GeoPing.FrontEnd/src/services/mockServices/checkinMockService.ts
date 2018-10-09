export function loadListsMockService( idUser: string ): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout(
      () => {
        resolve( JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_my_check_lists );
      },
      3000
    );
  } );
}

export function loadPointsMockService( idList: string ): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout(
      () => {
        resolve(
          JSON.parse( sessionStorage.getItem( 'localDB' ) ).points.filter( ( item: any ) => item.idList === idList )
        );
      },
      1000
    );
  } );
}