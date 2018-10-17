import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IListPointItemComponentProps from '../../componentProps/listPointItemComponentProps';
import { defaultMarker } from '../../constants/defaultMarker';

export class ListPointItemComponent extends React.Component<IListPointItemComponentProps, any> {

  handleSelectPoint = () => {
    if ( this.props.geoPoint.id === this.props.selectedGeoPointId ) {
      this.props.selectPoint( defaultMarker );
    } else {
      this.props.selectPoint( this.props.geoPoint );
    }
  };

  handleDeletePoint = ( e: any ) => {
    e.stopPropagation();
    this.props.deleteGeoPoint( this.props.geoPoint.id, this.props.statusGeoPoint, this.props.checkList.id );
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
          className={`check-list-point-item cursor-pointer
          ${ this.props.selectedGeoPointId === this.props.geoPoint.id && 'check-list-point-item-action'}
          `}
        >
          <span>{this.props.geoPoint.name}</span>
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
