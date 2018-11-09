import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import ICheckListLinkComponent from '../componentProps/checkListLinkComponentProps';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { EnumStatusMarker } from '../enums/statusMarker';

export class CheckListLinkComponent extends React.Component<ICheckListLinkComponent, any> {
  idNotification: any;

  handleNewPoint = () => {
    this.idNotification = this.props.addNotification(
      'Click on the place on the map where you want to set the point or click cancel',
      EnumNotificationType.Primary
    );
    this.props.permissionAdd( true );
  };

  handleCheckGeoPoisition = () => {
    this.props.addNewPointForMyGeoPosition( true );
  };

  handleCancelAddNewPoint = ( e: any ) => {
    e.stopPropagation();

    this.props.permissionAdd( false );
    this.props.deleteNotification( this.idNotification );
  };

  componentDidUpdate( prevProps: ICheckListLinkComponent ) {
    if ( this.idNotification && !this.props.googleMap.isAddMarker ) {
      this.props.deleteNotification( this.idNotification );
      this.idNotification = null;
    }
  }

  render() {
    const disableAddPoint: boolean =
      this.props.googleMap.isAddMarker ||
      ( this.props.googleMap.statusMarker === EnumStatusMarker.Edit ||
        this.props.googleMap.statusMarker === EnumStatusMarker.New );

    const disableCheckGEOPosition: boolean =
      this.props.googleMap.isAddMarker ||
      ( this.props.googleMap.statusMarker === EnumStatusMarker.Edit ||
        this.props.googleMap.statusMarker === EnumStatusMarker.New ) ||
      !this.props.googleMap.position.isSuccess;

    return (
      <React.Fragment>
        <div
          className={` check-list-add-new-point`}
        >
          <div
            id="new"
            className={`icon-hover-color cursor-pointer ${ disableAddPoint && ' disabled-link '}`}
            onClick={this.handleNewPoint}
          >
            <FontAwesomeIcon icon="plus-circle"/>
          </div>
          <Link
            id="new"
            to="#"
            className={` ${ disableAddPoint && ' disabled-link '} `}
            onClick={this.handleNewPoint}
          >
            <span>
              add new point
            </span>
          </Link>
          {this.props.googleMap.isAddMarker && (
            <Link
              to="#"
              className="check-list-cancel-new-point cursor-pointer"
              onClick={this.handleCancelAddNewPoint}
            >
              cancel
            </Link>
          )}
        </div>
        <div
          className={` check-list-check-geo-position ${ disableCheckGEOPosition && ' disabled-link ' }`}
        >
          <div
            id="check"
            className="icon-hover-color cursor-pointer"
            onClick={this.handleCheckGeoPoisition}
          >
            <FontAwesomeIcon icon="globe-africa"/>
          </div>
          <Link
            id="check"
            to="#"
            className={`${ disableCheckGEOPosition && ' disabled-link ' }`}
            onClick={this.handleCheckGeoPoisition}
          >
            <span>
              put a point on the position
            </span>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
