import { v4 as uuidV4 } from 'uuid';
import { INotificationType } from '../types/stateTypes/notificationStateType';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

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
