import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import INotificationComponentContainerProps from '../componentProps/notificationComponentContainerProps';
import { NotificationsBlockComponent } from '../components/notificationsBlockComponent';
import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { addNotification, deleteAllNotifications, deleteNotification } from '../actions/notificationsAction';

class NotificationComponentContainer extends React.Component<INotificationComponentContainerProps, any> {
  render() {
    return (
      <div className="notification-container">
        <NotificationsBlockComponent
          notifications={this.props.notificationsList}

          addNotification={this.props.addNotification}
          deleteNotification={this.props.deleteNotification}
          deleteAllNotifications={this.props.deleteAllNotifications}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    notificationsList: state.notifications.notificationList,
  };
};

const mapDispatchToProps = ( dispath: any ) =>
  bindActionCreators(
    {
      addNotification,
      deleteNotification,
      deleteAllNotifications,
    },
    dispath );

export default connect( mapStateToProps, mapDispatchToProps )( NotificationComponentContainer );