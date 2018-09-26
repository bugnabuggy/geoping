import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import IAllChecklistsFilterComponentProps from '../componentProps/allChecklistsFilterComponentProps';

export class AllChecklistsFilterComponent extends React.Component<IAllChecklistsFilterComponentProps, any> {
  handleChange = ( date: any ) => {
    this.setState( {
      startDate: date
    } );
  };

  handleChangeField = ( e: any ) => {
    // this.props.changeFields( e.target.name, e.target.value);
    // console.log( e.target.name, e.target.value );
  };

  constructor( props: IAllChecklistsFilterComponentProps ) {
    super( props );
    this.state = {
      startDate: moment()
    };
  }

  render() {
    return (
      <div className="admin-checklist-filter">
        <FormGroup className="admin-checklist-filter-field-name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            name="name"
            onChange={this.handleChangeField}
          />
        </FormGroup>
        <FormGroup className="admin-checklist-filter-field-created">
          <div className="admin-checklist-filter-field-created-from">
            <ControlLabel>Created from</ControlLabel>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="admin-checklist-filter-field-created-to">
            <ControlLabel>To</ControlLabel>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
        </FormGroup>
        <FormGroup className="admin-checklist-filter-field-geo-points">
          <div className="admin-checklist-filter-field-geo-points-from">
            <ControlLabel>GeoPoints From</ControlLabel>
            <FormControl
              name="geoPointFrom"
            />
          </div>
          <div className="admin-checklist-filter-field-geo-points-to">
            <ControlLabel>To</ControlLabel>
            <FormControl
              name="geoPointTo"
            />
          </div>
        </FormGroup>
        <FormGroup className="admin-checklist-filter-field-users">
          <ControlLabel>Users</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            name="selectedUser"
            onChange={this.handleChangeField}
          >
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
        <FormGroup className="admin-checklist-filter-field-public">
          <ControlLabel>Is public</ControlLabel>
          <ControlLabel>not set</ControlLabel>
        </FormGroup>
        <FormGroup className="admin-checklist-filter-field-button">
          <Button>Filter</Button>
          <Button>Clear</Button>
        </FormGroup>
      </div>
    );
  }
}