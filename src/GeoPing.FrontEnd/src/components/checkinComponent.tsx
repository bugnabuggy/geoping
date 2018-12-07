import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';
import Select from 'react-select';
import { PulseLoader } from 'react-spinners';
import { Button, Card, FormGroup, Label, Table } from 'reactstrap';

import ICheckinComponentProps from '../componentProps/checkinComponentProps';
import { defaultMarker } from '../constants/defaultMarker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CongratulationsModalComponent } from './modalComponents/congratulationsModalComponent';
import { ICheckInDTO } from '../DTO/checkInDTO';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { ICheckInGeoPointDTO } from '../DTO/geoPointDTO';
import { ETimer } from '../enums/timerEnum';
import { timer } from '../services/helper';

export class CheckinComponent extends React.Component<ICheckinComponentProps, any> {
  constructor( props: ICheckinComponentProps ) {
    super( props );
    this.state = {
      checkInPoints: [],
      showModal: false,
      isCheckIn: false,
    };
  }

  componentDidUpdate( prevProps: Readonly<ICheckinComponentProps>, prevState: Readonly<any>, snapshot?: any ): void {
    if ( this.state.isCheckIn &&
      this.props.checkin.isStartTimer === ETimer.Start &&
      prevProps.checkin.isStartTimer !== ETimer.Start
    ) {
      timer( this.props.functions );
    }
    if ( !!prevProps.checkin.selectedListId && !!!this.props.checkin.selectedListId ) {
      this.props.functions.setTimer( ETimer.None );
    }
  }

  disableButtonCheckIn = () => {
    return !!this.props.googleMap.checkInGeoPoint.find(
      ( il: ICheckInGeoPointDTO ) => il.pointId === this.props.googleMap.selectedGeoPoint.id
    );
  };

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
    if ( this.props.checkin.difference < this.props.googleMap.selectedGeoPoint.radius || this.state.isCheckIn ) {
      this.setState( {
        checkInPoints: [
          ...this.state.checkInPoints,
          this.props.googleMap.selectedGeoPoint.id,
        ]
      } );
      const idPoint: string = this.state.isCheckIn ? null : this.props.googleMap.selectedGeoPoint.id;
      const data: ICheckInDTO = {
        Latitude: this.props.googleMap.position.lat.toString(),
        Longitude: this.props.googleMap.position.lng.toString(),
        Distance: this.props.checkin.difference,
        // Ip: '',
        // DeviceId: '',
        // UserAgent: '',
      };
      this.props.functions.checkIn( idPoint, data );
    } else {
      this.props.functions.messagesForUser( 'Need to get closer to the point', EnumNotificationType.Warning );
    }
  };

  handleSelectList = ( e: any ) => {
    if ( e ) {
      if ( e.value ) {
        this.setState( {
          isCheckIn: false,
        } );

        this.props.functions.loadPoints( e.value );
      } else {
        this.setState( {
          isCheckIn: true,
        } );
        this.props.functions.clearGeoPoint();
        this.props.functions.addDistance( null );
      }
      this.props.functions.selectList( e.value );
    } else {
      this.setState( {
        isCheckIn: false,
      } );
      this.props.functions.clearGeoPoint();
    }
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

  handleValidationState = () => {
    if ( this.state.isCheckIn &&
      this.props.googleMap.position.isSuccess &&
      this.props.checkin.isStartTimer !== ETimer.Start
    ) {
      return 'primary';
    }
    if ( this.props.googleMap.selectedGeoPoint.id ) {
      return this.props.checkin.difference >= 0 &&
      this.props.checkin.difference <= this.props.googleMap.selectedGeoPoint.radius ?
        'success'
        :
        'danger';
    } else {
      return 'default';
    }
  };

  renderPointList = () => {
    return this.props.googleMap.geoPoints.map( ( item: any, index: number ) => {
      // const checkedPoint: boolean = !!this.state.checkInPoints.find( ( il: any ) => il === item.id );
      const checkedPoint: boolean = !!this.props.googleMap.checkInGeoPoint.find(
        ( il: ICheckInGeoPointDTO ) => il.pointId === item.id
      );
      return (
        <React.Fragment
          key={uuidV4()}
        >
          <tr
            id={item.id}
            onClick={this.handleSelectPoint}
            className={`${item.id === this.props.googleMap.selectedGeoPoint.id && 'check-in-select-point-action'}
            cursor-pointer ${checkedPoint && 'check-in-point-checked'} check-in-select-point`}
          >
            <td
              id={item.id}
            >
              {/*<p id={item.id} className="check-in-select-point-paragraph">*/}
              {item.name}
              {/*</p>*/}
            </td>
            <td
              id={item.id}
              className="check-in-select-point-paragraph-icon"
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
        value: null,
        label: '- None -'
      }
    ];
    this.props.checkList.checkInLists.forEach( ( item: any ) => {
      options.push( {
        value: item.id,
        label: item.name,
      } );
    } );
    return options;
  };

  render() {
    const validationState: any = this.handleValidationState();
    return (
      <React.Fragment>
        <h3>Check in</h3>
        <FormGroup
          className="check-in-select-list-container"
        >
          <Label
            className="check-in-select-list-label"
          >
            Select List
          </Label>
          <Select
            options={this.renderListOption()}
            className="check-in-select"
            onChange={this.handleSelectList}
            isLoading={this.props.checkin.isListLoading}
            isClearable={true}
          />
        </FormGroup>
        {!this.state.isCheckIn &&
        ( <FormGroup>
          <Label>Select Point</Label>
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
        </FormGroup> )
        }
        <div
          className="check-in-buttons-container"
        >
          <Button
            color={validationState}
            onClick={this.handleCheckin}
            style={{ width: '78px' }}
            disabled={validationState === 'default' || this.disableButtonCheckIn()}
          >
            {this.props.checkin.countTimer ?
              this.props.checkin.countTimer
              :
              'Check In'
            }
          </Button>

          <Button
            color="primary"
            onClick={this.handleCheckMyGeoPosition}
          >
            Check my geo position
          </Button>
        </div>
        <div>
          <Label
            className="check-in-current-coordinates"
          >
            Current coordinates:
          </Label>
          <Label>
            lat: {this.props.googleMap.position.lat}; long: {this.props.googleMap.position.lng}
          </Label>
          <FormGroup>
            <Label className={`text-${validationState !== 'primary' ? validationState : ''}`}>
              Difference: {this.props.checkin.difference && `${this.props.checkin.difference}m`}
            </Label>
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
