import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IPublicCheckListItemProps from '../../componentProps/publicCheckListItemProps';

export class PublicListItem extends React.Component<IPublicCheckListItemProps, any> {
  render() {
    return (
      <Panel>
        <Panel.Body>
          <div className="row">
            <div className="col-10">
              <div>
                <p className="list-item-name">{this.props.nameList}</p>
              </div>
              <div className="row list-item-info">
                <div className="col-5">
                  Author: {this.props.author}
                </div>
                <div className="col-4">
                  Subscribers: {this.props.subscribers.toLocaleString('ru')}
                </div>
                <div className="">
                  Raiting: {this.props.raiting}
                  <FontAwesomeIcon icon="star" className="list-item-icon-star"/>
                </div>
              </div>
            </div>
            <div className="col-2 list-item-icons">
              <FontAwesomeIcon icon="globe-africa" className="list-item-icon-globe cursor-pointer"/>
              <FontAwesomeIcon icon="plus-square" className="list-item-icon-plus-square cursor-pointer"/>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}