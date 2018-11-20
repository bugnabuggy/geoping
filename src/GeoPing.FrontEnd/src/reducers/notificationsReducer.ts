import INotificationStateType from '../../GeoPing.FrontEnd/src/types/stateTypes/notificationStateType';
import { notificationState } from '../../GeoPing.FrontEnd/src/state/notificationsState';
import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATION
} from '../../GeoPing.FrontEnd/src/constantsForReducer/notification';

export default function notificationsReducer( state: INotificationStateType = notificationState, action: any ) {
  const reduceObject: any = {
    [ADD_NOTIFICATION]: addNotification,
    [DELETE_NOTIFICATION]: deleteNotification,
    [DELETE_ALL_NOTIFICATIONS]: addAllNotification,
  };

  return reduceObject.hasOwnProperty ( action.type ) ? reduceObject[action.type] ( state, action ) : state;
}

function addNotification( state: INotificationStateType, action: any ) {
  const newState: INotificationStateType = Object.assign (
    {},
    state,
    {
      notificationList: [
        ...state.notificationList,
        action.notification
      ]
    }
  );
  return newState;
}

function deleteNotification( state: INotificationStateType, action: any ) {
  const newState: any = { notificationList: [] };
  newState.notificationList = state.notificationList.filter ( ( item: any, index: number ) =>
    item.id !== action.idNotification
  );

  return newState;
}

function addAllNotification( state: INotificationStateType, action: any ) {
  const newState: INotificationStateType = Object.assign ( {}, state, { notificationList: [] } );
  return newState;
}