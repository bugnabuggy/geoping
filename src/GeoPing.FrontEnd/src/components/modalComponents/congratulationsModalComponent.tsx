import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { ModalComponent } from './checklist/modalComponent';
import ICongratulationsModalComponentProps
  from '../../componentProps/modalComponentProps/congratulationsModalComponentProps';
import { StarRaiting } from '../forms/jsxComponents/starRating';

export class CongratulationsModalComponent extends React.Component<ICongratulationsModalComponentProps, any> {
  render() {
    return (
      <ModalComponent
        show={this.props.show}
        close={this.props.onClose}
        title={this.props.title}
      >
        <ControlLabel>
          You've completed %ListName% public list!
        </ControlLabel>
        <FormGroup>
          <ControlLabel>
            Please rate it:
          </ControlLabel>
          <StarRaiting/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comment:</ControlLabel>
          <FormControl
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup
          className="check-in-modal-button-container"
        >
          <Button>
            Submit
          </Button>
        </FormGroup>
      </ModalComponent>
    );
  }
}