import * as React from 'react';
import { ListPointItemComponent } from './listComponents/listPointItemComponent';
import { v4 as uuidV4 } from 'uuid';
import IListPointsComponentProps from '../componentProps/listPointsComponentProps';
import IGeoPoint from '../DTO/geoPointDTO';
import { PulseLoader } from 'react-spinners';
import { Card, CardBody, CardHeader } from 'reactstrap';

export class ListPointsComponent extends React.Component<IListPointsComponentProps, any> {

  renderPointItem = () => {
    return this.props.googleMap.geoPoints.map( ( geoPoint: IGeoPoint ) => {
      return (
        <ListPointItemComponent
          key={uuidV4()}
          geoPoint={geoPoint}
          googleMap={this.props.googleMap}
          checkList={this.props.checkList}

          selectPoint={this.props.selectPoint}
          deleteGeoPoint={this.props.deleteGeoPoint}
        />
      );
    } );
  };

  render() {
    return (
      <React.Fragment>
        <Card style={{ maxHeight: '500px', overflow: 'auto' }}>
          <CardHeader tag="h3">List Geo Points</CardHeader>
          <CardBody className="p-2">
            {this.props.checkList.isGeoPointLoading ?
              (
                <div className="container-spinner-center">
                  <PulseLoader
                    sizeUnit="px"
                    size={15}
                    margin="4px"
                    color={'#a9a9a9'}
                    loading={this.props.checkList.isGeoPointLoading}
                  />
                </div>
              )
              :
              this.props.googleMap.geoPoints.length > 0 ?
                this.renderPointItem()
                :
                <div className="container-spinner-center">
                  No points
                </div>
            }
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
