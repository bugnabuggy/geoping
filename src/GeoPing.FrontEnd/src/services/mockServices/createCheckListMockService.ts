import { v4 as uuidV4 } from 'uuid';

export function createCheckListMockService( nameCheckList: string ): Promise<any> {
  return new Promise( ( resolve: any, reject: any ) => {
    if ( nameCheckList ) {
      const localDB: any = JSON.parse( sessionStorage.getItem( 'localDB' ) );
      const newCheckLIst: any = {
        id: uuidV4(),
        name: nameCheckList,
      };
      sessionStorage.setItem( 'localDB', JSON.stringify(
        {
          ...localDB,
          check_list: newCheckLIst,
        }
      ) );
      resolve( newCheckLIst );
    }
  } );
}