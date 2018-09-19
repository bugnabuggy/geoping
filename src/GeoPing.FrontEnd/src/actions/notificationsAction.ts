import IDispatchFunction from '../DTO/types/dispatchFunction';
import { INotificationType } from '../DTO/types/stateTypes/notificationStateType';
import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATION
} from '../DTO/constantsForReducer/notification';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export const addNotification = ( message: string, typeNotification: EnumNotificationType ) =>
  ( dispatch: IDispatchFunction ) => {
    dispatch ( addNotificationAction ( createNotification ( message, typeNotification ) ) );
  };

export const deleteNotification = ( idNotification: number ) => ( dispatch: IDispatchFunction ) => {

  dispatch ( deleteNotificationAction ( idNotification ) );
};

export const deleteAllNotifications = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( deleteAllNotificationsAction () );
};

/* Actions */
export function addNotificationAction( notification: INotificationType ): Object {
  return { type: ADD_NOTIFICATION, notification };
}

function deleteNotificationAction( idNotification: number ): Object {
  return { type: DELETE_NOTIFICATION, idNotification };
}

function deleteAllNotificationsAction(): Object {
  return { type: DELETE_ALL_NOTIFICATIONS };
}