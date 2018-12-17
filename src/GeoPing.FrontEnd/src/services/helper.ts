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
  loginUrl,
  profileUrl,
} from '../constants/routes';
import { ETimer } from '../enums/timerEnum';
import * as moment from 'moment';

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

export function getDataFromResponse( response: any ) {
  if ( response.hasOwnProperty( 'data' ) ) {
    const data: any = response.data;
    if ( data.hasOwnProperty( 'data' ) ) {
      return data.data;
    } else {
      return data;
    }
  } else {
    return response;
  }
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
    callbackRedirect( loginUrl );
  }
}

export function timer( functions: any ) {
  let count: number = 3;
  const intervalId = setInterval(
    () => {
      functions.timerAccount( count );
      if ( !count ) {
        clearInterval( intervalId );
        functions.setTimer( ETimer.Stop );
      }
      count -= 1;
    },
    1000 );
}

export function dateTypeDefinition( listId: string ) {
  if ( listId === 'none' ) {
    return {
      typeDate: 'weeks',
      count: 2,
    };
  } else {
    return {
      typeDate: 'day',
      count: 1,
    };
  }
}

export function dateFormatter( date: moment.Moment ) {
  // debugger
  // console.log(date.utc());
  // return `${date.year()}-${date.month() + 1}-${date.date()}T${date.hours()}:${date.minutes()}:${date.seconds()}Z`;
  return date.utc().startOf('day').format();
}
