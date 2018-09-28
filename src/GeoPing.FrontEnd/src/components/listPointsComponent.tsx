import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { ListPointItemComponent } from './listComponents/listPointItemComponent';
import { v4 as uuidV4 } from 'uuid';
import IListPointsComponentProps from '../componentProps/listPointsComponentProps';
import { IMarker } from '../DTO/types/googleMapType';

export class ListPointsComponent extends React.Component<IListPointsComponentProps, any> {

  renderPointItem = () => {
    return this.props.markers.map ( ( point: IMarker ) => {
      return (
        <ListPointItemComponent
          key={uuidV4 ()}
          marker={point}
          selectedMarkerId={this.props.selectedMarkerId}

          editingPermission={this.props.editingPermission}
          selectMarker={this.props.selectMarker}
          putStatusMarker={this.props.putStatusMarker}
          deleteMarker={this.props.deleteMarker}
        />
      );
    } );
  };

  render() {
    return (
      <Panel
        style={{ width: '100%', height: '100%' }}
      >
        <Panel.Heading>
          Geo Points
        </Panel.Heading>
        <Panel.Body>
          {this.renderPointItem ()}
        </Panel.Body>
      </Panel>
    );
  }
}