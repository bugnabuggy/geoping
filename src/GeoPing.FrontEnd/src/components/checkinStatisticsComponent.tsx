import * as React from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import * as moment from 'moment';
import { DurationInputObject } from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

import { CustomDateComponent } from './customDateComponent';

import 'react-datepicker/dist/react-datepicker.css';
import ICheckinStatisticsComponentProps from '../componentProps/checkinStatisticsComponentProps';
import { checkInStatistics } from '../constants/routes';
import { dateTypeDefinition } from '../services/helper';

export class CheckinStatisticsComponent extends React.Component<ICheckinStatisticsComponentProps, any> {
  formatDate = 'MM/DD/YYYY';
  durationInput: DurationInputObject = {};
  date = {
    typeDate: 'day',
    count: 1,
  };

  constructor( props: ICheckinStatisticsComponentProps ) {
    super( props );
    this.date = dateTypeDefinition( props.listId );
    this.durationInput = {
      [ this.date.typeDate ]: this.date.count,
    };
    this.state = {
      startDate: moment().subtract( this.durationInput ),
      endDate: moment(),
      selectList: '',
      selectUser: '',
    };
  }

  handleSelectUser = ( e: any ) => {
    if ( e ) {
      const data = {
        UserId: e.value,
        DatePeriodFrom: this.state.startDate.toString(),
        DatePeriodTo: this.state.endDate.toString(),
      };
      this.props.loadPoints( this.props.listId, data ),
        this.setState( { selectUser: e.value } );
    } else {
      // this.props.loadPoints( this.state.selectList, '' );
      this.setState( { selectUser: '' } );
    }
  };

  handleSelectList = ( e: any ) => {
    if ( e ) {
      if ( e.value !== 'none' ) {
        this.props.loadUsers( e.value );
      }
      this.setState( { selectList: e.value } );
    } else {
      this.props.loadUsers( '' );
      this.setState( { selectList: '' } );
    }
    this.props.clearGeoPoint();
  };

  handleSelectStart = ( date: any ) => {
    const data = {
      UserId: this.state.selectUser,
      DatePeriodFrom: date.toString(),
      DatePeriodTo: this.state.endDate.toString(),
    };
    this.props.loadPoints(
      this.props.listId, data );
    this.setState( {
      startDate: date,
    } );
  };

  handleSelectEnd = ( date: any ) => {
    const data = {
      UserId: this.state.selectUser,
      DatePeriodFrom: this.state.startDate.toString(),
      DatePeriodTo: date.toString(),
    };
    this.props.loadPoints(
      this.props.listId, data );
    this.setState( {
      endDate: date,
    } );
  };

  renderOptionUsers = ( props: Array<any> ): Array<{ value: string, label: string }> => {
    return props.map( ( item: any ) => {
      return {
        value: item.userId,
        label: item.userName,
      };
    } );
  };

  renderOptionLists = ( props: Array<any> ): Array<{ value: string, label: string }> => {
    const optionList: Array<{ value: string, label: string }> = [
      {
        value: 'none',
        label: '- NONE -',
      }
    ];
    props.forEach( ( item: any ) => {
      optionList.push( {
        value: item.id,
        label: item.name,
      } );
    } );
    return optionList;
  };

  selectOptionList = (): any => {
    if ( this.props.listId === 'none' ) {
      return {
        value: 'none',
        label: '- NONE -',
      };
    } else {
      const checkList: any = this.props.checkList.checkLists.find(
        ( item: any ) => item.id === this.props.listId
      );
      return {
        value: checkList ? checkList.id : '',
        label: checkList ? checkList.name : '',
      };
    }
  };

  selectOptionUser = () => {
    const user: any = this.props.checkinStatistics.selectUser.find(
      ( item: any ) => item.userId === this.state.selectUser
    );
    return {
      value: user ? user.userId : '',
      label: user ? user.userName : '',
    };
  };

  // componentDidMount() {
  //   this.props.getAllCheckForList( this.props.listId );
  // }

  componentDidUpdate( prevProps: ICheckinStatisticsComponentProps, prevState: any ) {
    if ( prevProps.listId !== this.props.listId ) {
      this.setState( { selectUser: '' } );
    }
    this.date = dateTypeDefinition( this.props.listId );
    this.durationInput = {
      [ this.date.typeDate ]: this.date.count,
    };
    if ( prevProps.listId !== 'none' && this.props.listId === 'none' ) {
      this.setState( {
        startDate: moment().subtract( this.durationInput ),
      } );
    } else if ( prevProps.listId === 'none' && this.props.listId !== 'none' ) {
      this.setState( {
        startDate: moment().subtract( this.durationInput ),
      } );
    }
  }

  render() {
    return (
      <div className="check-in-statistics-form-container">
        {this.state.selectList && this.props.listId !== this.state.selectList &&
        <Redirect to={checkInStatistics.replace( ':listId', this.state.selectList )}/>}
        <h3>Check in statistics</h3>
        <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select List</ControlLabel>
          <Select
            options={this.renderOptionLists( this.props.checkList.checkLists )}
            className="check-in-statistics-form-input"
            onChange={this.handleSelectList}
            value={this.selectOptionList()}
          />
        </FormGroup>
        {this.props.listId !== 'none' &&
        ( <FormGroup className="check-in-statistics-form-select">
          <ControlLabel className="check-in-statistics-form-label">Select User</ControlLabel>
          <Select
            options={this.renderOptionUsers( this.props.checkinStatistics.selectUser )}
            className="check-in-statistics-form-input"
            onChange={this.handleSelectUser}
            hideSelectedOptions={true}
            isClearable={true}
            value={this.selectOptionUser()}
          />
        </FormGroup> )
        }
        <FormGroup className="check-in-statistics-form-select-period">
          <ControlLabel className="check-in-statistics-form-label">Select Period</ControlLabel>
          <div
            className="check-in-statistics-form-period"
          >
            <div className="check-in-statistics-form-period-item">
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
            </div>
            <div className="check-in-statistics-form-period-item">
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
          </div>
        </FormGroup>
      </div>
    );
  }
}
