import * as React from 'react';
import IInvitationsDashbordComponentProps from '../componentProps/invitationsDashbordComponentProps';

export class InvitationsDashbordComponent extends React.Component<IInvitationsDashbordComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        <div className="block-new">
          <span>New</span>
          <div></div>
        </div>
        <div className="block-accepted">
          <span>Accepted</span>
          <div ></div>
        </div>
      </React.Fragment>
    );
  }
}