import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import { v4 as uuidV4 } from 'uuid';

import { CustomDateComponent } from './customDateComponent';

import 'react-datepicker/dist/react-datepicker.css';
import ICheckinStatisticsComponentProps from '../componentProps/checkinStatisticsComponentProps';

export class CheckinStatisticsComponent extends React.Component<ICheckinStatisticsComponentProps, any> {
  handleSelectUser = ( e: any ) => {
    this.props.loadPoints( this.state.selectList, e.target.value );
  };
  handleSelectList = ( e: any ) => {
    this.props.loadUsers( e.target.value );
    this.setState( { selectList: e.target.value } );
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
  renderOptioUsers = ( props: Array<any> ) => {
    const element: Array<any> = props.map( ( item: any, index: number ) => {
      return (
        <React.Fragment
          key={uuidV4()}
        >
          {
            index === 0 &&
            <React.Fragment>
              <option
                value=""
              >
                - None -
              </option>
              <option
                value="all"
              >
                - All -
              </option>
            </React.Fragment>
          }
          <option
            value={item.id}
          >
            {item.name}
          </option>
        </React.Fragment>
      );
    } );
    return element;
  };
  renderOptionLists = ( props: Array<any> ) => {
    const element: Array<any> = props.map( ( item: any, index: number ) => {
      return (
        <React.Fragment
          key={uuidV4()}
        >
          {
            index === 0 &&
            <option
              value=""
            >
              - None -
            </option>
          }
          <option
            value={item.id}
          >
            {item.name}
          </option>
        </React.Fragment>
      );
    } );
    return element;
  };

  constructor( props: any ) {
    super( props );
    this.state = {
      startDate: moment(),
      endDate: moment().add( 1, 'days' ),
      selectList: '',
    };
  }

  render() {
    return (
      <div className="check-in-statistics-form-container">
        <h3>Check in statistics</h3>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select List</ControlLabel>
          <FormControl
            className="check-in-statistics-form-input"
            componentClass="select"
            placeholder="select"
            size={1}
            onChange={this.handleSelectList}
          >
            {this.renderOptionLists( this.props.checkinStatistics.selectList )}
          </FormControl>
        </FormGroup>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select User</ControlLabel>
          <FormControl
            className="check-in-statistics-form-input"
            componentClass="select"
            placeholder="select"
            size={1}
            onChange={this.handleSelectUser}
          >
            {this.renderOptioUsers( this.props.checkinStatistics.selectUser )}
          </FormControl>
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