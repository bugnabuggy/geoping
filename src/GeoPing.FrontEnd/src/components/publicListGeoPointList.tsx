import * as React from 'react';
import IPublicListGeoPointListProps from '../componentProps/publicListGeoPointListProps';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { PublicListGeoPointItem } from './publicListGeoPointItem';

export class PublicListGeoPointList extends React.Component<IPublicListGeoPointListProps, any> {
  _renderPointItem = () => {
    const temp: any = [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ];
    return temp.map( ( item: any, index: number ) => {
      return (
        <PublicListGeoPointItem
          key={index}
          tempId={`temp_${index}`}
        />
      );
    } );
  };

  render() {
    return (
      <Card>
        <CardHeader>
          PointList
        </CardHeader>
        <CardBody className="p-2 public-list-card-body-point-item">
          {this._renderPointItem()}
        </CardBody>
      </Card>
    );
  }
}