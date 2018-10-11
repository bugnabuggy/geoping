import * as React from 'react';

import { ModalComponent } from './checklist/modalComponent';
import IinvitationsFilterComponentProps from '../../componentProps/invitationsFilterComponentProps';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export class ModalInvitationsFilterComponent extends React.Component<IinvitationsFilterComponentProps, any> {
  constructor( props: any ) {
    super ( props );
    this.state = {
      nameCheckList: '',
    };
  }

  handleChange = ( e: any ) => {
    this.setState ( {
      nameCheckList: e.target.value,
    } );
  };

  filterCheckList = () => {
    this.props.closeFilterInvitations();
  };

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Filter invitations"
          show={this.props.show}
          close={this.props.closeFilterInvitations}
        >
          <FormGroup>
            <ControlLabel>Enter invitation name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
            />
          </FormGroup>
          <div className="check-list-modal-buttons">
            <Button
              onClick={this.filterCheckList}
            >
              Filter
            </Button>
            <Button
              onClick={this.props.closeFilterInvitations}
            >
              Cancel
            </Button>
          </div>
        </ModalComponent>
      </React.Fragment>
    );
  }
}