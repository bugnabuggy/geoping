import * as React from 'react';
import INotificationPersonalInformationTrackingComponentProps
  from '../componentProps/notificationPersonalInformationTrackingComponentProps';
import { Button } from 'reactstrap';

export class NotificationPersonalInformationTrackingComponent
  extends React.Component<INotificationPersonalInformationTrackingComponentProps,
    any> {
  handleAccept = () => {
    localStorage.setItem( 'personal_information', 'true' );
    this.props.changeShowNotificationInfo();
    location.reload();
  };
  handleDecline = () => {
    localStorage.setItem( 'personal_information', 'false' );
    this.props.changeShowNotificationInfo();
  };

  render() {
    return (
      <div className="notification-personal-information-container">
        <p>
          This website stores cookies on your computer.
          These cookies are used to collect information about how you interact with our website
          and allow us to remember you.
          We use this information in order to improve and customize your browsing experience and
          for analytics and metrics about our visitors both on this website and other media.
          To find out more about the cookies we use, see our Privacy Policy.
        </p>

        <p>
          If you decline, your information won’t be tracked when you visit this website.
          A single cookie will be used in your browser to remember your preference not to be tracked.
        </p>
        <div className="notification-personal-information-button-container">
          <Button
            color="primary"
            onClick={this.handleAccept}
          >
            Accept
          </Button>
          <Button
            outline={true}
            color="primary"
            onClick={this.handleDecline}
          >
            Decline
          </Button>
        </div>
      </div>
    );
  }
}