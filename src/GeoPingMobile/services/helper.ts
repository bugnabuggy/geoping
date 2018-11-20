import { v4 as uuidV4 } from 'uuid';
import { INotificationType } from '../types/stateTypes/notificationStateType';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import {
  adminAllCheckLists,
  adminAllUsersUrl,
  adminDashboardUrl,
  adminPrefixUrl,
  checkInStatistics,
  checkInUrl,
  checkListUrl,
  dashboardUrl,
  profileUrl,
} from '../constants/routes';

export function createNotification( message: string, notificationType: EnumNotificationType ) {
  const newNotification: INotificationType = {
    message,
    type: notificationType,
    id: uuidV4(),
  };
  return newNotification;
}

export function sortAsc( itemOne: any, itemTwo: any ) {
  if ( itemOne < itemTwo ) {
    return -1;
  } else if ( itemOne === itemTwo ) {
    return 0;
  }

  return 1;
}

export function sortDesc( itemOne: any, itemTwo: any ) {
  if ( itemOne > itemTwo ) {
    return -1;
  } else if ( itemOne === itemTwo ) {
    return 0;
  }

  return 1;
}

export function checkLocation( location: string, callbackRedirect: any ) {
  const authorizedPath: Array<string | RegExp> = [
    dashboardUrl,
    profileUrl,
    checkListUrl,
    checkInUrl,
    checkInStatistics,
    adminPrefixUrl,
    adminDashboardUrl,
    adminAllUsersUrl,
    adminAllCheckLists
  ];
  const redirect: any = authorizedPath.find( ( path: string ) => {
    const reg: RegExp = new RegExp( `${path.replace( /:\w+/g, '[a-z0-9-]+' )}`, 'g' );
    return reg.test( location );
  } );

  if ( redirect ) {
    sessionStorage.setItem( 'url_for_redirect', location );
    callbackRedirect( true );
  }
}
