import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ICheckListHeadComponentProps from '../componentProps/checkListHeadComponentProps';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { IGeoListForUpdateDTO } from '../DTO/geoListDTO';

export class CheckListHeadComponent extends React.Component<ICheckListHeadComponentProps, any> {
  handleEdit = () => {
    this.setState( {
      isEdit: !this.state.isEdit,
    } );
    if ( this.state.isEdit &&
      this.props.checkList.selectedGeoList.name !== this.state.name &&
      this.state.name
    ) {
      const checkList: IGeoListForUpdateDTO = {
        Name: this.state.name,
        Description: this.props.checkList.selectedGeoList.description,
        IsPublic: true,
      };
      this.props.updateCheckList( this.props.checkList.selectedGeoList.id, checkList );
    }
  };
  keyUp = ( e: any ) => {
    if ( e.keyCode === 13 ) {
      if ( this.props.checkList.selectedGeoList.name !== e.target.value ) {
        const checkList: IGeoListForUpdateDTO = {
          Name: e.target.value,
          Description: this.props.checkList.selectedGeoList.description,
          IsPublic: true,
        };

        this.props.updateCheckList( this.props.checkList.selectedGeoList.id, checkList );
      }
      this.setState( {
        isEdit: false,
      } );
    }
  };
  handleChangeName = ( e: any ) => {
    this.setState( { name: e.target.value } );
  };

  handleShare = () => {
    this.state = {
      isEdit: false,
    };
  };
  handlePeriod = () => {
    this.props.modalPeriodOpenClose( true );
  };

  constructor( props: ICheckListHeadComponentProps ) {
    super( props );
    this.state = {
      isEdit: false,
      name: '',
    };
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="check-list-head-name-container">
            <div className="check-list-head-name">
              <FormGroup
                className="check-list-head-name-form-group"
              >
                {!this.state.isEdit && <ControlLabel>
                  <p>{this.props.checkList.selectedGeoList.name}</p>
                </ControlLabel>}
                {this.state.isEdit && <FormControl
                  name="name"
                  defaultValue={this.props.checkList.selectedGeoList.name}
                  // onBlur={this.blurEdit}
                  onChange={this.handleChangeName}
                  autoFocus={this.state.isEdit}
                  onKeyUp={this.keyUp}
                />}
              </FormGroup>
            </div>
            <div className="check-list-head-name-icons-container">
              <div
                className=" icon-hover-color cursor-pointer"
                onClick={this.handleEdit}
              >
                <FontAwesomeIcon icon="pencil-alt"/>
              </div>
              <div
                className="icon-hover-color cursor-pointer"
                onClick={this.handleShare}
              >
                <FontAwesomeIcon icon="share-square"/>
              </div>
            </div>
            <div
              className="check-list-head-period cursor-pointer"
              onClick={this.handlePeriod}
            >
              <h6>period</h6>
              <div className="icon-hover-color">
                <FontAwesomeIcon icon="calendar-alt"/>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}