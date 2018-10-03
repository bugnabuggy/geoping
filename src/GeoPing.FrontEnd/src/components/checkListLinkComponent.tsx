import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import ICheckListLinkComponent from '../componentProps/checkListLinkComponentProps';
import { EnumNotificationType } from '../DTO/enums/notificationTypeEnum';
import { EnumStatusMarker } from '../DTO/types/googleMapType';

export class CheckListLinkComponent extends React.Component<ICheckListLinkComponent, any> {
  idNotification: any;

  handleNewPoint = () => {
    this.props.permissionToAddMarker ( true );
    this.props.putStatusMarker ( EnumStatusMarker.New );
    this.idNotification = this.props.addNotification (
      'Click on the place on the map where you want to set the point or click cancel',
      EnumNotificationType.Primary
    );
  };

  handleCheckGeoPoisition = () => {
    this.props.editingPermission ( true );
    this.props.markerInstalled ( true );
    this.props.permissionToAddMarker ( false );
    this.props.checkGEOPosition ();
    this.props.putStatusMarker ( EnumStatusMarker.New );
    this.props.deleteNotification ( this.idNotification );
  };

  handleCancelAddNewPoint = ( e: any ) => {
    e.stopPropagation ();
    this.props.permissionToAddMarker ( false );
    this.props.cancelAddNewPoint ();
    this.props.deleteNotification ( this.idNotification );
    this.props.putStatusMarker ( EnumStatusMarker.None );
  };

  componentDidUpdate( prevProps: ICheckListLinkComponent ) {
    if ( this.idNotification && !this.props.isAddMarker ) {
      this.props.deleteNotification ( this.idNotification );
      this.idNotification = null;
    }
  }

  render() {
    const disableAddPoint: boolean =
      this.props.isAddMarker ||
      ( this.props.isMarkerInstalled && ( !this.props.isMarkerSaved || !this.props.isMarkerCanceled ) ) ||
      this.props.statusMarker === EnumStatusMarker.Edit;
    const disableCheckGEOPosition: boolean =
      ( this.props.isCheckGeoPosition || this.props.statusMarker === EnumStatusMarker.Edit );

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
          {this.props.isAddMarker && (
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
              check geo position
            </span>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}