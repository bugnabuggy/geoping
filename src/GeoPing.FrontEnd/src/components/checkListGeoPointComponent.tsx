import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ICheckListGeoPointComponentProps from '../componentProps/checkListGeoPointComponentProps';
import { EnumStatusMarker } from '../enums/statusMarker';
import IGeoPoint from '../DTO/geoPointDTO';

export class CheckListGeoPointComponent extends React.Component<ICheckListGeoPointComponentProps, any> {

  handleChangeInput = ( e: any ) => {
    this.props.changeDataGeoPoint( e.target.name, e.target.value );
  };

  handleChangeSlider = ( value: number ) => {
    this.props.changeDataGeoPoint( 'radius', value );
  };

  handleClickOk = ( e: any ) => {
    e.stopPropagation();
    const newMarker: IGeoPoint = {
      ...this.props.googleMap.selectedGeoPoint,
      idList: this.props.checkList.id,
    };
    this.props.saveGeoPoint( newMarker );
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
        <Panel bsStyle={style}>
          <Panel.Heading>
            Geo Point
          </Panel.Heading>
          <Panel.Body>
            <div className="check-list-geo-point-form">
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  value={this.props.googleMap.selectedGeoPoint.name}
                  onChange={this.handleChangeInput}
                  disabled={!this.props.checkList.isEditing}
                />
              </FormGroup>
              <FormGroup
                className="check-list-geo-point-form-group-lat-long"
              >
                <ControlLabel
                  className="check-list-geo-point-form-label-lat"
                >
                  Lat
                </ControlLabel>
                <FormControl
                  name="lat"
                  value={this.props.googleMap.selectedGeoPoint.lat}
                  onChange={this.handleChangeInput}
                  disabled={!this.props.checkList.isEditing}
                />
                <ControlLabel
                  className="check-list-geo-point-form-label-long"
                >
                  Long
                </ControlLabel>
                <FormControl
                  name="lng"
                  value={this.props.googleMap.selectedGeoPoint.lng}
                  onChange={this.handleChangeInput}
                  disabled={!this.props.checkList.isEditing}
                />
              </FormGroup>
              <FormGroup
                className="check-list-geo-point-form-group-radius"
              >
                <ControlLabel
                  className="check-list-geo-point-form-label-radius"
                >
                  Radius
                </ControlLabel>
                <Slider
                  value={this.props.googleMap.selectedGeoPoint.radius}
                  min={0}
                  max={300}
                  onChange={this.handleChangeSlider}
                  disabled={!this.props.checkList.isEditing}
                />
                <div
                  className="check-list-geo-point-form-label-distance"
                >
                  <ControlLabel>
                    {this.props.googleMap.selectedGeoPoint.radius}m
                  </ControlLabel>
                </div>
              </FormGroup>
              <div
                className="check-list-geo-point-form-text-area"
              >
                <FormControl
                  name="description"
                  componentClass="textarea"
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
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
}
