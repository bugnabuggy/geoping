import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { ListPointItemComponent } from './listComponents/listPointItemComponent';
import { v4 as uuidV4 } from 'uuid';
import IListPointsComponentProps from '../componentProps/listPointsComponentProps';
import IGeoPoint from '../DTO/geoPointDTO';

export class ListPointsComponent extends React.Component<IListPointsComponentProps, any> {

  renderPointItem = () => {
    return this.props.geoPoints.map( ( geoPoint: IGeoPoint ) => {
      return (
        <ListPointItemComponent
          key={uuidV4()}
          geoPoint={geoPoint}
          selectedGeoPointId={this.props.selectedGeoPointId}
          statusGeoPoint={this.props.statusGeoPoint}
          checkList={this.props.checkList}

          selectPoint={this.props.selectPoint}
          deleteGeoPoint={this.props.deleteGeoPoint}
        />
      );
    } );
  };

  render() {
    return (
      <Panel
        style={{ maxHeight: '500px', overflow: 'auto' }}
      >
        <Panel.Heading>
          Geo Points
        </Panel.Heading>
        <Panel.Body>
          {this.renderPointItem()}
        </Panel.Body>
      </Panel>
    );
  }
}
