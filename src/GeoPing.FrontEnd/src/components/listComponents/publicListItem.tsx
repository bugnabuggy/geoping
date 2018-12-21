import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import IPublicCheckListItemProps from '../../componentProps/publicCheckListItemProps';
import { publicCheckListInfoUrl } from '../../constants/routes';

export class PublicListItem extends React.Component<IPublicCheckListItemProps, any> {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-10">
                <div>
                  <p className="list-item-name">{this.props.point.name}</p>
                </div>
                <div className="list-item-info">
                  <div className="">
                    Author: {this.props.point.ownerName}
                  </div>
                  <div className="">
                    Subscribers: {this.props.point.subscribersNumber.toLocaleString( 'ru' )}
                  </div>
                  <div className="">
                    Raiting: {this.props.point.rating}
                    <FontAwesomeIcon icon="star" className="list-item-icon-star"/>
                  </div>
                </div>
              </div>
              <div className="list-item-icons">
                <Link to={publicCheckListInfoUrl.replace( ':listId', this.props.point.id )}>
                  <FontAwesomeIcon icon="globe-africa" className="list-item-icon-globe cursor-pointer"/>
                </Link>
                <div>
                  <FontAwesomeIcon icon="plus-square" className="list-item-icon-plus-square cursor-pointer"/>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}