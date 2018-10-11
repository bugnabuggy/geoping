import * as React from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ICheckListGeoPointComponentProps from '../componentProps/checkListGeoPointComponentProps';
import { EnumStatusMarker, IMarker } from '../DTO/types/googleMapType';

export class CheckListGeoPointComponent extends React.Component<ICheckListGeoPointComponentProps, any> {

  handleChangeInput = ( e: any ) => {
    this.props.changeDataGEOPoint ( this.props.selectedMarker.id, e.target.name, e.target.value );
  };

  handleChangeSlider = ( value: number ) => {
    this.props.changeDataGEOPoint ( this.props.selectedMarker.id, 'radius', value );
  };

  handleClickOk = ( e: any ) => {
    e.stopPropagation ();
    const newMarker: IMarker = {
      id: this.props.selectedMarker.id,
      radius: this.props.selectedMarker.radius,
      lng: this.props.selectedMarker.lng,
      lat: this.props.selectedMarker.lat,
      idList: this.props.checkList.idChecklist,
      name: this.props.selectedMarker.name,
      description: this.props.selectedMarker.description,
    };
    this.props.addNewPoint ( newMarker );
    this.props.editingPermission ( false );
    this.props.putStatusMarker ( EnumStatusMarker.None );
  };

  handleClickCancel = ( e: any ) => {
    e.stopPropagation ();
    this.props.markerInstalled ( false );
    this.props.editingPermission ( false );
    if ( this.props.statusMarker === EnumStatusMarker.New ) {
      this.props.cancelAddNewPoint ();
    } else if ( this.props.statusMarker === EnumStatusMarker.Edit ) {
      this.props.cancelEditingGEOPoint ();
    }
    this.props.putStatusMarker ( EnumStatusMarker.None );
  };

  render() {
    let style: string = 'default';
    if ( this.props.statusMarker === EnumStatusMarker.New ) {
      style = 'success';
    } else if ( this.props.statusMarker === EnumStatusMarker.Edit ) {
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
                  value={this.props.selectedMarker.name}
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
                  value={this.props.selectedMarker.lat}
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
                  value={this.props.selectedMarker.lng}
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
                  value={this.props.selectedMarker.radius}
                  min={0}
                  max={300}
                  onChange={this.handleChangeSlider}
                  disabled={!this.props.checkList.isEditing}
                />
                <div
                  className="check-list-geo-point-form-label-distance"
                >
                  <ControlLabel>
                    {this.props.selectedMarker.radius}m
                  </ControlLabel>
                </div>
              </FormGroup>
              <div
                className="check-list-geo-point-form-text-area"
              >
                <FormControl
                  name="description"
                  componentClass="textarea"
                  value={this.props.selectedMarker.description}
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