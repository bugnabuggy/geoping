import * as React from 'react';
import { ModalComponent } from './modalComponent';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import IModalChecklistComponentProps from '../../../componentProps/modalComponentProps/modalChecklistComponentProps';

export class ModalChecklistComponent extends React.Component<IModalChecklistComponentProps, any> {
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

  createCheckList = () => {
    this.props.createCheckList ( this.state.nameCheckList );
    this.props.closeModalForCreateCheckList();
  };

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Create check list"
          show={this.props.showModal}
          close={this.props.closeModalForCreateCheckList}
        >
          <FormGroup>
            <ControlLabel>Enter name check list</ControlLabel>
            <FormControl
              onChange={this.handleChange}
            />
          </FormGroup>
          <div className="check-list-modal-buttons">
            <Button
              onClick={this.createCheckList}
            >
              Create
            </Button>
            <Button
              onClick={this.props.closeModalForCreateCheckList}
            >
              Cancel
            </Button>
          </div>
        </ModalComponent>
      </React.Fragment>
    );
  }
}