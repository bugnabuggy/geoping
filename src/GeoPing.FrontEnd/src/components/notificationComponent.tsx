import * as React from 'react';
import INotificationComponentProps from '../componentProps/notificationComponentProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';

export class NotificationComponent extends React.Component<INotificationComponentProps, any> {
  private idDismissAll: string = 'dismissAll';
  private timer: any = null;

  constructor( props: INotificationComponentProps ) {
    super ( props );
  }

  componentDidMount() {
    if ( this.props.notification.type === EnumNotificationType.Info ||
      this.props.notification.type === EnumNotificationType.Success ) {
      this.timer = setTimeout ( this.deleteNotification, 5000, this.props.notification.id );
    }
  }

  deleteNotification = ( notification: any ) => {
    this.props.deleteNotification ( notification );
    clearTimeout ( this.timer );
  };

  handleClick = ( e: any ) => {
    if ( e.target.id === this.idDismissAll ) {
      this.props.deleteAllNotifications ();
    } else {

      this.props.deleteNotification ( e.target.id.replace ( /dismiss_/, '' ) );
    }
  };

  render() {
    return (
      <div className={`notification`}>
        <div className={`alert alert-${this.props.notification.type} notification-alert`}>
          <span>{this.props.notification.message}</span>
          <div className="notification-dismiss">
            <Link
              id={`dismiss_${this.props.notification.id}`}
              to="#"
              className="cursor-pointer notification-link"
              onClick={this.handleClick}
            >
              <FontAwesomeIcon icon="times" className="notification-dismiss-icon"/>
              dismiss
            </Link>
            {this.props.id === 0 && this.props.countNotifications > 1 && (
              <Link
                id="dismissAll"
                to="#"
                className="cursor-pointer notification-link"
                onClick={this.handleClick}
              >
                <FontAwesomeIcon icon="times" className="notification-dismiss-icon"/>
                dismiss All
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}