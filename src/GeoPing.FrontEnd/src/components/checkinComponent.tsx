import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Panel, Table } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

import ICheckinComponentProps from '../componentProps/checkinComponentProps';
import { defaultMarker } from '../constants/defaultMarker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CongratulationsModalComponent } from './modalComponents/congratulationsModalComponent';

export class CheckinComponent extends React.Component<ICheckinComponentProps, any> {
  openModal = () => {
    this.setState( { showModal: true } );
  };
  closeModal = () => {
    this.setState( { showModal: false } );
  };
  handleCheckin = () => {
    if ( this.props.checkin.difference < this.props.googleMap.selectedGeoPoint.radius ) {
      this.setState( {
        checkInPoints: [
          ...this.state.checkInPoints,
          this.props.googleMap.selectedGeoPoint.id,
        ]
      } );
    }
  };
  handleSelectList = ( e: any ) => {
    this.props.functions.selectList( e.target.value );
    this.props.functions.loadPoints( e.target.value );
  };
  handleSelectPoint = ( e: any ) => {
    if ( e.target.id === this.props.googleMap.selectedGeoPoint.id ) {
      this.props.functions.selectPoint( defaultMarker );
    } else {
      this.props.functions.selectPoint(
        this.props.googleMap.geoPoints.find( item => item.id === e.target.id ) ||
        defaultMarker
      );
    }
  };
  handleValidationState = ( type: string ) => {
    if ( this.props.googleMap.selectedGeoPoint.id ) {
      return !this.props.checkin.difference ?
        type === 'button' ?
          'default'
          :
          null
        :
        this.props.checkin.difference < this.props.googleMap.selectedGeoPoint.radius ?
          'success'
          :
          type === 'button' ?
            'danger'
            :
            'error';
    } else {
      return type === 'button' ? 'default' : null;
    }
  };
  renderPointList = () => {
    return this.props.googleMap.geoPoints.map( ( item: any, index: number ) => {
      const checkedPoint: boolean = !!this.state.checkInPoints.find( ( il: any ) => il === item.id );
      return (
        <React.Fragment
          key={uuidV4()}
        >
          <tr
            id={item.id}
            onClick={this.handleSelectPoint}
            className={`${item.id === this.props.googleMap.selectedGeoPoint.id && 'check-in-select-point-action'}
            cursor-pointer ${ checkedPoint && 'check-in-point-checked' }`}
          >
            <td
              id={item.id}
            >
              <p id={item.id} className="check-in-select-point-paragraph">
                {item.name}
              </p>
            </td>
            <td
              id={item.id}
            >
              {checkedPoint &&
              <FontAwesomeIcon icon="check" className="check-in-select-point-icon"/>}
            </td>
          </tr>
        </React.Fragment>
      );
    } );
  };
  renderListOption = () => {
    return this.props.checkin.selectList.map( ( item: any, index: number ) => {
      const key: string = `lists_${index}`;
      return (
        <React.Fragment
          key={key}
        >
          {index === 0 && (
            <option
              value={'0'}
            >
              - None -
            </option>
          )}
          <option
            value={item.id}
          >
            {item.name}
          </option>
        </React.Fragment>
      );
    } );
  };

  constructor( props: ICheckinComponentProps ) {
    super( props );
    this.state = {
      checkInPoints: [],
      showModal: false,
    };
  }

  render() {
    const validationState: any = this.handleValidationState( 'label' );
    const validationStateButton: any = this.handleValidationState( 'button' );
    return (
      <React.Fragment>
        <h3>Check in</h3>
        <FormGroup
          className="check-in-select-list-container"
        >
          <ControlLabel
            className="check-in-select-list-label"
          >
            Select List
          </ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={this.handleSelectList}
          >
            {this.renderListOption()}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Select Point</ControlLabel>
          <Panel
            className="check-in-select-point-container"
          >
            <Table>
              <tbody>
              {this.renderPointList()}
              </tbody>
            </Table>
          </Panel>
        </FormGroup>
        <Button
          bsStyle={validationStateButton}
          onClick={this.handleCheckin}
          disabled={!!this.state.checkInPoints.find( ( il: any ) => il === this.props.googleMap.selectedGeoPoint.id )}
        >
          Check In
        </Button>
        <div>
          <ControlLabel
            className="check-in-current-coordinates"
          >
            Current coordinates:
          </ControlLabel>
          <ControlLabel>
            lat: {this.props.googleMap.position.lat}; long: {this.props.googleMap.position.lng}
          </ControlLabel>
          <FormGroup
            validationState={validationState}
          >
            <ControlLabel>
              Difference: {this.props.checkin.difference && `${this.props.checkin.difference}m`}
            </ControlLabel>
          </FormGroup>
        </div>
        <CongratulationsModalComponent
          show={this.state.showModal}
          title="Congratulations!"
          onClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}
