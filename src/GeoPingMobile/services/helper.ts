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
import { Dimensions } from "react-native";
import moment from 'moment';

export function createNotification( message: string, notificationType: EnumNotificationType ) {
  const newNotification: INotificationType = {
    message,
    type: notificationType,
    id: uuidV4 (),
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
  const redirect: any = authorizedPath.find ( ( path: string ) => {
    const reg: RegExp = new RegExp ( `${path.replace ( /:\w+/g, '[a-z0-9-]+' )}`, 'g' );
    return reg.test ( location );
  } );

  if ( redirect ) {
    sessionStorage.setItem ( 'url_for_redirect', location );
    callbackRedirect ( true );
  }
}

export function getDataFromResponse( response: any ) {
  if ( response.hasOwnProperty ( 'data' ) ) {
    const data: any = response.data;
    if ( data.hasOwnProperty ( 'data' ) ) {
      return data.data;
    } else {
      return data;
    }
  } else {
    return response;
  }
}

export function getOrientation() {
  const windowHeight: number = Dimensions.get ( 'window' ).height;
  const windowWidth: number = Dimensions.get ( 'window' ).width;
  if ( windowWidth < windowHeight ) {
    return 'portrait'
  } else {
    return 'landscape'
  }
}

export function getWindowWidthAndHeight() {
  return {
    height: Dimensions.get ( 'window' ).height,
    width: Dimensions.get ( 'window' ).width,
  };
}

export function dateFormat( date: Date ) {
  const newDate: moment.Moment = moment();
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}

/**********************************************************************/
export function testData( index: number ) {
  const data: Array<{ id: string, name: string }> = [];
  for ( let i = 1; i <= index; i++ ) {
    data.push ( {
      id: uuidV4 (),
      name: `Test ${i}`,
    } )
  }
  return data
};

export const keyExtractor = ( item: any, index: any ) => item.id;