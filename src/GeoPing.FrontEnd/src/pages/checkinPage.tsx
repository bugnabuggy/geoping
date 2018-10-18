import * as React from 'react';

import { ICheckinPageProps } from '../pageProps/checkinPageProps';
import CheckinComponentContainer from '../componentContainers/checkinComponentContainer';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';
// import { YandexMapComponent } from '../components/yandexMapComponent';

export default class CheckinPage extends React.Component<ICheckinPageProps, any> {

  render() {
    return (
      <div className="checkin-container">
        <div className="checkin-form">
          <CheckinComponentContainer/>
        </div>
        <div className="checkin-map">
          <GoogleMapComponentContainer />
          {/*<YandexMapComponent/>*/}
        </div>
      </div>
    );
  }
}
