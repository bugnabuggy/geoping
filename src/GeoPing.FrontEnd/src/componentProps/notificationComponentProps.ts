import { INotificationType } from '../DTO/types/stateTypes/notificationStateType';
import IDispatchFunction from '../DTO/types/dispatchFunction';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export default interface INotificationComponentProps {
  notification: INotificationType;
  id: number;

  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => void;
  deleteNotification: ( idNotification: number ) => ( dispatch: IDispatchFunction ) => void;
  deleteAllNotifications: () => ( dispatch: IDispatchFunction ) => void;
}