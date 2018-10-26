import * as React from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { CustomDateComponent } from './customDateComponent';

import 'react-datepicker/dist/react-datepicker.css';
import ICheckinStatisticsComponentProps from '../componentProps/checkinStatisticsComponentProps';

export class CheckinStatisticsComponent extends React.Component<ICheckinStatisticsComponentProps, any> {
  handleSelectUser = ( e: any ) => {
    if (e) {
      this.props.loadPoints( this.state.selectList, e.value );
    } else {
      this.props.loadPoints( this.state.selectList, '' );
    }
  };
  handleSelectList = ( e: any ) => {
    if (e) {
      this.props.loadUsers( e.value );
      this.setState( { selectList: e.value } );
    } else {
      this.props.loadUsers( '' );
      this.setState( { selectList: '' } );
    }
  };
  handleSelectStart = ( date: any ) => {
    this.setState( {
      startDate: date,
    } );
  };
  handleSelectEnd = ( date: any ) => {
    this.setState( {
      endDate: date,
    } );
  };
  renderOptionUsers = ( props: Array<any> ) => {
    const options: Array<{ value: string, label: string }> = props.map( ( item: any ) => {
      return {
        value: item.id,
        label: item.name,
      };
    } );
    return options;
  };
  renderOptionLists = ( props: Array<any> ) => {
    const options: Array<{ value: string, label: string }> = props.map( ( item: any ) => {
      return {
        value: item.id,
        label: item.name,
      };
    } );
    return options;
  };

  constructor( props: any ) {
    super( props );
    this.state = {
      startDate: moment().subtract( 1, 'days' ),
      endDate: moment(),
      selectList: '',
    };
  }

  render() {
    return (
      <div className="check-in-statistics-form-container">
        <h3>Check in statistics</h3>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select List</ControlLabel>
          <Select
            options={this.renderOptionLists( this.props.checkinStatistics.selectList )}
            className="check-in-statistics-form-input"
            onChange={this.handleSelectList}
            isClearable={true}
          />
        </FormGroup>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select User</ControlLabel>
          <Select
            options={this.renderOptionUsers( this.props.checkinStatistics.selectUser )}
            className="check-in-statistics-form-input"
            onChange={this.handleSelectUser}
            hideSelectedOptions={true}
            isClearable={true}

          />
        </FormGroup>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select Period</ControlLabel>
          <div
            className="check-in-statistics-form-period"
          >
            <ControlLabel className="">From</ControlLabel>
            <DatePicker
              customInput={<CustomDateComponent/>}
              selected={this.state.startDate}
              selectsStart={true}
              maxDate={this.state.endDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleSelectStart}
            />
            <ControlLabel className="">To</ControlLabel>
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
      </div>
    );
  }
}
