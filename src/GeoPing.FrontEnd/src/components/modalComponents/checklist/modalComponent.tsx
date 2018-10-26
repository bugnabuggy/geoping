import * as React from 'react';

import IModalComponentProps from '../../../componentProps/modalComponentProps/modalComponentProps';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export class ModalComponent extends React.Component<IModalComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.show}
        >
          <ModalHeader toggle={this.props.close}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          {/*<ModalFooter>*/}
          {/**/}
          {/*</ModalFooter>*/}
        </Modal>
      </React.Fragment>
    );
  }
}