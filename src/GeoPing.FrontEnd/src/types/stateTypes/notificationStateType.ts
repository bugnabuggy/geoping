import { EnumNotificationType } from '../../enums/notificationTypeEnum';

export default interface INotificationStateType {
  notificationList: Array<INotificationType>;
}

export interface INotificationType {
  message: string;
  id?: string;
  type: EnumNotificationType;
}