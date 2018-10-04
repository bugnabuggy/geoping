import { v4 as uuidV4 } from 'uuid';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export function createNotification( message: string, notificationType: EnumNotificationType ) {
  return {
    message,
    type: notificationType,
    id: uuidV4(),
  };
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