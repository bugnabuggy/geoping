import * as React from 'react';

import { Modal } from 'react-bootstrap';
import IModalComponentProps from '../../../componentProps/modalComponentProps/modalComponentProps';

export class ModalComponent extends React.Component<IModalComponentProps, any> {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        {/*<Modal.Footer>*/}
          {/*<Button></Button>*/}
        {/*</Modal.Footer>*/}
      </Modal>
    );
  }
}