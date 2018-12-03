import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IPublicCheckListItemProps from '../../componentProps/publicCheckListItemProps';
import { Card, CardBody } from 'reactstrap';

export class PublicListItem extends React.Component<IPublicCheckListItemProps, any> {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-10">
                <div>
                  <p className="list-item-name">{this.props.nameList}</p>
                </div>
                <div className="list-item-info">
                  <div className="">
                    Author: {this.props.author}
                  </div>
                  <div className="">
                    Subscribers: {this.props.subscribers.toLocaleString( 'ru' )}
                  </div>
                  <div className="">
                    Raiting: {this.props.raiting}
                    <FontAwesomeIcon icon="star" className="list-item-icon-star"/>
                  </div>
                </div>
              </div>
              <div className="list-item-icons">
                <FontAwesomeIcon icon="globe-africa" className="list-item-icon-globe cursor-pointer"/>
                <FontAwesomeIcon icon="plus-square" className="list-item-icon-plus-square cursor-pointer"/>
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}