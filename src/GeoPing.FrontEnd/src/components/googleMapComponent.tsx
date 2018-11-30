import * as React from 'react';

import GoogleMap from './forms/jsxComponents/googleMap';
import IGoogleMapComponentProps from '../componentProps/googleMapComponentProps/googleMapComponentProps';
import { Button } from 'reactstrap';

export default class GoogleMapComponent extends React.Component<IGoogleMapComponentProps, any> {

  render() {
    const componentGoogleMap: any = (
      <GoogleMap
        isCheckIn={this.props.isCheckIn}
        checkList={this.props.checkList}
        selectedListId={this.props.selectedListId}
        googleMap={this.props.googleMap}
        checkInStatistics={this.props.checkInStatistics}

        selectPoint={this.props.selectPoint}
        addNewPoint={this.props.addNewPoint}
        permissionAdd={this.props.permissionAdd}
        editingPermission={this.props.editingPermission}
        changeMovingGeoPoint={this.props.changeMovingGeoPoint}
        deleteGeoPoint={this.props.deleteGeoPoint}
        addNewPointForMyGeoPosition={this.props.addNewPointForMyGeoPosition}
        geoPointListIsCreate={this.props.geoPointListIsCreate}
        addDistance={this.props.addDistance}
        getMyAddress={this.props.getMyAddress}
        setAddressGeoPoint={this.props.setAddressGeoPoint}
      />
    );

    return (
      <React.Fragment>
        {this.props.googleMap.position.isSuccess ?
          componentGoogleMap
          :
          this.props.checkList.isCheckList ?
            componentGoogleMap
            :
            ( <div className="denied_geo_location">
              Please allow the browser to determine your location.
              <Button
                color="primary"
                onClick={this.props.findGeoPosition}
              >
                Allow
              </Button>
            </div> )}
      </React.Fragment>
    );
  }
}
