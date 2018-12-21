import * as React from 'react';
import { Card, CardBody, CardSubtitle, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import IPublicListGeoPointItemProps from '../componentProps/publicListGeoPointItemProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaultMarker } from '../constants/defaultMarker';

export class PublicListGeoPointItem extends React.Component<IPublicListGeoPointItemProps, any> {
  constructor( props: IPublicListGeoPointItemProps ) {
    super( props );
    this.state = {
      popoverOpen: false,
    };
  }

  toggle = ( e?: any ) => {
    e.stopPropagation();
    this.setState( {
      popoverOpen: !this.state.popoverOpen,
    } );
  };
  handleClick = () => {
    if ( this.props.selectedGeoPoint.id === this.props.geoPoint.id ) {
      this.props.selectPoint( defaultMarker );
    } else {
      this.props.selectPoint( this.props.geoPoint );
    }
  };

  render() {
    return (
      <Card
        className={
          `cursor-pointer
          ${this.props.selectedGeoPoint.id === this.props.geoPoint.id ? 'point-item-card-container' : ''}`
        }
        onClick={this.handleClick}
      >
        <CardBody className="p-3">
          <CardSubtitle className="point-item-card-subtitle">
            <span>
              {this.props.geoPoint.name}
            </span>
            <div
              id={`id_${this.props.geoPoint.id}`}
              className="cursor-pointer point"
              onClick={this.toggle}
            >
              <FontAwesomeIcon icon="info-circle" className="point-item-card-info-icon"/>
            </div>
            <Popover
              isOpen={this.state.popoverOpen}
              placement="left"
              target={`id_${this.props.geoPoint.id}`}
              toggle={this.toggle}
            >
              <PopoverHeader>{this.props.geoPoint.name}</PopoverHeader>
              <PopoverBody>
                <p><b>Coords:</b> {`${this.props.geoPoint.lat} / ${this.props.geoPoint.lng}`}</p>
                <p><b>Address:</b> {this.props.geoPoint.description}</p>
                <p><b>Radius:</b> {this.props.geoPoint.radius} m</p>
                {/*<p><b>Period:</b> </p>*/}
                {/*<p><b>Raiting:</b> </p>*/}
                {/*<p><b>Subscribers:</b> 446511465</p>*/}
              </PopoverBody>
            </Popover>
          </CardSubtitle>
        </CardBody>
      </Card>
    );
  }
}