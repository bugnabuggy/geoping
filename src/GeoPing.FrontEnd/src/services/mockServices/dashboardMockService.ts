export function loadTableHistoryMockService() {
  return JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_history_table;
}

export function loadMyCheckLists() {
  return JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_my_check_lists;
}

export function deleteMyChecklist( idCheckList: string ) {
  return new Promise( ( resolve, reject ) => {
    const localDB: any = JSON.parse( sessionStorage.getItem( 'localDB' ) );
    const myCheckLists: any = localDB.dashboard_my_check_lists
      .filter( ( item: any ) => item.id !== idCheckList );
    sessionStorage.setItem( 'localDB', JSON.stringify(
      {
        ...localDB,
        dashboard_my_check_lists: myCheckLists,
      }
    ) );
    setTimeout(
      () => resolve( idCheckList ),
      1000
    );
  } );
}