import * as React from 'react';
import IModalFramePaymentsComponentProps
  from '../../componentProps/modalComponentProps/modalFramePaymentsComponentProps';
import { ModalComponent } from './checklist/modalComponent';

export class ModalFramePaymentsComponent extends React.Component<IModalFramePaymentsComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        {/*<ModalComponent*/}
          {/*title="Payment"*/}
          {/*show={!!this.props.link}*/}
          {/*close={() => {*/}
          {/*}}*/}
        {/*>*/}
          <iframe src={this.props.link}/>
        {/*</ModalComponent>*/}
      </React.Fragment>
    );
  }
}