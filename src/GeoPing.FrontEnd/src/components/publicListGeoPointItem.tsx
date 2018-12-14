import * as React from 'react';
import { Card, CardBody, CardSubtitle, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import IPublicListGeoPointItemProps from '../componentProps/publicListGeoPointItemProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class PublicListGeoPointItem extends React.Component<IPublicListGeoPointItemProps, any> {
  constructor( props: IPublicListGeoPointItemProps ) {
    super( props );
    this.state = {
      popoverOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  render() {
    return (
      <Card>
        <CardBody className="p-3">
          <CardSubtitle className="point-item-card-subtitle">
            <span>
              fsdfsd4897687657654
            </span>
            <div
              id={this.props.tempId}
              className="cursor-pointer point"
              onClick={this.toggle}
            >
              <FontAwesomeIcon icon="info-circle" className="point-item-card-info-icon"/>
            </div>
            <Popover
              isOpen={this.state.popoverOpen}
              placement="left"
              target={this.props.tempId}
              toggle={this.toggle}
            >
              <PopoverHeader>%namePoint%</PopoverHeader>
              <PopoverBody>
                <p><b>Coords:</b> 1984651 / 1654894564</p>
                <p><b>Address:</b> fffffffsdfsdddddddddddddddddddgsdfgsdf44f5d</p>
                <p><b>Radius:</b> 300</p>
                <p><b>Period:</b> 1g5fd6s4g654</p>
                <p><b>Raiting:</b> 1560</p>
                <p><b>Subscribers:</b> 446511465</p>
              </PopoverBody>
            </Popover>
          </CardSubtitle>
        </CardBody>
      </Card>
    );
  }
}