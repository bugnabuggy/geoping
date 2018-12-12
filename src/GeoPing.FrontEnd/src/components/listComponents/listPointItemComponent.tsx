import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IListPointItemComponentProps from '../../componentProps/listPointItemComponentProps';
import { defaultMarker } from '../../constants/defaultMarker';
import { Card, CardBody } from 'reactstrap';

export class ListPointItemComponent extends React.Component<IListPointItemComponentProps, any> {
  handleSelectPoint = () => {

    if ( this.props.geoPoint.id === this.props.googleMap.selectedGeoPoint.id ) {
      if ( !this.props.googleMap.isDataPointEditing ) {
        this.props.selectPoint( defaultMarker );
      } else {
        this.props.selectPoint( this.props.geoPoint );
      }
    } else {
      this.props.selectPoint( this.props.geoPoint );
    }
  };
  handleDeletePoint = ( e: any ) => {
    e.stopPropagation();
    this.props.deleteGeoPoint(
      this.props.geoPoint,
      this.props.googleMap.statusMarker,
      this.props.checkList.selectedGeoList.id
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card
          //   className={`
          // ${ this.props.googleMap.selectedGeoPoint.idForMap &&
          //   this.props.googleMap.selectedGeoPoint.idForMap !== this.props.geoPoint.idForMap ?
          //     ' check-list-point-item-disable ' : ''}`}
          onClick={this.handleSelectPoint}
        >
          <CardBody
            className={`check-list-point-item cursor-pointer
          ${this.props.googleMap.selectedGeoPoint.idForMap === this.props.geoPoint.idForMap &&
            'check-list-point-item-action'}
          `}
          >
            <span>{this.props.geoPoint.name}</span>
            <div className="check-list-point-item-image-container">
              <div
                className="icon-hover-color cursor-pointer trash-alt-icon"
                onClick={this.handleDeletePoint}
              >
                <FontAwesomeIcon icon="trash-alt"/>
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
