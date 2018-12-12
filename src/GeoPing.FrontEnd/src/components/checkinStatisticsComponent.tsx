import * as React from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import * as moment from 'moment';
import { DurationInputObject } from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { CustomDateComponent } from './customDateComponent';

import 'react-datepicker/dist/react-datepicker.css';
import ICheckinStatisticsComponentProps from '../componentProps/checkinStatisticsComponentProps';
import { checkInStatistics } from '../constants/routes';
import { dateFormatter, dateTypeDefinition } from '../services/helper';

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
      startDate: moment().utcOffset( 'H' ).startOf( 'day' ).subtract( this.durationInput ),
      endDate: moment().utcOffset( 'H' ).endOf( 'day' ),
      selectList: '',
      selectUser: '',
    };
  }

  componentDidMount(): void {
    if ( this.props.listId !== 'none' ) {
      const data = {
        UserId: this.props.userId,
        DatePeriodFrom: dateFormatter( this.state.startDate ),
        DatePeriodTo: dateFormatter( this.state.endDate ),
      };
      this.props.loadPoints( this.props.listId, data );
    } else {
      this.props.getFreeChecksInStatisticsByFilter(
        dateFormatter( this.state.startDate ),
        dateFormatter( this.state.endDate )
      );
    }
  }

  handleSelectUser = ( e: any ) => {
    if ( e ) {
      const data = {
        UserId: e.value,
        DatePeriodFrom: dateFormatter( this.state.startDate ),
        DatePeriodTo: dateFormatter( this.state.endDate ),
      };
      this.props.loadPoints( this.props.listId, data );
      this.setState( { selectUser: e.value } );
    } else {
      // this.props.loadPoints( this.state.selectList, '' );
      this.setState( { selectUser: '' } );
      this.props.clearStatistic();
    }

    this.props.goTo( checkInStatistics.replace( ':listId', this.props.listId ).replace( ':userId', e.value ) );
  };

  handleSelectList = ( e: any ) => {
    if ( e ) {
      this.date = dateTypeDefinition( e.value );
      this.durationInput = {
        [ this.date.typeDate ]: this.date.count,
      };
      const newDate: moment.Moment = moment().utcOffset( 'H' ).startOf( 'day' ).subtract( this.durationInput );
      this.setState( {
        startDate: newDate,
      } );

      if ( e.value !== 'none' ) {
        this.props.loadUsers( e.value );
        const data = {
          UserId: this.props.userId,
          DatePeriodFrom: dateFormatter( this.state.startDate ),
          DatePeriodTo: dateFormatter( this.state.endDate ),
        };
        this.props.loadPoints( e.value, data );
      } else {
        this.props.getFreeChecksInStatisticsByFilter(
          dateFormatter( newDate ),
          dateFormatter( this.state.endDate )
        );
      }
      this.setState( { selectList: e.value } );
    } else {
      this.props.loadUsers( '' );
      this.setState( { selectList: '' } );
    }
    this.props.goTo( checkInStatistics.replace( ':listId', e.value ).replace( '/:userId', '' ) );
    this.props.clearStatistic();
    this.props.clearGeoPoint();
  };

  handleSelectStart = ( date: any ) => {
    if ( !!this.props.userId ) {
      const data = {
        UserId: this.props.userId,
        DatePeriodFrom: dateFormatter( date ),
        DatePeriodTo: dateFormatter( this.state.endDate ),
      };
      this.props.loadPoints( this.props.listId, data );
    } else {
      this.props.getFreeChecksInStatisticsByFilter(
        dateFormatter( date ),
        dateFormatter( this.state.endDate )
      );
    }
    this.setState( {
      startDate: date,
    } );
  };

  handleSelectEnd = ( date: moment.Moment ) => {
    if ( !!this.props.userId ) {
      const data = {
        UserId: this.props.userId,
        DatePeriodFrom: dateFormatter( this.state.startDate ),
        DatePeriodTo: dateFormatter( date ),
      };
      this.props.loadPoints(
        this.props.listId, data );
    } else {
      this.props.getFreeChecksInStatisticsByFilter(
        dateFormatter( this.state.startDate ),
        dateFormatter( date )
      );
    }
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
      ( item: any ) => item.userId === this.props.userId
    );
    return {
      value: user ? user.userId : '',
      label: user ? user.userName : '',
    };
  };

  componentDidUpdate( prevProps: ICheckinStatisticsComponentProps, prevState: any ) {
    if ( prevProps.listId !== this.props.listId ) {
      this.setState( { selectUser: '' } );
    }
  }

  render() {
    return (
      <div className="check-in-statistics-form-container">
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
