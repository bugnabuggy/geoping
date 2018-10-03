import * as React from 'react';
import { ControlLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ICustomDateComponentProps from '../componentProps/customDateComponentProps';

export class CustomDateComponent extends React.Component<ICustomDateComponentProps, any> {
  render() {
    return (
      <div
        className="custom-input-date"
        onClick={this.props.onClick}
      >
        <ControlLabel className="">{this.props.value}</ControlLabel>
        <FontAwesomeIcon icon="calendar-alt" className="custom-input-date-icon"/>
      </div>
    );
  }
}