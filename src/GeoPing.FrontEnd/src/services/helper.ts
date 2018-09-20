import { v4 as uuidV4 } from 'uuid';
import { INotificationType } from '../DTO/types/stateTypes/notificationStateType';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export function createNotification( message: string, notificationType: EnumNotificationType ) {
  const newNotification: INotificationType = {
    message,
    type: notificationType,
    id: uuidV4 (),
  };
  return newNotification;
}