import { INotificationType } from '../../DTO/types/stateTypes/notificationStateType';
import IDispatchFunction from '../../DTO/types/dispatchFunction';
import { EnumNotificationType } from '../../enums/notificationTypeEnum';

export default interface INotificationComponentProps {
  notification: INotificationType;
  id: number;
  countNotifications: number;

  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => void;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteAllNotifications: () => ( dispatch: IDispatchFunction ) => void;
}