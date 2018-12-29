import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ICheckListGeoPointComponentProps from '../componentProps/checkListGeoPointComponentProps';
import { EnumStatusMarker } from '../enums/statusMarker';
import IGeoPoint from '../DTO/geoPointDTO';
import { Card, CardBody, CardHeader, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { IValidationPoint } from '../types/stateTypes/googleMapStateType';

export class CheckListGeoPointComponent extends React.Component<ICheckListGeoPointComponentProps, any> {

  handleChangeInput = ( e: any ) => {
    this.props.changeDataGeoPoint( e.target.name, e.target.value );
    if ( e.target.name === 'name' ) {
      const validationPoint: IValidationPoint = {
        isNamePointError: false,
      };
      this.props.validationPoint( validationPoint );
    }
  };

  handleChangeCoords = ( e: any ) => {
    if ( !isNaN( Number( e.target.value ) ) ) {
      this.props.changeDataGeoPoint( e.target.name, Number( e.target.value ) );
    }
  };

  handleChangeSlider = ( value: number ) => {
    this.props.changeDataGeoPoint( 'radius', value );
  };
  handleChangeRadius = ( e: any ) => {
    let radius: number = 0;
    if ( Number( e.target.value ) < 0 ) {
      radius = 0;
    } else if ( Number( e.target.value ) > 500 ) {
      radius = 500;
    } else {
      radius = Number( e.target.value );
    }
    this.props.changeDataGeoPoint( 'radius', radius );
  };

  handleClickOk = ( e: any ) => {
    e.stopPropagation();
    if ( this.props.googleMap.selectedGeoPoint.name ) {
      const newMarker: IGeoPoint = {
        ...this.props.googleMap.selectedGeoPoint,
        idList: this.props.checkList.selectedGeoList.id,
      };
      this.props.saveGeoPoint( newMarker );
    } else {
      const validationPoint: IValidationPoint = {
        isNamePointError: true,
      };
      this.props.validationPoint( validationPoint );
    }
  };

  handleClickCancel = ( e: any ) => {
    e.stopPropagation();
    this.props.cancelGeoPoint();
  };

  render() {
    let style: string = 'default';
    if ( this.props.googleMap.statusMarker === EnumStatusMarker.New ) {
      style = 'success';
    } else if ( this.props.googleMap.statusMarker === EnumStatusMarker.Edit ) {
      style = 'warning';
    }
    return (
      <React.Fragment>
        <Card outline={true} color={style}>
          <CardHeader tag="h3" className={`bg-${style} ${style !== 'default' && 'text-white'}`}>Geo Point</CardHeader>
          <CardBody>
            <div className="check-list-geo-point-form">
              <FormGroup>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={this.props.googleMap.selectedGeoPoint.name}
                  invalid={this.props.googleMap.validationPoint.isNamePointError}
                  onChange={this.handleChangeInput}
                  disabled={!this.props.checkList.isEditing}
                />
                <FormFeedback>Enter name point</FormFeedback>
              </FormGroup>
              <FormGroup
                className="check-list-geo-point-form-group-lat-long"
              >
                <Label
                  className="check-list-geo-point-form-label-lat"
                >
                  Lat
                </Label>
                <div>
                  <Input
                    name="lat"
                    type="number"
                    value={this.props.googleMap.selectedGeoPoint.lat}
                    onChange={this.handleChangeCoords}
                    disabled={!this.props.checkList.isEditing}
                  />
                </div>
                <Label
                  className="check-list-geo-point-form-label-long"
                >
                  Long
                </Label>
                <div>
                  <Input
                    name="lng"
                    type="number"
                    value={this.props.googleMap.selectedGeoPoint.lng}
                    onChange={this.handleChangeCoords}
                    disabled={!this.props.checkList.isEditing}
                  />
                </div>
              </FormGroup>
              <FormGroup
                className="check-list-geo-point-form-group-radius"
              >
                <Label
                  className="check-list-geo-point-form-label-radius"
                >
                  Radius
                </Label>
                <Slider
                  value={this.props.googleMap.selectedGeoPoint.radius}
                  min={0}
                  max={500}
                  onChange={this.handleChangeSlider}
                  disabled={!this.props.checkList.isEditing}
                />
                <div
                  className="check-list-geo-point-form-label-distance"
                >
                  <div className="check-list-geo-point-form-label-distance-input">
                    <Input
                      type="number"
                      max={500}
                      min={0}
                      value={this.props.googleMap.selectedGeoPoint.radius}
                      style={{ width: '70px' }}
                      disabled={!this.props.checkList.isEditing}
                      onChange={this.handleChangeRadius}
                    />
                    m
                  </div>
                </div>
              </FormGroup>
              <div
                className="check-list-geo-point-form-text-area"
              >
                <Input
                  name="description"
                  type="textarea"
                  value={this.props.googleMap.selectedGeoPoint.description}
                  onChange={this.handleChangeInput}
                  placeholder="Approximate address"
                  disabled={!this.props.checkList.isEditing}
                />
                {this.props.checkList.isEditing && (
                  <div className="check-list-geo-point-form-text-area-icon-container">
                    <div
                      className="check-list-geo-point-form-text-area-icon icon-hover-color cursor-pointer"
                      onClick={this.handleClickCancel}
                    >
                      <FontAwesomeIcon icon="times"/>
                    </div>
                    <div
                      className="check-list-geo-point-form-text-area-icon icon-hover-color cursor-pointer"
                      onClick={this.handleClickOk}
                    >
                      <FontAwesomeIcon icon="check"/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
