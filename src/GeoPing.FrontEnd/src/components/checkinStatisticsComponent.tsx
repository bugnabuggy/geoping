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
    // this.props.loadPoints( this.state.selectList, e.target.value );
  };
  handleSelectList = ( e: any ) => {
    if ( e ) {
      this.props.loadUsers( e.value );
    } else {
      this.props.loadUsers( '' );
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
  renderOptioUsers = ( props: Array<any> ) => {
    let element: Array<any> = [];
    props.forEach( ( item: any, index: number ) => {
      if ( index === 0 ) {
        element.push( {
          value: 'all',
          label: '- All -',
        } );
      }
      element.push( {
        value: item.id,
        label: item.name,
      } );
    } );
    return element;
  };
  renderOptionLists = ( props: Array<any> ) => {
    const element: Array<any> = props.map( ( item: any, index: number ) => {
      return {
        value: item.id,
        label: item.name,
      };
    } );
    return element;
  };

  constructor( props: any ) {
    super( props );
    this.state = {
      startDate: moment(),
      endDate: moment().add( 1, 'days' ),
      lists: [
        { value: 'chocolate', label: 'Chocolate' }
      ],
      selectList: '',
    };
  }

  render() {
    return (
      <div className="check-in-statistics-form-container">
        <h3>Check in statistics</h3>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select List</ControlLabel>
          <div
            className="check-in-statistics-form-input"
          >
            <Select
              options={this.renderOptionLists( this.props.checkinStatistics.selectList )}
              className="react-select-width"
              isClearable={true}
              onChange={this.handleSelectList}
            />
          </div>
        </FormGroup>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select User</ControlLabel>
          <div
            className="check-in-statistics-form-input"
          >
            <Select
              options={this.renderOptioUsers( this.props.checkinStatistics.selectUser )}
              className="react-select-width"
              isClearable={true}
              onChange={this.handleSelectUser}
            />
          </div>
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