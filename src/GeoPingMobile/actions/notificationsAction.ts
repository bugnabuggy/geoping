import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { INotificationType } from '../types/stateTypes/notificationStateType';
import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATION
} from '../constantsForReducer/notification';
import { createNotification } from '../services/helper';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export const addNotification = ( message: string, typeNotification: EnumNotificationType ) =>
  ( dispatch: IDispatchFunction ) => {
    const notification: any = createNotification ( message, typeNotification );
    dispatch ( addNotificationAction ( notification ) );
    return notification.id;
};

export const deleteNotification = ( idNotification: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( deleteNotificationAction ( idNotification ) );
};

export const deleteAllNotifications = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( deleteAllNotificationsAction () );
};

/* Actions */
export function addNotificationAction( notification: INotificationType ): Object {
  return { type: ADD_NOTIFICATION, notification };
}

function deleteNotificationAction( idNotification: string ): Object {
  return { type: DELETE_NOTIFICATION, idNotification };
}

function deleteAllNotificationsAction(): Object {
  return { type: DELETE_ALL_NOTIFICATIONS };
}