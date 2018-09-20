export function createCheckListMockService( nameCheckList: string ): Promise<any> {
  return new Promise ( ( resolve: any, reject: any ) => {
    if ( nameCheckList ) {
      resolve ( { idCheckList: 1 } );
    }
  } );
}