import * as React from 'react';
import { Button, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IFilterUsersComponentProps from '../componentProps/filtersProps/filterUsersComponentProps';

import 'react-datepicker/dist/react-datepicker.css';

export class FilterUsersComponent extends React.Component<IFilterUsersComponentProps, any> {
  handleChangeDateStart = ( date: moment.Moment ) => {
    this.props.changeFilters ( 'startDate', date );
  };
  handleChangeDateEnd = ( date: moment.Moment ) => {
    this.props.changeFilters ( 'endDate', date );
  };
  handleChangeInput = ( e: any ) => {
    this.props.changeFilters ( e.target.name, e.target.value );
  };
  handleClickFilter = () => {
    return '';
  };
  handleClickClearFilter = () => {
    return '';
  };

  constructor( props: IFilterUsersComponentProps ) {
    super ( props );
  }

  render() {
    return (
      <div className="filter-users-container">
        <div className="filter-users-field-name">
          <ControlLabel>Name </ControlLabel>
          <FormControl
            name="name"
            onChange={this.handleChangeInput}
          />
        </div>
        <div className="filter-users-field-data">
          <div className="filter-users-field-data-from">
            <ControlLabel>Reg Date From </ControlLabel>
            <DatePicker
              // dateFormat="DD/MM/YYYY"
              locale="en"
              className="form-control"
              placeholderText="From"
              selectsStart={true}
              shouldCloseOnSelect={false}
              selected={this.props.fields.startDate}
              startDate={this.props.fields.startDate}
              endDate={this.props.fields.endDate}
              onChange={this.handleChangeDateStart}
            />
          </div>
          <div className="filter-users-field-data-to">
            <ControlLabel>To </ControlLabel>
            <DatePicker
              // dateFormat="DD/MM/YYYY"
              locale="en"
              className="form-control"
              placeholderText="To"
              selectsEnd={true}
              shouldCloseOnSelect={false}
              selected={this.props.fields.endDate}
              startDate={this.props.fields.startDate}
              endDate={this.props.fields.endDate}
              onChange={this.handleChangeDateEnd}
            />
          </div>
        </div>
        <div className="filter-users-field-list-count">
          <div className="filter-users-field-list-count-from">
            <ControlLabel
              className="filter-users-text-list-count"
            >
              List Count From
            </ControlLabel>
            <FormControl
              name="listCountFrom"
              className="filter-users-field-list-count-input"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="filter-users-field-list-count-to">
            <ControlLabel>To </ControlLabel>
            <FormControl
              name="listCountTo"
              className="filter-users-field-list-count-input"
              onChange={this.handleChangeInput}
            />
          </div>
        </div>
        <div className="filter-users-field-status">
          <ControlLabel>Status </ControlLabel>
          <FormControl
            name="selectedStatus"
            componentClass="select"
            placeholder="Premium"
            value={this.props.fields.selectedStatus}
            onChange={this.handleChangeInput}
          >
            <option value="0">select</option>
            <option value="1">...</option>
          </FormControl>
        </div>
        <div className="filter-users-field-official">
          <ControlLabel>Is official </ControlLabel>
          <ControlLabel><FontAwesomeIcon icon="times"/> not set </ControlLabel>
        </div>
        <div className="filter-users-field-admin">
          <ControlLabel>Is admin </ControlLabel>
          <ControlLabel><FontAwesomeIcon icon="times"/> not set </ControlLabel>
        </div>
        <div className="filter-users-field-buttons">
          <Button
            onClick={this.handleClickFilter}
          >
            Filter
          </Button>
          <Button
            onClick={this.handleClickClearFilter}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }
}