import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ICheckListHeadComponentProps from '../componentProps/checkListHeadComponentProps';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export class CheckListHeadComponent extends React.Component<ICheckListHeadComponentProps, any> {
  constructor( props: ICheckListHeadComponentProps ) {
    super ( props );
    this.state = {
      isEdit: false,
    };
  }

  handleEdit = () => {
    this.setState ( {
      isEdit: true,
    } );
  };

  blurEdit = () => {
    this.setState ( {
      isEdit: false,
    } );
  };

  handleChangeName = ( e: any ) => {
    this.props.changeNameCheckList ( e.target.value );
  };

  handleShare = () => {
    // console.log('share');
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
                {!this.state.isEdit && <ControlLabel><h3><p>{this.props.nameChecklist}</p></h3></ControlLabel>}
                {this.state.isEdit && <FormControl
                  name="name"
                  value={this.props.nameChecklist}
                  onChange={this.handleChangeName}
                  onBlur={this.blurEdit}
                  autoFocus={this.state.isEdit}
                />}
              </FormGroup>
              <div className="check-list-head-name-icons-container">
                <div
                  className=" icon-hover-color cursor-pointer"
                  onClick={this.handleEdit}
                >
                  <FontAwesomeIcon icon="pencil-alt"/>
                </div>
                <div className="icon-hover-color cursor-pointer">
                  <FontAwesomeIcon icon="share-square"/>
                </div>
              </div>
            </div>
            <div
              className="check-list-head-period cursor-pointer"
              onClick={this.handleShare}
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