import * as React from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

import { CustomDateComponent } from './customDateComponent';

import 'react-datepicker/dist/react-datepicker.css';
import ICheckinStatisticsComponentProps from '../componentProps/checkinStatisticsComponentProps';
import { checkInStatistics } from '../constants/routes';

export class CheckinStatisticsComponent extends React.Component<ICheckinStatisticsComponentProps, any> {
  formatDate = 'MM/DD/YYYY';

  constructor( props: any ) {
    super( props );
    this.state = {
      startDate: moment().subtract( 1, 'days' ),
      endDate: moment(),
      selectList: '',
      selectUser: '',
    };
  }

  handleSelectUser = ( e: any ) => {
    if ( e ) {
      this.props.loadPoints(
        this.props.listId,
        e.value,
        this.state.startDate.format( this.formatDate ),
        this.state.endDate.format( this.formatDate )
      );
      this.setState( { selectUser: e.value } );
    } else {
      // this.props.loadPoints( this.state.selectList, '' );
      this.setState( { selectUser: '' } );
    }
  };

  handleSelectList = ( e: any ) => {
    if ( e ) {
      this.props.loadUsers( e.value );
      this.setState( { selectList: e.value } );
    } else {
      this.props.loadUsers( '' );
      this.setState( { selectList: '' } );
    }
    this.props.clearGeoPoint();
  };

  handleSelectStart = ( date: any ) => {
    this.props.loadPoints(
      this.props.listId,
      this.state.selectUser,
      date.format( this.formatDate ),
      this.state.endDate.format( this.formatDate )
    );
    this.setState( {
      startDate: date,
    } );
  };

  handleSelectEnd = ( date: any ) => {
    this.props.loadPoints(
      this.props.listId,
      this.state.selectUser,
      this.state.startDate.format( this.formatDate ),
      date.format( this.formatDate )
    );
    this.setState( {
      endDate: date,
    } );
  };

  renderOptionUsers = ( props: Array<any> ) => {
    const options: Array<{ value: string, label: string }> = props.map( ( item: any ) => {
      return {
        value: item.id,
        label: item.login,
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

  selectOptionList = (): any => {
    const checkList: any = this.props.checkList.checkLists.find(
      ( item: any ) => item.id === this.props.listId
    );
    return {
      value: checkList ? checkList.id : '',
      label: checkList ? checkList.name : '',
    };
  };

  selectOptionUser = () => {
    const user: any = this.props.checkinStatistics.selectUser.find(
      ( item: any ) => item.id === this.state.selectUser
    );
    return {
      value: user ? user.id : '',
      label: user ? user.login : '',
    };
  };

  // componentDidMount() {
  //   this.props.getAllCheckForList( this.props.listId );
  // }

  componentDidUpdate( prevProps: ICheckinStatisticsComponentProps, prevState: any ) {
    if ( prevProps.listId !== this.props.listId ) {
      this.setState( { selectUser: '' } );
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
            isClearable={true}
            value={this.selectOptionList()}
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
            value={this.selectOptionUser()}
          />
        </FormGroup>
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
