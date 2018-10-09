export function loadPublicListsMockService(): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout(
      () => {
        resolve(
          JSON.parse( sessionStorage.getItem( 'localDB' ) ).public_check_lists
        );
      },
      1000
    );
  } );
}

export function filterRecords( filterData: any ): Promise<any> {
  return new Promise<any>( ( resolve: any, reject: any ) => {
    setTimeout(
      () => {
        const records: any = JSON.parse( sessionStorage.getItem( 'localDB' ) ).public_check_lists;
        resolve(
          records.filter( ( item: any ) => {

            if ( filterData.subscribers && item.subscribers <= filterData.subscribers ) {
                return;
            }

            if ( filterData.name && item.nameList !== filterData.name ) {
                return;
            }

            if ( filterData.user && item.author !== filterData.user ) {
                return;
            }

            return item;
          } )
        );
      },
      1000
    );
  } );
}