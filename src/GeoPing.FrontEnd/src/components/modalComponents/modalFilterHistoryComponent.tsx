import * as React from 'react';
import IModalFilterHistoryComponentProps from '../../componentProps/modalFilterHistoryComponentProps';
import { ModalComponent } from './checklist/modalComponent';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
export class ModalFilterHistoryComponent extends React.Component<IModalFilterHistoryComponentProps, any> {
  constructor( props: any ) {
    super ( props );
    this.state = {
      filterName: '',
    };
  }

  handleChange = ( e: any ) => {
    this.setState ( {
      filterName: e.target.value,
    } );
  };

  filterHistory = () => {
    this.props.closeFilterHistory();
  };

  render () {
    return (
      <ModalComponent
        show={this.props.show}
        close={this.props.closeFilterHistory}
        title={'filter'}
      >
        <FormGroup>
          <ControlLabel>Enter filter pattern</ControlLabel>
          <FormControl
            onChange={this.handleChange}
          />
        </FormGroup>
        <div className="check-list-modal-buttons">
          <Button
            onClick={this.filterHistory}
          >
            Filter
          </Button>
          <Button
            onClick={this.props.closeFilterHistory}
          >
            Cancel
          </Button>
        </div>
      </ModalComponent>
    );
  }
}
export default ModalFilterHistoryComponent;