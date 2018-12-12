import * as React from 'react';
import IModalFilterHistoryComponentProps from '../../componentProps/modalFilterHistoryComponentProps';
import { ModalComponent } from './checklist/modalComponent';
import { Button, FormGroup, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { CustomDateComponent } from '../customDateComponent';
import moment = require('moment');

export class ModalFilterHistoryComponent extends React.Component<IModalFilterHistoryComponentProps, any> {
  constructor( props: any ) {
    super( props );
    this.state = {
      filterName: '',
      startDate: moment(),
      endDate: moment(),
    };
  }

  handleChange = ( e: any ) => {
    this.setState( {
      filterName: e.target.value,
    } );
  };
  handleSelectStart = ( date: moment.Moment ) => {
    this.setState( {
      startDate: date,
    } );
  };
  handleSelectEnd = ( date: moment.Moment ) => {
    this.setState( {
      endDate: date,
    } );
  };

  filterHistory = () => {
    const filter: any = {
      DatePeriodFrom: this.state.startDate.toString(),
      DatePeriodTo: this.state.endDate.toString(),
    };
    this.props.loadHistory( filter );
    this.props.closeFilterHistory();
  };

  render() {
    return (
      <ModalComponent
        show={this.props.show}
        close={this.props.closeFilterHistory}
        title={'Filter table history'}
      >
        <FormGroup>
          <div className="table-history-filter-date-container">
            <Label className="">From</Label>
            <DatePicker
              customInput={<CustomDateComponent/>}
              selected={this.state.startDate}
              selectsStart={true}
              maxDate={this.state.endDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleSelectStart}
            />
            <Label className="">To</Label>
            <DatePicker
              customInput={<CustomDateComponent/>}
              selected={this.state.endDate}
              selectsEnd={true}
              minDate={this.state.startDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleSelectEnd}
            />
          </div>
        </FormGroup>
        <div className="check-list-modal-buttons">
          <Button
            onClick={this.filterHistory}
            color="primary"
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