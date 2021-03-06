import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ICheckListComponentProps from '../../componentProps/checkListComponentProps';
import { checkInStatistics, checkListUrl } from '../../constants/routes';
import { Card, CardBody } from 'reactstrap';

export class CheckListComponent extends React.Component<ICheckListComponentProps, any> {

  handleShowModal = ( e: any ) => {
    e.stopPropagation();
    this.props.selectCheckList( this.props.checkList );
    this.props.showModalShare( this.props.checkList.id );
  };

  handleDeleteCheckList = ( e: any ) => {
    this.props.deleteCheckList( this.props.checkList.id );
  };

  render() {
    return (
      <div className="check-list-panel-container">
        <Link
          to={checkListUrl.replace( '([a-z0-9-]+)', this.props.checkList.id )}
        >
          <Card className="check-list-panel">
            <CardBody>
              <div className="check-list-panel-item">
                <div>
                  {this.props.checkList.name}
                </div>
              </div>
            </CardBody>
          </Card>
        </Link>
        <div className="check-list-panel-link-container">
          <Link
            className="check-list-panel-item-icons cursor-pointer"
            to={checkInStatistics.replace( ':listId', this.props.checkList.id ).replace( '/:userId', '' )}
          >
            <FontAwesomeIcon icon="chart-bar" className=""/>
          </Link>
          <div
            className="check-list-panel-item-icons cursor-pointer"
            onClick={this.handleShowModal}
          >
            <FontAwesomeIcon icon="share-square"/>
          </div>
          <div
            className="check-list-panel-item-icons cursor-pointer trash-alt-icon"
            onClick={this.handleDeleteCheckList}
          >
            <FontAwesomeIcon icon="trash-alt" className=""/>
          </div>
        </div>
      </div>
    );
  }
}
