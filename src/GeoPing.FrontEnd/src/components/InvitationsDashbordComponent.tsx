import * as React from 'react';
import IInvitationsDashbordComponentProps from '../componentProps/invitationsDashbordComponentProps';
import { Card, CardBody, CardHeader } from 'reactstrap';

export class InvitationsDashbordComponent extends React.Component<IInvitationsDashbordComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        <Card className="block-new">
          <CardHeader>
            New
          </CardHeader>
          <CardBody/>
        </Card>
        <Card className="block-accepted">
          <CardHeader>
            Accepted
          </CardHeader>
          <CardBody/>
        </Card>
      </React.Fragment>
    );
  }
}
