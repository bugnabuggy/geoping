import * as React from 'react';
import { Link } from 'react-router-dom';
import ILinkHeaderComponentProps from '../componentProps/headerComponentProps/linkHeaderComponentProps';

export class LinkHeaderComponent extends React.Component<ILinkHeaderComponentProps, any> {
  render() {
    return (
      <React.Fragment>
        <Link
          to={this.props.path}
          className="header-link"
        >
          {`${this.props.text} `}
          {this.props.avatar &&
          <img
            src="../assets/images/avatar.png"
            className="rounded-circle"
            width="50px"
            height="40px"
          />
          }
        </Link>
      </React.Fragment>
    );
  }
}