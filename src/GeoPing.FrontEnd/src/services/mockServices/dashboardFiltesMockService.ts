export function dashboardFiltersMockService( filterName: string ): Promise<any> {
  return new Promise ( ( resolve: any, reject: any ) => {
    if ( filterName === 'filterHistory') {
      resolve ( { isFiltered: true } );
    }
  } );
}