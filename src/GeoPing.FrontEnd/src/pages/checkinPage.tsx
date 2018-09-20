import * as React from 'react';
import { ICheckinPageProps } from '../componentProps/checkinPageProps';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';

export default class CheckinPage extends React.Component<ICheckinPageProps, any> {

  render() {
    return (
      <div className="checkin-container">
        <div className="checkin-form">
          Checkin
        </div>
        <div className="checkin-map">
          <GoogleMapComponentContainer />
        </div>
      </div>
    );
  }
}
