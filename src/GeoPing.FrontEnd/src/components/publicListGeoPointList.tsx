import * as React from 'react';
import IPublicListGeoPointListProps from '../componentProps/publicListGeoPointListProps';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { PublicListGeoPointItem } from './publicListGeoPointItem';

export class PublicListGeoPointList extends React.Component<IPublicListGeoPointListProps, any> {
  _renderPointItem = () => {
    return this.props.googleMap.geoPoints.map( ( item, index: number ) => {
      return (
        <PublicListGeoPointItem
          key={item.id}
          geoPoint={item}
          selectedGeoPoint={this.props.googleMap.selectedGeoPoint}

          selectPoint={this.props.selectPoint}
        />
      );
    } );
  };

  render() {
    return (
      <Card>
        <CardHeader>
          Point list
        </CardHeader>
        <CardBody className="p-2 public-list-card-body-point-item">
          {this._renderPointItem()}
        </CardBody>
      </Card>
    );
  }
}