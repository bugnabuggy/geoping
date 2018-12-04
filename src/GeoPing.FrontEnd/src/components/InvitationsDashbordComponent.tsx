import * as React from 'react';
import IInvitationsDashbordComponentProps from '../componentProps/invitationsDashbordComponentProps';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { checkListUrl } from '../constants/routes';
import * as moment from 'moment';
import { PulseLoader } from 'react-spinners';

export class InvitationsDashbordComponent extends React.Component<IInvitationsDashbordComponentProps, any> {

  onAcceptList = ( shareId: string ) => {
    this.props.acceptListSharingInvite( shareId );
  };

  onCancelList = ( shareId: string ) => {
    this.props.cancelAcceptNewSharingList( shareId );
  };

  _renderNewSharedList = () => {
    return this.props.checkList.newSharedLists.map( ( item ) => {
      return (
        <Card
          key={`${item.shareId}_new`}
        >
          <CardBody className="invitations-new-lists">
          <span>
            {item.listName}
          </span>
            <div className="invitations-new-lists-images">
              <div
                className="cursor-pointer"
                onClick={() => {
                  this.onAcceptList( item.shareId );
                }}
              >
                <FontAwesomeIcon icon="check"/>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  this.onCancelList( item.shareId );
                }}
              >
                <FontAwesomeIcon icon="times"/>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    } );
  };

  _renderAcceptedSharedList = () => {
    return this.props.checkList.acceptedSharedLists.map( item => {
      const date = moment( item.shareInvitationDate ).format( 'L' );
      return (
        <React.Fragment key={`${item.shareId}_accept`}>
          <Link
            to={checkListUrl.replace( '([a-z0-9-]+)', item.listId )}
            className="invitations-accept-lists-link"
          >
            <Card>
              <CardBody className="invitations-accept-lists">
              <span>
                {item.listName}
              </span>

                <span>
                  login
                </span>
                <span>
                  {date}
                </span>
                <div
                  className="cursor-pointer invitations-accept-lists-icon-container"
                  onClick={() => {
                    this.onCancelList( item.shareId );
                  }}
                >
                  <FontAwesomeIcon icon="times"/>
                </div>

              </CardBody>
            </Card>
          </Link>
        </React.Fragment>
      );
    } );
  };

  render() {
    return (
      <React.Fragment>
        <Card className="block-new">
          <CardHeader>
            New
          </CardHeader>
          <CardBody className="p-1">
            {this.props.invitations.isNewSharingListsLoading ?
              (
                <div className="container-spinner-center">
                  <PulseLoader
                    sizeUnit="px"
                    size={15}
                    margin="4px"
                    color={'#a9a9a9'}
                    loading={this.props.invitations.isNewSharingListsLoading}
                  />
                </div>
              )
              :
              this._renderNewSharedList()
            }
          </CardBody>
        </Card>
        <Card className="block-accepted">
          <CardHeader>
            Accepted
          </CardHeader>
          <CardBody className="p-1">
            {this.props.invitations.isAcceptedSharingListsLoading ?
              (
                <div className="container-spinner-center">
                  <PulseLoader
                    sizeUnit="px"
                    size={15}
                    margin="4px"
                    color={'#a9a9a9'}
                    loading={this.props.invitations.isAcceptedSharingListsLoading}
                  />
                </div>
              )
              :
              this._renderAcceptedSharedList()}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
