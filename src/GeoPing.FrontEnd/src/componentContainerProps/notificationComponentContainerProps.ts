import { INotificationType } from '../types/stateTypes/notificationStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export default interface INotificationComponentContainerProps {
  notificationsList: Array<INotificationType>;

  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => void;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteAllNotifications: () => ( dispatch: IDispatchFunction ) => void;
}