import * as React from 'react';
import { FormControl, FormGroup, Radio } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

import { ModalComponent } from './modalComponent';
import IModalPeriodComponentProps from '../../../componentProps/modalComponentProps/modalPeriodComponentProps';

import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ModalPeriodComponent extends React.Component<IModalPeriodComponentProps, any> {
  handleCloseModal = () => {
    this.props.modalPeriodOpenClose( false );
  };
  handleRadioChange = ( e: any ) => {
    this.setState( {
      upPeriod: e.target.value,
    } );
  };
  handleChangeDate = ( date: moment.Moment ) => {
    this.setState( {
      date,
    } );
  };
  handleClickCancel = () => {
    this.handleCloseModal();
  };
  handleClickOk = () => {
    this.handleCloseModal();
  };

  constructor( props: IModalPeriodComponentProps ) {
    super( props );
    this.state = {
      upPeriod: '',
      date: moment(),
    };
  }

  render() {
    return (
      <React.Fragment>
        <ModalComponent
          title="Set up period"
          show={this.props.isShowModal}
          close={this.handleCloseModal}
        >
          <FormGroup>
            <FormGroup
              className="check-list-modal-period-item"
            >
              <Radio
                name="period"
                className="check-list-modal-period-item-radio"
                value="period"
                onChange={this.handleRadioChange}
              >
                period
              </Radio>
              <div
                className="check-list-modal-period-item-input"
              >
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  disabled={this.state.upPeriod === 'period' ? false : true}
                >
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>
              </div>
            </FormGroup>
            <FormGroup
              className="check-list-modal-period-item"
            >
              <Radio
                name="period"
                className="check-list-modal-period-item-radio"
                value="custom"
                onChange={this.handleRadioChange}
              >
                custom values
              </Radio>
              <div
                className="check-list-modal-period-item-input"
              >
                <DatePicker
                  selected={this.state.date}
                  locale="ru"
                  onChange={this.handleChangeDate}
                  disabled={this.state.upPeriod === 'custom' ? false : true}
                  className="form-control"
                />
              </div>
            </FormGroup>
            <FormGroup
              className="check-list-modal-period-item"
            >
              <Radio
                name="period"
                className="check-list-modal-period-item-radio"
                value="format"
                onChange={this.handleRadioChange}
              >
                cron format
              </Radio>
              <div
                className="check-list-modal-period-item-input"
              >
                <FormControl
                  disabled={this.state.upPeriod === 'format' ? false : true}
                />
              </div>
            </FormGroup>
          </FormGroup>
          <div
            className="check-list-modal-period-buttons"
          >
            <div
              className="cursor-pointer"
              onClick={this.handleClickCancel}
            >
              <FontAwesomeIcon icon="times"/>
            </div>
            <div
              className="cursor-pointer"
              onClick={this.handleClickOk}
            >
              <FontAwesomeIcon icon="check"/>
            </div>
          </div>
        </ModalComponent>
      </React.Fragment>
    );
  }
}