import * as React from 'react';
import { Button, ControlLabel, FormGroup, Panel, Table } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';
import Select from 'react-select';
import { PulseLoader } from 'react-spinners';

import ICheckinComponentProps from '../componentProps/checkinComponentProps';
import { defaultMarker } from '../constants/defaultMarker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CongratulationsModalComponent } from './modalComponents/congratulationsModalComponent';
import IHistoryDataDTO from '../DTO/historyDataDTO';
import { Card } from 'reactstrap';

export class CheckinComponent extends React.Component<ICheckinComponentProps, any> {
  openModal = () => {
    this.setState( { showModal: true } );
  };
  closeModal = () => {
    this.setState( { showModal: false } );
  };
  handleCheckMyGeoPosition = () => {
    this.props.functions.getMyAddress();
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
    const list: any = this.props.checkin.selectList
      .find( item => item.selectedGeoList.id === this.props.checkin.selectedListId );
    const historyData: IHistoryDataDTO = {
      apporxAddress: this.props.googleMap.position.address,
      checkList: list ? list.name : '',
      dateTime: `${new Date().toLocaleDateString( 'ru' )} ${new Date().toLocaleTimeString( 'ru' )}`,
      id: uuidV4(),
      latLng: `${this.props.googleMap.position.lat} / ${this.props.googleMap.position.lng}`,
    };

    // console.log( 'historyData', historyData );
    this.props.functions.saveHistory( '', historyData );
  };
  handleSelectList = ( e: any ) => {
    this.props.functions.selectList( e.value );
    this.props.functions.loadPoints( e.value );
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
            cursor-pointer ${ checkedPoint && 'check-in-point-checked' } check-in-select-point`}
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
    const options: Array<{ value: string, label: string }> = [
      {
        value: '',
        label: '- None -'
      }
    ];
    this.props.checkin.selectList.forEach( ( item: any ) => {
      options.push( {
        value: item.id,
        label: item.name,
      } );
    } );
    return options;
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
          <Select
            options={this.renderListOption()}
            className="check-in-select"
            onChange={this.handleSelectList}
            isLoading={this.props.checkin.isListLoading}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Select Point</ControlLabel>
          <Card
            className="check-in-select-point-container"
          >
            <Table>
              <tbody>
              {this.props.checkin.isPointLoading ?
                (
                  <tr>
                    <td>
                      <div className="container-spinner-center">
                        <PulseLoader
                          sizeUnit="px"
                          size={15}
                          margin="4px"
                          color={'#a9a9a9'}
                          loading={this.props.checkin.isPointLoading}
                        />
                      </div>
                    </td>
                  </tr>
                )
                :
                this.props.googleMap.geoPoints.length > 0 ?
                  this.renderPointList()
                  :
                  (
                    <tr>
                      <td>
                        <React.Fragment>
                          No points
                        </React.Fragment>
                      </td>
                    </tr>
                  )
              }
              </tbody>
            </Table>
          </Card>
        </FormGroup>
        <div
          className="check-in-buttons-container"
        >
          <Button
            bsStyle={validationStateButton}
            onClick={this.handleCheckin}
            disabled={!!this.state.checkInPoints.find( ( il: any ) => il === this.props.googleMap.selectedGeoPoint.id )}
          >
            Check In
          </Button>

          <Button
            bsStyle="primary"
            onClick={this.handleCheckMyGeoPosition}
          >
            Check my geo position
          </Button>
        </div>
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
