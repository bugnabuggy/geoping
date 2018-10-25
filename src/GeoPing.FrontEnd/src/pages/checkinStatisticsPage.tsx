import * as React from 'react';

import ICheckinStatisticsPageProps from '../pageProps/checkinStatisticsPageProps';
import CheckinStatisticsComponentContainer from '../componentContainers/checkinStatisticsComponentContainer';
import GoogleMapComponentContainer from '../componentContainers/googleMapComponentContainer';

export default class CheckinStatisticsPage extends React.Component<ICheckinStatisticsPageProps, any> {
  render() {
    return (
      <div className="check-in-statistics">
        <div className="check-in-statistics-container">
          <CheckinStatisticsComponentContainer />
        </div>
        <div className="">
          <GoogleMapComponentContainer />
        </div>
      </div>
    );
  }
}