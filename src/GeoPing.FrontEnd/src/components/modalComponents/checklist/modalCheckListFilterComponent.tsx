import * as React from 'react';
import { ModalComponent } from './modalComponent';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import IModalChecklistFilterComponentProps from '../../../componentProps/modalChecklistFilterComponentProps';

export class ModalCheckListFilterComponent extends React.Component<IModalChecklistFilterComponentProps, any> {
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
    this.props.closeFilterCheckLists();
  };

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Filter CheckLists"
          show={this.props.show}
          close={this.props.closeFilterCheckLists}
        >
          <FormGroup>
            <ControlLabel>Enter name check list</ControlLabel>
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
              onClick={this.props.closeFilterCheckLists}
            >
              Cancel
            </Button>
          </div>
        </ModalComponent>
      </React.Fragment>
    );
  }
}