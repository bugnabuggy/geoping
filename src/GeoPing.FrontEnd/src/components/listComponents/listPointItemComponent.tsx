import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IListPointItemComponentProps from '../../componentProps/listPointItemComponentProps';
import { defaultMarker } from '../../constants/defaultMarker';
import { EnumStatusMarker } from '../../DTO/types/googleMapType';

export class ListPointItemComponent extends React.Component<IListPointItemComponentProps, any> {

  handleSelectPoint = () => {
    if ( this.props.selectedMarkerId === this.props.marker.id ) {
      this.props.editingPermission ( false );
      this.props.selectMarker ( defaultMarker );
      this.props.putStatusMarker ( EnumStatusMarker.None );
    } else {
      this.props.editingPermission ( true );
      this.props.selectMarker ( this.props.marker );
      this.props.putStatusMarker ( EnumStatusMarker.Edit );
    }
  };

  handleDeletePoint = ( e: any ) => {
    e.stopPropagation();
    this.props.deleteMarker ( this.props.marker.id );
  };
  // handleEditPoint = ( e: any ) => {
  //   e.stopPropagation();
  //   this.props.editingPermission ( true );
  //   this.props.selectMarker ( this.props.marker );
  // };

  render() {
    return (
      <Panel
        onClick={this.handleSelectPoint}
      >
        <Panel.Body
          bsClass="success"
          className={`check-list-point-item
          ${ this.props.selectedMarkerId === this.props.marker.id && 'check-list-point-item-action'}
          `}
        >
          <span>{this.props.marker.name}</span>
          <div className="check-list-point-item-image-container">
            {/*<div*/}
            {/*className="icon-hover-color cursor-pointer"*/}
            {/*onClick={this.handleEditPoint}*/}
            {/*>*/}
            {/*<FontAwesomeIcon icon="pencil-alt"/>*/}
            {/*</div>*/}
            <div
              className="icon-hover-color cursor-pointer"
              onClick={this.handleDeletePoint}
            >
              <FontAwesomeIcon icon="trash-alt"/>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}