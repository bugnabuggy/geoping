import { INotificationType } from '../DTO/types/stateTypes/notificationStateType';
import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export default interface INotificationComponentContainerProps {
  notificationsList: Array<INotificationType>;

  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => void;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteAllNotifications: () => ( dispatch: IDispatchFunction ) => void;
}