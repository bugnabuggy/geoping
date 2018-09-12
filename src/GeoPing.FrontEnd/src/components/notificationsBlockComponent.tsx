import * as React from 'react';

import INotificationsBlockComponentProps from '../componentProps/notificationsBlockComponentProps';
import { NotificationComponent } from './notificationComponent';
import { INotificationType } from '../DTO/types/stateTypes/notificationStateType';

export class NotificationsBlockComponent extends React.Component<INotificationsBlockComponentProps, any> {

  renderNotifications = () => {
    const notifications: Array<any> = this.props.notifications.map ( ( item: INotificationType, index: number ) => {
      return (
        <NotificationComponent
          key={index}
          notification={item}
          id={index}

          addNotification={this.props.addNotification}
          deleteNotification={this.props.deleteNotification}
          deleteAllNotifications={this.props.deleteAllNotifications}
        />
      );
    } );

    return notifications;
  };

  render() {
    return this.renderNotifications ();
  }
}