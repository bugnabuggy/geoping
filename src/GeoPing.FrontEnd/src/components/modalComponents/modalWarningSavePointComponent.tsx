import * as React from 'react';
import IModalWarningSavePointComponentProps
  from '../../componentProps/modalComponentProps/modalWarningSavePointComponentProps';
import { ModalComponent } from './checklist/modalComponent';
import { Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IGeoPoint from '../../DTO/geoPointDTO';
import { IValidationPoint } from '../../types/stateTypes/googleMapStateType';

export class ModalWarningSavePointComponent extends React.Component<IModalWarningSavePointComponentProps, any> {
  saveGeoPoint = () => {
    if ( !!this.props.googleMap.selectedGeoPoint.name ) {
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

  cancelGeoPoint = () => {
    this.props.cancelGeoPoint();
  };

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Save point"
          show={this.props.show}
          close={this.cancelGeoPoint}
        >
          <div className="question-save-changes">
            <h3><Label>You have save changes?</Label></h3>
          </div>
          <div className="save-point-buttons-container">
            <div
              className="save-point-buttons-check cursor-pointer"
              onClick={this.saveGeoPoint}
            >
              <FontAwesomeIcon icon="check"/>
            </div>
            <div
              className="save-point-buttons-times cursor-pointer"
              onClick={this.cancelGeoPoint}
            >
              <FontAwesomeIcon icon="times"/>
            </div>
          </div>
        </ModalComponent>
      </React.Fragment>
    );
  }
}
