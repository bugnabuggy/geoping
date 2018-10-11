import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ICheckListComponentProps from '../../componentProps/checkListComponentProps';

export class CheckListComponent extends React.Component<ICheckListComponentProps, any> {

  handleShowModal = ( e: any ) => {
    this.props.showModalShare(this.props.checkList.id);
  };

  handleDeleteCheckList = ( e: any ) => {
    this.props.deleteCheckList(this.props.checkList.id);
  };

  render() {
    return (
      <React.Fragment>
        <Panel className="check-list-panel">
          <Panel.Body>
            <div className="check-list-panel-item">
              <div>
                {this.props.checkList.name}
              </div>
              <div>
                <Link
                  className="check-list-panel-item-icons cursor-pointer"
                  to={'/check_in_statistics'}
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
                  className="check-list-panel-item-icons cursor-pointer"
                  onClick={this.handleDeleteCheckList}
                >
                  <FontAwesomeIcon icon="trash-alt" className=""/>
                </div>
              </div>
            </div>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}