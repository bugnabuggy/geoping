import * as React from 'react';
import { ICheckinPageProps } from '../componentProps/checkinPageProps';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';

export default class CheckinPage extends React.Component<ICheckinPageProps, any> {

  render() {
    return (
      <React.Fragment>
        <div className="col-6">
          Checkin
        </div>
        <div className="col-6">
          <GoogleMapComponentContainer />
        </div>
      </React.Fragment>
    );
  }
}
