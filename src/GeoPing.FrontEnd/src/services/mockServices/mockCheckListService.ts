import ICheckListServiceType from '../../types/serviceTypes/checkListServiceType';
import IGeoListType, { IGeoListForUpdateDTO } from '../../DTO/geoListDTO';
import { v4 as uuidV4 } from 'uuid';
import { ICheckInDTO } from '../../DTO/checkInDTO';

export default class MockCheckListService implements ICheckListServiceType {
  createMyCheckList( nameCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      const newCheckList: IGeoListType = {
        name: nameCheckList,
        description: '',
        isPublic: false,
        edited: '',
        created: new Date().toString(),
        id: uuidV4(),
        ownerId: JSON.parse(sessionStorage.getItem('localDB')).ownerId,
        periodFrom: '',
        periodTo: '',
        rating: null,
      };
      setTimeout(
        () => {
          resolve( newCheckList );
        },
        1000
      );
    } );
  }

  deleteMyCheckList( idCheckLIst: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'Ok' );
    } );
  }

  loadAllMyCheckLists() {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( JSON.parse( sessionStorage.getItem( 'localDB' ) ).dashboard_my_check_lists );
        },
        1000
      );
    } );
  }

  loadMyCheckList( idCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            JSON.parse(
              sessionStorage.getItem( 'localDB' ) ).my_check_list.find( ( item: any ) => item.id === idCheckList )
          );
        },
        1000
      );
    } );
  }

  loadPublicCheckLists() {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'loadPublicCheckLists' );
    } );
  }

  updateMyCheckList( idCheckList: string, checkList: IGeoListForUpdateDTO ) {
    return new Promise( ( resolve: any, reject: any ) => {
      resolve( 'updateMyCheckList' );
    } );
  }

  updateNameMyCheckList( newNameCheckList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( newNameCheckList );
        },
        1000
      );
    } );
  }

  filterPublicCheckList(filters: any) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve( 'ds' );
        },
        1000
      );
    } );
  }

  loadUserWhoHasAccess( idList: string ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          resolve(
            JSON.parse( sessionStorage.getItem( 'localDB' ) ).users_who_has_access
              .filter( ( item: any ) => item.idList === idList )
          );
        },
        1000
      );
    } );
  }

  sharedCheckListForUser( idList: string, emails: Array<string> ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          const localDB: any = JSON.parse( sessionStorage.getItem( 'localDB' ) );
          localDB.users_who_has_access = [
            ...localDB.users_who_has_access,
            ...emails.map( ( name: any ) => {
              return {
                id: uuidV4(),
                idList: idList,
                name: name.email,
                status: 'Pending',
                invitationDate: 'date'
              };
            } )
          ];
          sessionStorage.setItem( 'localDB', JSON.stringify( localDB ) );
          resolve( localDB.users_who_has_access.filter( ( item: any ) => item.idList === idList ) );
        },
        1000
      );
    } );
  }

  providePublicAccess( idList: string, isPublic: boolean ) {
    return new Promise( ( resolve: any, reject: any ) => {
      setTimeout(
        () => {
          const localDB: any = JSON.parse( sessionStorage.getItem( 'localDB' ) );
          localDB.dashboard_my_check_lists = [
            ...localDB.dashboard_my_check_lists.map( ( item: any ) => {
              return item.id === idList ?
                {
                  ...item,
                  public: isPublic,
                }
                :
                item;
            } )
          ];
          sessionStorage.setItem('localDB', JSON.stringify(localDB));
          resolve( 'ok' );
        },
        1000
      );
    } );
  }

  addCheckIn( idList: string, idPoint: string, data: ICheckInDTO ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getAllChecksForUserAndList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getAllCheckForList( idList: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getAllNewSharedLists() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getAllAcceptedSharedLists() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  cancelAcceptanceNewSharingList() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  deleteListSharing() {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  acceptListSharingInvite( sharingId: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getAutocompletedListUsers( userName: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  getInfoAboutToken( token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

  removeToken( token: string ) {
    return new Promise<any>( ( resolve: any, reject: any ) => {
      resolve('ok');
    });
  }

}
