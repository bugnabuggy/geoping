export function dashboardFiltersMockService( filterName: string ): Promise<any> {
  return new Promise ( ( resolve: any, reject: any ) => {
    if ( filterName === 'filterHistory') {
      resolve ( { isFiltered: true } );
    }
    if ( filterName === 'filterCheckLists') {
      resolve ( { isFiltered: true } );
    }
    if ( filterName === 'filterInvitations') {
      resolve ( { isFiltered: true } );
    }
  } );
}